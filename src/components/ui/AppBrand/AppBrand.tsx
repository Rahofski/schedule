import { Calendar } from 'lucide-react';
import Link from 'next/link';

interface AppBrandProps {
  showLink?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function AppBrand({ showLink = false, size = 'md' }: AppBrandProps) {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
  };

  const iconSizes = {
    sm: 20,
    md: 28,
    lg: 36,
  };

  const content = (
    <div className='flex items-center gap-3'>
      <div className='rounded-lg bg-primary p-2 text-primary-foreground'>
        <Calendar
          size={iconSizes[size]}
          strokeWidth={2.5}
        />
      </div>
      <div className='flex flex-col'>
        <h1 className={`font-bold leading-none ${sizeClasses[size]}`}>Школьное расписание</h1>
        <p className='text-xs text-muted-foreground mt-1'>Система управления учебным процессом</p>
      </div>
    </div>
  );

  if (showLink) {
    return (
      <Link
        href='/'
        className='transition-opacity hover:opacity-80'
      >
        {content}
      </Link>
    );
  }

  return content;
}
