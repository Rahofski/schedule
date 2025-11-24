'use client';

import { AppClass } from '@/lib/types/classes';
import { Button } from '@/components/ui/shadcn/button';
import { TableCell, TableRow } from '@/components/ui/shadcn/table';
import { TrashIcon, MoreHorizontal } from 'lucide-react';
import { Checkbox } from '@/components/ui/shadcn/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/shadcn/dropdown-menu';
import { formatFullName } from '@/lib';

export interface ClassTableRowProps {
  classItem: AppClass;
  onDelete: () => void;
  isSelected?: boolean;
  onToggleSelect?: (id: string) => void;
  isEven?: boolean;
}

export const ClassTableRow = ({ classItem, onDelete, isSelected, onToggleSelect, isEven }: ClassTableRowProps) => {
  return (
    <TableRow className={isEven ? 'bg-muted/50' : ''}>
      <TableCell className='w-12'>
        <Checkbox
          checked={isSelected}
          onCheckedChange={() => onToggleSelect?.(classItem.id)}
        />
      </TableCell>
      <TableCell className='font-medium'>{classItem.name}</TableCell>
      <TableCell className='font-medium'>
        {classItem.classTeacher ? formatFullName(classItem.classTeacher) : '—'}
      </TableCell>
      <TableCell className='flex justify-end items-center'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant='ghost'
              size='sm'
            >
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuItem
              onClick={onDelete}
              className='text-destructive focus:text-destructive'
            >
              <TrashIcon className='h-4 w-4 mr-2' />
              Удалить
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};
