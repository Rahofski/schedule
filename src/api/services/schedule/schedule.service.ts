import { AppSchedule, ScheduleSlot } from '@/lib/types/schedule';
import { CommonService } from '../common/common.service';

export class ScheduleService extends CommonService {
  static CACHE_TAGS = {
    Schedule: 'Schedule',
    Schedules: 'Schedules',
  };

  // Получить расписание
  static async getSchedule(): Promise<ScheduleSlot[]> {
    // Временно возвращаем моки
    // return Promise.resolve(mockSchedule);

    return this.proxyFetch<ScheduleSlot[]>(`/schedule`, {
      method: 'GET',
    });
  }

  // Получить расписание по ID
  static async getScheduleById<const T extends AppSchedule>(id: string): Promise<T> {
    return this.proxyFetch<T>(`/schedule/${id}`, {
      method: 'GET',
    });
  }

  // Сохранить/обновить расписание
  static async saveSchedule(_slots: ScheduleSlot[]): Promise<void> {
    // Временно имитируем успешное сохранение
    // return Promise.resolve();

    return this.proxyFetch<void>(`/schedule`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: _slots }),
    });
  }

  // Создать новое расписание
  static async createSchedule<const T extends AppSchedule>(dto: {
    name: string;
    scheduleSlots: ScheduleSlot[];
  }): Promise<T> {
    return this.proxyFetch<T>(`/schedule`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dto),
    });
  }

  // Удалить расписание
  static async deleteSchedule(id: string): Promise<void> {
    return this.proxyFetch<void>(`/schedule/${id}`, {
      method: 'DELETE',
    });
  }
}
