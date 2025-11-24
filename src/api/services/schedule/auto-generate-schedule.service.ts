import { ScheduleSlot } from '@/lib/types/schedule';
import { mockGeneratedSchedule } from '@/lib/mocks';

export class AutoGenerateScheduleService {
  /**
   * Запрос на автоматическую генерацию расписания
   * @returns Сгенерированное расписание
   */
  static async generateSchedule(): Promise<ScheduleSlot[]> {
    // TODO: Реализовать реальный запрос к бэкенду
    // const response = await fetch('/api/schedule/generate', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    // });
    // return response.json();

    // Временно возвращаем мок с задержкой для имитации запроса
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(mockGeneratedSchedule);
      }, 1500); // Имитация задержки сети
    });
  }
}
