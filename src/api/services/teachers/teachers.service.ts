// Массовое обновление преподавателей

import { CreateTeacherDto } from '@/lib/dtos/teachers';
import { AppLightTeacher, BaseTeacher } from '@/lib/types/teachers';
import { CommonService } from '../common/common.service';

export class TeachersService extends CommonService {
  static CACHE_TAGS = {
    Teacher: 'Teacher',
    Teachers: 'Teachers',
    LightTeachers: 'LightTeachers',
  };

  // Получить всех
  static async getTeachers<const T extends BaseTeacher[]>(): Promise<T> {
    // Временно возвращаем моки
    // return Promise.resolve(mockTeachers as T);

    return this.proxyFetch<T>(`/users/Teachers`, {
      method: 'GET',
    });
  }

  static async getLightTeachers<const T extends AppLightTeacher[]>(): Promise<T> {
    // Временно возвращаем моки
    // return Promise.resolve(mockLightTeachers as T);

    return this.proxyFetch<T>(`/users/LightTeachers`, {
      method: 'GET',
    });
  }

  // Получить одного по id
  // static async getTeacher<const T extends BaseTeacher>(id: string): Promise<T> {
  //   return this.proxyFetch<T>(`/users/Teachers/${id}`, {
  //     method: 'GET',
  //   });
  // }

  // Создать
  static async createTeacher<const T extends BaseTeacher>(dto: CreateTeacherDto): Promise<T> {
    return this.proxyFetch<T>(`/users/Teachers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dto),
    });
  }
  static async deleteTeacher(id: string): Promise<void> {
    return this.proxyFetch<void>(`/users/Teachers/${id}`, {
      method: 'DELETE',
    });
  }

  // Массовое обновление преподавателей
  static async bulkUpdateTeachers(_dto: BaseTeacher[]): Promise<void> {
    // Временно имитируем успешное сохранение
    // В реальном приложении здесь будет вызов API
    // return Promise.resolve();

    return this.proxyFetch<void>(`/users/Teachers/bulk`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: _dto }),
    });
  }
}
