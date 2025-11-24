'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/shadcn/button';
import { FileDown, Loader2 } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface ScheduleExportButtonProps {
  tableRef: React.RefObject<HTMLDivElement | null>;
}

export function ScheduleExportButton({ tableRef }: ScheduleExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    const element = tableRef.current;
    if (!element) {
      return;
    }

    try {
      setIsExporting(true);

      // Найдем таблицу внутри контейнера
      const table = element.querySelector('table');
      if (!table) {
        throw new Error('Таблица не найдена');
      }

      // Сохраняем оригинальные стили контейнера и таблицы
      const originalOverflow = element.style.overflow;
      const originalMaxWidth = element.style.maxWidth;
      const originalWidth = element.style.width;
      const originalPosition = element.style.position;
      const originalTableWidth = table.style.width;

      // Временно убираем ограничения размера для полного отображения таблицы
      element.style.overflow = 'visible';
      element.style.maxWidth = 'none';
      element.style.width = 'max-content';
      element.style.position = 'static';

      // Устанавливаем таблице максимальную ширину
      table.style.width = 'max-content';

      // Создаем временный стиль для переопределения lab() цветов и обеспечения корректного отображения
      const tempStyle = document.createElement('style');
      tempStyle.textContent = `
        /* Переопределяем CSS-переменные, которые могут использовать lab() */
        * {
          --background: 0 0% 100% !important;
          --foreground: 222.2 84% 4.9% !important;
          --muted: 210 40% 96% !important;
          --muted-foreground: 215.4 16.3% 46.9% !important;
          --primary: 222.2 47.4% 11.2% !important;
          --primary-foreground: 210 40% 98% !important;
          --border: 214.3 31.8% 91.4% !important;
          --destructive: 0 84.2% 60.2% !important;
        }
        
        /* Принудительно устанавливаем простые цвета для всех элементов */
        .bg-muted\\/50, .bg-muted\\/10, .bg-primary\\/10, .bg-primary\\/15 {
          background-color: #f1f5f9 !important;
        }
        
        .text-primary {
          color: #1e293b !important;
        }
        
        .border-primary\\/20, .border-primary\\/30 {
          border-color: #cbd5e1 !important;
        }
        
        .hover\\:bg-muted\\/20:hover {
          background-color: #f8fafc !important;
        }
        
        /* Обеспечиваем корректное отображение вертикального текста */
        .transform.-rotate-90 {
          transform: rotate(-90deg) !important;
          white-space: nowrap !important;
        }
        
        /* Убираем ограничения ширины для полного отображения */
        .overflow-x-auto {
          overflow: visible !important;
        }
        
        /* Обеспечиваем полную ширину таблицы */
        table {
          width: max-content !important;
          min-width: 100% !important;
        }
      `;
      document.head.appendChild(tempStyle);

      // Ждем применения стилей
      await new Promise(resolve => setTimeout(resolve, 100));

      // Получаем реальные размеры таблицы
      const tableRect = table.getBoundingClientRect();
      const fullWidth = Math.max(table.scrollWidth, table.offsetWidth, tableRect.width);
      const fullHeight = Math.max(table.scrollHeight, table.offsetHeight, tableRect.height);

      const canvas = await html2canvas(element, {
        scale: 2, // Повышаем качество
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        allowTaint: false,
        foreignObjectRendering: false,
        width: fullWidth, // Используем максимальную ширину
        height: fullHeight, // Используем максимальную высоту
        scrollX: 0,
        scrollY: 0,
        x: 0, // Начинаем с самого начала
        y: 0,
        ignoreElements: element => {
          return element.getAttribute('data-html2canvas-ignore') === 'true';
        },
      });

      // Удаляем временный стиль
      document.head.removeChild(tempStyle);

      // Восстанавливаем оригинальные стили контейнера и таблицы
      element.style.overflow = originalOverflow;
      element.style.maxWidth = originalMaxWidth;
      element.style.width = originalWidth;
      element.style.position = originalPosition;
      table.style.width = originalTableWidth;

      // Используем высокое качество для изображения
      const imgData = canvas.toDataURL('image/png', 1.0);

      // Вычисляем оптимальные размеры PDF на основе размеров изображения
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;

      // Преобразуем пиксели в мм (приблизительно 96 DPI)
      const mmPerPx = 0.264583; // 1 пиксель = 0.264583 мм при 96 DPI
      const pdfWidth = Math.max(297, imgWidth * mmPerPx); // Минимум A4 ширина (297мм)
      const pdfHeight = Math.max(210, imgHeight * mmPerPx); // Минимум A4 высота (210мм)

      // Создаем PDF с размерами, подходящими для изображения
      const pdf = new jsPDF({
        orientation: pdfWidth > pdfHeight ? 'landscape' : 'portrait',
        unit: 'mm',
        format: [pdfWidth, pdfHeight],
      });

      // Добавляем изображение на всю страницу
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

      // Сохраняем файл с названием и текущей датой
      const today = new Date();
      const dateStr = today.toLocaleDateString('ru-RU').replace(/\./g, '-');
      pdf.save(`расписание_${dateStr}.pdf`);
    } catch (error) {
      // Логгируем ошибку и показываем уведомление пользователю
      // eslint-disable-next-line no-console
      console.error('Ошибка при создании PDF:', error);
      // eslint-disable-next-line no-alert
      alert('Произошла ошибка при создании PDF. Пожалуйста, попробуйте ещё раз.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Button
      variant='outline'
      onClick={handleExport}
      disabled={isExporting}
    >
      {isExporting ? (
        <>
          <Loader2 className='mr-2 h-4 w-4 animate-spin' />
          Создание PDF...
        </>
      ) : (
        <>
          <FileDown className='mr-2 h-4 w-4' />
          Экспорт в PDF
        </>
      )}
    </Button>
  );
}
