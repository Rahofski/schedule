import humps from 'humps';

export class CommonService {
  static BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || '';
  static FRONTEND_URL = process.env.NEXT_PUBLIC_FRONTEND_URL || '';

  static CRUD_TAGS = {
    CREATE: 'create',
    READ: 'read',
    UPDATE: 'update',
    DELETE: 'delete',

    LOGIN: 'login',
    SIGNUP: 'signup',
    REFRESH: 'refresh',
    REORDER: 'reorder',
  };

  static async retryFetch<T>(url: string, options: RequestInit, retries = 3, delay = 200, timeout = 10000): Promise<T> {
    for (let attempt = 0; attempt < retries; attempt++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);

        const res = await fetch(url, {
          ...options,
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!res.ok) {
          throw new Error(`Fetch failed with status ${res.status}`);
        }

        const contentType = res.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          return await res.json();
        }

        return (await res.text()) as T;
      } catch (err) {
        if (attempt === retries - 1) {
          throw err;
        }

        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
    throw new Error('Failed after retries');
  }

  static async fetch<T>(url: string, options: RequestInit): Promise<T> {
    const res = await fetch(url, options);
    if (!res.ok) {
      throw res;
    }

    const contentType = res.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await res.json();
    }

    return (await res.text()) as T;
  }

  static async proxyFetch<T>(endpoint: string, options: RequestInit): Promise<T> {
    // const { USE_API_MOCKS, mockProxyFetch } = await import('@/api/mocks');

    if (options.body && typeof options.body === 'string') {
      try {
        const parsedBody = JSON.parse(options.body);
        options.body = JSON.stringify(humps.decamelizeKeys(parsedBody));
      } catch {
        // ignore JSON parse errors — body is not JSON
      }
    }

    // if (USE_API_MOCKS) {
    //   const normalizedOptions: RequestInit = { ...options, signal: options.signal ?? undefined };
    //   const mocked = await mockProxyFetch<T>(endpoint, normalizedOptions);
    //   if (mocked !== undefined) {
    //     await new Promise(resolve => {
    //       setTimeout(resolve, 300);
    //     });
    //     return mocked;
    //   }
    // }

    // Получаем access токен из cookies (на клиенте) или из запроса (на сервере)
    // ВАЖНО: На клиенте токен в httpOnly cookie недоступен через document.cookie
    // Поэтому используем credentials: 'include' для автоматической отправки cookies
    const url = `${this.BACKEND_URL}${endpoint}`;
    const requestOptions: RequestInit = {
      ...options,
      credentials: 'include', // Автоматически отправляет httpOnly cookies с запросом
    };

    const response = await this.fetch<{ data: T } | T>(url, requestOptions);
    const camelizedResponse = humps.camelizeKeys(response) as { data: T } | T;

    // Если ответ обёрнут в { data: ... }, распаковываем
    if (camelizedResponse && typeof camelizedResponse === 'object' && 'data' in camelizedResponse) {
      return camelizedResponse.data;
    }

    // Иначе возвращаем как есть (для обратной совместимости)
    return camelizedResponse as T;
  }

  static async backendFetch<T>(endpoint: string, options: RequestInit): Promise<T> {
    const url = `${this.BACKEND_URL}${endpoint}`;
    return this.fetch<T>(url, options);
  }

  static formatGetParams<T>(dto: Record<string, T>): string {
    const searchParams = new URLSearchParams();
    dto = humps.decamelizeKeys(dto) as Record<string, T>;
    Object.entries(dto).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.set(key, value.toString());
      }
    });
    return searchParams.toString();
  }
}
