'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/shadcn/dialog';
import { Button } from '@/components/ui/shadcn/button';
import { Checkbox } from '@/components/ui/shadcn/checkbox';
import { Label } from '@/components/ui/shadcn/label';
import { AppClass } from '@/lib/types/classes';
import { AppSubject } from '@/lib/types/subjects';
import { BaseTeacher } from '@/lib/types/teachers';
import { AppClassRoom } from '@/lib/types/classrooms';
import { ScheduleLesson, ScheduleLessonParticipant } from '@/lib/types/schedule';
import { Separator } from '@/components/ui/shadcn/separator';
import { formatFullName } from '@/lib';

interface AddLessonDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  classItem: AppClass;
  subject: AppSubject;
  subjectConfig: AppClass['subjects'][0];
  allClasses: AppClass[];
  allTeachers: BaseTeacher[];
  allRooms: AppClassRoom[];
  onConfirm: (lesson: Omit<ScheduleLesson, 'id'>) => void;
  getConflicts?: (
    teachers: BaseTeacher[],
    rooms: AppClassRoom[],
    participants: ScheduleLessonParticipant[]
  ) => {
    teacherConflicts: string[];
    roomConflicts: string[];
    classConflicts: string[];
  };
}

interface SelectedGroup {
  classId: string;
  groupIds: string[];
}

export function AddLessonDialog({
  open,
  onOpenChange,
  classItem,
  subject,
  subjectConfig,
  allClasses,
  allTeachers,
  allRooms,
  onConfirm,
  getConflicts,
}: AddLessonDialogProps) {
  const [selectedGroups, setSelectedGroups] = useState<SelectedGroup[]>([]);
  const [selectedTeachers, setSelectedTeachers] = useState<string[]>([]);
  const [selectedRooms, setSelectedRooms] = useState<string[]>([]);
  const [conflicts, setConflicts] = useState<{
    teacherConflicts: string[];
    roomConflicts: string[];
    classConflicts: string[];
  }>({ teacherConflicts: [], roomConflicts: [], classConflicts: [] });

  const hasSplit = Boolean(subjectConfig.split);
  const hasGroups = classItem.groups && classItem.groups.length > 0;
  const canAddOtherClasses = subjectConfig.split?.crossClassAllowed;

  // Классы, доступные для перекрёстного обучения
  const availableClasses = canAddOtherClasses
    ? allClasses.filter(c => {
        // Класс должен иметь этот же предмет с разделением и crossClassAllowed
        const hasSubject = (c.subjects || []).some(s => s.subject.id === subject.id && s.split?.crossClassAllowed);
        return c.id !== classItem.id && hasSubject && c.groups && c.groups.length > 0;
      })
    : [];

  // Фильтруем учителей по нагрузке
  const availableTeachers = allTeachers.filter(teacher => {
    // Проверяем, есть ли у учителя нагрузка по этому предмету для данного класса
    return (teacher.classHours || []).some(ch => ch.class.id === classItem.id && ch.subject.id === subject.id);
  });

  // Инициализация при открытии диалога
  useEffect(() => {
    if (open) {
      // Если предмет без деления - выбираем весь класс
      if (!hasSplit || !hasGroups) {
        setSelectedGroups([{ classId: classItem.id, groupIds: [] }]);
      } else {
        // Для предметов с делением - по умолчанию ничего не выбрано
        setSelectedGroups([]);
      }
      setSelectedTeachers([]);
      setSelectedRooms([]);
      setConflicts({ teacherConflicts: [], roomConflicts: [], classConflicts: [] });
    }
  }, [open, classItem.id, hasSplit, hasGroups]);

  // Проверка конфликтов при изменении выбора
  useEffect(() => {
    if (getConflicts && selectedTeachers.length > 0) {
      const teachers = allTeachers.filter(t => selectedTeachers.includes(t.id));
      const rooms = allRooms.filter(r => selectedRooms.includes(r.id));
      const participants = buildParticipants();

      const newConflicts = getConflicts(teachers, rooms, participants);
      setConflicts(newConflicts);
    } else {
      setConflicts({ teacherConflicts: [], roomConflicts: [], classConflicts: [] });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTeachers, selectedRooms, selectedGroups]);

  const toggleGroup = (classId: string, groupId: string) => {
    setSelectedGroups(prev => {
      const classGroups = prev.find(sg => sg.classId === classId);

      if (!classGroups) {
        // Добавляем класс с этой группой
        return [...prev, { classId, groupIds: [groupId] }];
      }

      const hasGroup = classGroups.groupIds.includes(groupId);

      if (hasGroup) {
        // Убираем группу
        const newGroupIds = classGroups.groupIds.filter(gid => gid !== groupId);
        if (newGroupIds.length === 0) {
          // Если групп не осталось, убираем весь класс
          return prev.filter(sg => sg.classId !== classId);
        }
        return prev.map(sg => (sg.classId === classId ? { ...sg, groupIds: newGroupIds } : sg));
      } else {
        // Добавляем группу
        return prev.map(sg => (sg.classId === classId ? { ...sg, groupIds: [...sg.groupIds, groupId] } : sg));
      }
    });
  };

  const toggleTeacher = (teacherId: string) => {
    setSelectedTeachers(prev =>
      prev.includes(teacherId) ? prev.filter(id => id !== teacherId) : [...prev, teacherId]
    );
  };

  const toggleRoom = (roomId: string) => {
    setSelectedRooms(prev => (prev.includes(roomId) ? prev.filter(id => id !== roomId) : [...prev, roomId]));
  };

  const buildParticipants = (): ScheduleLessonParticipant[] => {
    return selectedGroups.map(sg => {
      const classObj = allClasses.find(c => c.id === sg.classId)!;
      return {
        class: classObj,
        groupIds: sg.groupIds.length > 0 ? sg.groupIds : undefined,
      };
    });
  };

  const handleConfirm = () => {
    const teachers = allTeachers.filter(t => selectedTeachers.includes(t.id));
    const rooms = allRooms.filter(r => selectedRooms.includes(r.id));
    const participants = buildParticipants();

    const lesson: Omit<ScheduleLesson, 'id'> = {
      subject,
      teachers,
      rooms,
      participants,
    };

    onConfirm(lesson);
    onOpenChange(false);
  };

  const isValid = selectedGroups.length > 0 && selectedTeachers.length > 0 && selectedRooms.length > 0;

  const hasConflicts =
    conflicts.teacherConflicts.length > 0 || conflicts.roomConflicts.length > 0 || conflicts.classConflicts.length > 0;

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className='max-w-2xl max-h-[90vh] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle>Добавить урок: {subject.name}</DialogTitle>
          <DialogDescription>
            Класс: {classItem.name}
            {hasSplit && hasGroups && ' (предмет с делением на группы)'}
          </DialogDescription>
        </DialogHeader>

        <div className='space-y-6'>
          {/* Выбор групп основного класса */}
          {hasSplit && hasGroups ? (
            <div className='space-y-3'>
              <Label className='text-base font-semibold'>Группы класса {classItem.name}</Label>
              <div className='grid grid-cols-2 gap-3'>
                {classItem.groups?.map(group => (
                  <div
                    key={group.id}
                    className='flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50 cursor-pointer'
                    onClick={() => toggleGroup(classItem.id, group.id)}
                  >
                    <Checkbox
                      checked={selectedGroups.find(sg => sg.classId === classItem.id)?.groupIds.includes(group.id)}
                      onCheckedChange={() => toggleGroup(classItem.id, group.id)}
                    />
                    <div className='flex-1'>
                      <div className='font-medium'>{group.name}</div>
                      {group.size && <div className='text-xs text-muted-foreground'>{group.size} чел.</div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className='p-3 border rounded-lg bg-muted/30'>
              <div className='text-sm font-medium'>Урок для всего класса {classItem.name}</div>
            </div>
          )}

          {/* Перекрёстное обучение */}
          {canAddOtherClasses && availableClasses.length > 0 && (
            <>
              <Separator />
              <div className='space-y-3'>
                <Label className='text-base font-semibold'>
                  Перекрёстное обучение
                  <span className='ml-2 text-xs px-2 py-0.5 border rounded'>Опционально</span>
                </Label>
                <div className='text-sm text-muted-foreground mb-2'>
                  Можно добавить группы из других классов для совместного обучения
                </div>

                {availableClasses.map(cls => (
                  <div
                    key={cls.id}
                    className='space-y-2 border rounded-lg p-3'
                  >
                    <div className='font-medium text-sm'>{cls.name}</div>
                    <div className='grid grid-cols-2 gap-2'>
                      {cls.groups?.map(group => (
                        <div
                          key={group.id}
                          className='flex items-center space-x-2 p-2 border rounded hover:bg-muted/50 cursor-pointer'
                          onClick={() => toggleGroup(cls.id, group.id)}
                        >
                          <Checkbox
                            checked={selectedGroups.find(sg => sg.classId === cls.id)?.groupIds.includes(group.id)}
                            onCheckedChange={() => toggleGroup(cls.id, group.id)}
                          />
                          <div className='text-sm'>{group.name}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          <Separator />

          {/* Выбор учителей */}
          <div className='space-y-3'>
            <Label className='text-base font-semibold'>Учителя *</Label>
            {availableTeachers.length === 0 ? (
              <div className='p-3 border rounded-lg bg-muted/30 text-sm text-muted-foreground'>
                Нет учителей с назначенной нагрузкой по этому предмету для класса {classItem.name}
              </div>
            ) : (
              <div className='grid grid-cols-1 gap-2 max-h-48 overflow-y-auto'>
                {availableTeachers.map(teacher => (
                  <div
                    key={teacher.id}
                    className={`flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50 cursor-pointer ${
                      conflicts.teacherConflicts.includes(teacher.id) ? 'border-destructive bg-destructive/10' : ''
                    }`}
                    onClick={() => toggleTeacher(teacher.id)}
                  >
                    <Checkbox
                      checked={selectedTeachers.includes(teacher.id)}
                      onCheckedChange={() => toggleTeacher(teacher.id)}
                    />
                    <div className='flex-1'>
                      <div className='font-medium'>{formatFullName(teacher)}</div>
                      {conflicts.teacherConflicts.includes(teacher.id) && (
                        <div className='text-xs text-destructive'>Конфликт: занят в это время</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Separator />

          {/* Выбор кабинетов */}
          <div className='space-y-3'>
            <Label className='text-base font-semibold'>Кабинеты *</Label>
            <div className='grid grid-cols-2 gap-2 max-h-48 overflow-y-auto'>
              {allRooms.map(room => (
                <div
                  key={room.id}
                  className={`flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50 cursor-pointer ${
                    conflicts.roomConflicts.includes(room.id) ? 'border-destructive bg-destructive/10' : ''
                  }`}
                  onClick={() => toggleRoom(room.id)}
                >
                  <Checkbox
                    checked={selectedRooms.includes(room.id)}
                    onCheckedChange={() => toggleRoom(room.id)}
                  />
                  <div className='flex-1'>
                    <div className='font-medium'>{room.name}</div>
                    {conflicts.roomConflicts.includes(room.id) && (
                      <div className='text-xs text-destructive'>Конфликт: занят в это время</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Предупреждения о конфликтах */}
          {conflicts.classConflicts.length > 0 && (
            <div className='p-3 border border-destructive rounded-lg bg-destructive/10'>
              <div className='text-sm font-semibold text-destructive mb-1'>Конфликты классов/групп:</div>
              <ul className='text-xs text-destructive list-disc list-inside'>
                {conflicts.classConflicts.map((msg, i) => (
                  <li key={i}>{msg}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button
            variant='outline'
            onClick={() => onOpenChange(false)}
          >
            Отмена
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={!isValid || hasConflicts}
          >
            Добавить урок
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
