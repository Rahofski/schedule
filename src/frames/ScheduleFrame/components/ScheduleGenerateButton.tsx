'use client';

import { Button } from '@/components/ui/shadcn/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/shadcn/tooltip';
import { Sparkles } from 'lucide-react';

interface ScheduleGenerateButtonProps {
  onGenerate: () => void;
  isDisabled: boolean;
  isGenerating: boolean;
}

export function ScheduleGenerateButton({ onGenerate, isDisabled, isGenerating }: ScheduleGenerateButtonProps) {
  const button = (
    <Button
      onClick={onGenerate}
      disabled={isDisabled || isGenerating}
      variant='default'
      className='gap-2'
    >
      <Sparkles className='h-4 w-4' />
      {isGenerating ? 'Генерация...' : 'Автоматически сгенерировать'}
    </Button>
  );

  if (isDisabled && !isGenerating) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>{button}</TooltipTrigger>
          <TooltipContent>
            <p>Очистите расписание, чтобы использовать автогенерацию</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return button;
}
