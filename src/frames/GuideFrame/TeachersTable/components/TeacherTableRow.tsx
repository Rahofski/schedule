'use client';

import { AppLightTeacher, formatFullName } from '@/lib';
import { Button } from '@/components/ui/shadcn/button';
import { TableCell, TableRow } from '@/components/ui/shadcn/table';
import { MoreHorizontal, TrashIcon } from 'lucide-react';
import { Checkbox } from '@/components/ui/shadcn/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/shadcn/dropdown-menu';

export interface TeacherTableRowProps {
  teacher: AppLightTeacher;
  isSelected: boolean;
  onToggleSelect: () => void;
  onDelete: () => void;
  isEven?: boolean;
}

export const TeacherTableRow = ({ teacher, isSelected, onToggleSelect, onDelete, isEven }: TeacherTableRowProps) => {
  return (
    <TableRow className={isEven ? 'bg-muted/50' : ''}>
      <TableCell>
        <Checkbox
          checked={isSelected}
          onCheckedChange={onToggleSelect}
        />
      </TableCell>
      <TableCell className='font-medium flex justify-between'>
        {formatFullName(teacher)}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant='ghost'
              size='icon'
              title='Дополнительные действия'
            >
              <MoreHorizontal className='w-5 h-5' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuItem onClick={onDelete}>
              <TrashIcon className='w-4 h-4 mr-2' />
              Удалить
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};
