import { AppClassRoom } from '@/lib/types/classrooms';
import { CommonService } from '../common/common.service';

export class ClassRoomsService extends CommonService {
  static CACHE_TAGS = {
    ClassRoom: 'ClassRoom',
    ClassRooms: 'ClassRooms',
  };

  // Получить все кабинеты
  static async getClassRooms<const T extends AppClassRoom[]>(): Promise<T> {
    // Временно возвращаем моки
    // return Promise.resolve(mockClassrooms as T);

    return this.proxyFetch<T>(`/classrooms`, {
      method: 'GET',
    });
  }

  // Получить один кабинет по id
  // static async getClassRoom<const T extends AppClassRoom>(id: string): Promise<T> {
  //   return this.proxyFetch<T>(`/classrooms/${id}`, {
  //     method: 'GET',
  //   });
  // }

  // Создать кабинет
  static async createClassRoom<const T extends AppClassRoom>(dto: { name: string }): Promise<T> {
    return this.proxyFetch<T>(`/classrooms`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dto),
    });
  }

  // Удалить кабинет
  static async deleteClassRoom(id: string): Promise<void> {
    return this.proxyFetch<void>(`/classrooms/${id}`, {
      method: 'DELETE',
    });
  }
}
