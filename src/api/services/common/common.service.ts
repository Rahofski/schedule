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
    // eslint-disable-next-line no-console
    console.log(`[API Request] ${options.method || 'GET'} ${url}`);

    const res = await fetch(url, options);

    // eslint-disable-next-line no-console
    console.log(`[API Response] ${options.method || 'GET'} ${url} - Status: ${res.status}`);

    if (!res.ok) {
      // Логируем ошибку в консоль
      // eslint-disable-next-line no-console
      console.error(`[API Error] ${options.method || 'GET'} ${url} - Status: ${res.status}`);
      try {
        const errorBody = await res.text();
        // eslint-disable-next-line no-console
        console.error('[API Error Body]:', errorBody);
      } catch {
        // eslint-disable-next-line no-console
        console.error('[API Error Body]: Unable to read response body');
      }
      throw res;
    }

    const contentType = res.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await res.json();
    }

    return (await res.text()) as T;
  }

  static async proxyFetch<T>(endpoint: string, options: RequestInit): Promise<T> {
    // Конвертация camelCase -> snake_case теперь происходит в /api/proxy
    // Не нужно делать это здесь, чтобы избежать двойной конвертации

    // Используем Next.js API proxy для избежания mixed content (HTTP -> HTTPS)
    // /api/proxy/[...path] проксирует запросы на бэкенд с сервера
    const url = `/api/proxy${endpoint}`;
    const requestOptions: RequestInit = {
      ...options,
      credentials: 'include', // Автоматически отправляет httpOnly cookies с запросом
    };

    // Прокси уже конвертирует snake_case -> camelCase
    const response = await this.fetch<{ data: T } | T>(url, requestOptions);

    // Если ответ обёрнут в { data: ... }, распаковываем
    if (response && typeof response === 'object' && 'data' in response) {
      return (response as { data: T }).data;
    }

    // Иначе возвращаем как есть (для обратной совместимости)
    return response as T;
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
