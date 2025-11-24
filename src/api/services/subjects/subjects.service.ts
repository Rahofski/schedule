import { AppSubject } from '@/lib/types/subjects';
import { CommonService } from '../common/common.service';
import { mockSubjects } from '@/lib/mocks';

export class SubjectsService extends CommonService {
  static CACHE_TAGS = {
    Subject: 'Subject',
    Subjects: 'Subjects',
  };

  // Получить все предметы
  static async getSubjects<const T extends AppSubject[]>(): Promise<T> {
    // Временно возвращаем моки
    return Promise.resolve(mockSubjects as T);

    // return this.proxyFetch<T>(`/subjects`, {
    //   method: 'GET',
    // });
  }

  // Получить один предмет по id
  // static async getSubject<const T extends AppSubject>(id: string): Promise<T> {
  //   return this.proxyFetch<T>(`/subjects/${id}`, {
  //     method: 'GET',
  //   });
  // }

  // Создать предмет
  static async createSubject<const T extends AppSubject>(dto: { name: string }): Promise<T> {
    return this.proxyFetch<T>(`/subjects`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dto),
    });
  }

  // Удалить предмет
  static async deleteSubject(id: string): Promise<void> {
    return this.proxyFetch<void>(`/subjects/${id}`, {
      method: 'DELETE',
    });
  }
}
