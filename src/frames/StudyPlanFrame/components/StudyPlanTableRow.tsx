'use client';

import { TableRow, TableCell } from '@/components/ui/shadcn/table';
import { Input } from '@/components/ui/shadcn/input';
import { Checkbox } from '@/components/ui/shadcn/checkbox';
import { useEffect, useState } from 'react';
import { AppSubject } from '@/lib/types/subjects';
import { AppClass } from '@/lib/types/classes';

interface StudyPlanTableRowProps {
  subject: AppSubject;
  classes: AppClass[];
  onChange: (subjectId: string, classId: string, hoursPerWeek: number | null) => void;
  onSplitChange: (subjectId: string, classId: string, split: boolean, crossClassAllowed: boolean) => void;
  isEven?: boolean;
}

export function StudyPlanTableRow({ subject, classes, onChange, onSplitChange, isEven }: StudyPlanTableRowProps) {
  const [isInitialized, setIsInitialized] = useState(false);
  const [hoursValues, setHoursValues] = useState<Record<string, string>>({});
  const [splitValues, setSplitValues] = useState<Record<string, { split: boolean; crossClass: boolean }>>({});

  // Инициализация значений из данных классов
  useEffect(() => {
    const initialValues: Record<string, string> = {};
    const initialSplits: Record<string, { split: boolean; crossClass: boolean }> = {};
    classes.forEach(classItem => {
      const subjectConfig = classItem.subjects.find(s => s.subject.id === subject.id);
      initialValues[classItem.id] = subjectConfig ? String(subjectConfig.hoursPerWeek) : '';
      initialSplits[classItem.id] = {
        split: Boolean(subjectConfig?.split),
        crossClass: Boolean(subjectConfig?.split?.crossClassAllowed),
      };
    });
    setHoursValues(initialValues);
    setSplitValues(initialSplits);
    setIsInitialized(true);
  }, [classes, subject.id]);

  // Обработка изменения количества часов
  const handleHoursChange = (classId: string, value: string) => {
    setHoursValues(prev => ({
      ...prev,
      [classId]: value,
    }));

    if (isInitialized) {
      const numericValue = value === '' ? null : parseInt(value, 10);
      const validValue = numericValue !== null && !isNaN(numericValue) ? numericValue : null;
      onChange(subject.id, classId, validValue);
    }
  };

  // Обработка изменения разделения на группы
  const handleSplitChange = (classId: string, checked: boolean) => {
    setSplitValues(prev => ({
      ...prev,
      [classId]: { ...prev[classId], split: checked },
    }));

    if (isInitialized) {
      const currentCrossClass = splitValues[classId]?.crossClass || false;
      onSplitChange(subject.id, classId, checked, currentCrossClass);
    }
  };

  // Обработка изменения возможности перекрёстного обучения
  const handleCrossClassChange = (classId: string, checked: boolean) => {
    setSplitValues(prev => ({
      ...prev,
      [classId]: { ...prev[classId], crossClass: checked },
    }));

    if (isInitialized) {
      const currentSplit = splitValues[classId]?.split || false;
      onSplitChange(subject.id, classId, currentSplit, checked);
    }
  };

  return (
    <TableRow className={isEven ? 'bg-muted/50' : ''}>
      <TableCell className='font-medium'>{subject.name}</TableCell>
      {classes.map(classItem => {
        const hasHours = hoursValues[classItem.id] && parseInt(hoursValues[classItem.id]) > 0;
        const isSplit = splitValues[classItem.id]?.split || false;

        return (
          <TableCell key={classItem.id}>
            <div className='flex flex-col gap-2'>
              <Input
                type='number'
                min='0'
                max='10'
                value={hoursValues[classItem.id] || ''}
                onChange={e => handleHoursChange(classItem.id, e.target.value)}
                placeholder='0'
                className='w-16'
              />
              {hasHours && (
                <div className='flex flex-col gap-1.5 text-xs'>
                  <label className='flex items-center gap-1.5 cursor-pointer'>
                    <Checkbox
                      checked={isSplit}
                      onCheckedChange={checked => handleSplitChange(classItem.id, Boolean(checked))}
                    />
                    <span className='text-muted-foreground'>На группы</span>
                  </label>
                  {isSplit && (
                    <label className='flex items-center gap-1.5 cursor-pointer ml-4'>
                      <Checkbox
                        checked={splitValues[classItem.id]?.crossClass || false}
                        onCheckedChange={checked => handleCrossClassChange(classItem.id, Boolean(checked))}
                      />
                      <span className='text-muted-foreground'>С др. классами</span>
                    </label>
                  )}
                </div>
              )}
            </div>
          </TableCell>
        );
      })}
    </TableRow>
  );
}
