import { AppBrand } from '@/components/ui/AppBrand';
import { AppFooter } from '@/components/ui/AppFooter';
import { Button } from '@/components/ui/shadcn/button';
import { FileQuestion } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='flex min-h-svh flex-col'>
      <header className='border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
        <div className='container flex h-20 items-center justify-center py-4'>
          <AppBrand
            size='lg'
            showLink
          />
        </div>
      </header>

      <main className='flex flex-1 flex-col items-center justify-center p-6'>
        <div className='flex flex-col items-center gap-6 text-center'>
          <div className='rounded-full bg-muted p-6'>
            <FileQuestion
              size={64}
              className='text-muted-foreground'
            />
          </div>
          <div className='space-y-2'>
            <h1 className='text-4xl font-bold'>404</h1>
            <h2 className='text-xl font-semibold text-muted-foreground'>Страница не найдена</h2>
            <p className='text-sm text-muted-foreground'>К сожалению, запрашиваемая страница не существует</p>
          </div>
          <div className='flex gap-3'>
            <Button
              asChild
              variant='default'
            >
              <Link href='/panel/schedule'>Перейти к расписанию</Link>
            </Button>
            <Button
              asChild
              variant='outline'
            >
              <Link href='/login'>Вход в систему</Link>
            </Button>
          </div>
        </div>
      </main>

      <AppFooter />
    </div>
  );
}
