import { AppClass } from '@/lib/types/classes';
import { CommonService } from '../common/common.service';

export class ClassesService extends CommonService {
  static CACHE_TAGS = {
    Class: 'Class',
    Classes: 'Classes',
  };

  // Получить все классы
  static async getClasses<const T extends AppClass[]>(): Promise<T> {
    // Временно возвращаем моки
    // return Promise.resolve(mockClasses as T);

    return this.proxyFetch<T>(`/classes`, {
      method: 'GET',
    });
  }

  // Получить один класс по id
  // static async getClass<const T extends AppClass>(id: string): Promise<T> {
  //   return this.proxyFetch<T>(`/classes/${id}`, {
  //     method: 'GET',
  //   });
  // }

  // Создать класс
  static async createClass<const T extends AppClass>(dto: { name: string }): Promise<T> {
    return this.proxyFetch<T>(`/classes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dto),
    });
  }

  // Удалить класс
  static async deleteClass(id: string): Promise<void> {
    return this.proxyFetch<void>(`/classes/${id}`, {
      method: 'DELETE',
    });
  }

  // Массовое обновление классов
  static async bulkUpdateClasses(_classes: AppClass[]): Promise<void> {
    // Временно имитируем успешное сохранение
    // return Promise.resolve();

    return this.proxyFetch<void>(`/classes/bulk`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: _classes }),
    });
  }
}
