import { Mail, Github } from 'lucide-react';

export function AppFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='container flex flex-col items-center justify-between gap-4 py-6 md:h-16 md:flex-row md:py-0'>
        <div className='flex flex-col items-center gap-2 md:flex-row md:gap-4'>
          <p className='text-sm text-muted-foreground'>© {currentYear} Школьное расписание. Все права защищены.</p>
        </div>
        <div className='flex items-center gap-4'>
          <a
            href='mailto:romarahov@yandex.ru'
            className='flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground'
          >
            <Mail size={16} />
            <span className='hidden sm:inline'>romarahov@yandex.ru</span>
          </a>
          <a
            href='https://github.com/Rahofski/schedule'
            target='_blank'
            rel='noopener noreferrer'
            className='flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground'
          >
            <Github size={16} />
            <span className='hidden sm:inline'>GitHub</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
