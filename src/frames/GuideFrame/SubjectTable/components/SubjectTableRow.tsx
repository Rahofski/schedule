'use client';

import { AppSubject } from '@/lib/types/subjects';
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

export interface SubjectTableRowProps {
  subject: AppSubject;
  isSelected: boolean;
  onToggleSelect: () => void;
  onDelete: () => void;
  isEven?: boolean;
}

export const SubjectTableRow = ({ subject, isSelected, onToggleSelect, onDelete, isEven }: SubjectTableRowProps) => {
  return (
    <TableRow className={isEven ? 'bg-muted/50' : ''}>
      <TableCell>
        <Checkbox
          checked={isSelected}
          onCheckedChange={onToggleSelect}
        />
      </TableCell>
      <TableCell className='font-medium'>{subject.name}</TableCell>
      <TableCell className='flex justify-end items-center'>
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
