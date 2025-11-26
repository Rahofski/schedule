import { LoginForm } from '@/components/ui/LoginForm/LoginForm';
import { AppBrand } from '@/components/ui/AppBrand';
import { AppFooter } from '@/components/ui/AppFooter';

export default function LoginPage() {
  return (
    <div className='flex min-h-svh flex-col'>
      <header className='border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
        <div className='container flex h-20 items-center justify-center py-4'>
          <AppBrand size='lg' />
        </div>
      </header>

      <main className='flex flex-1 items-center justify-center p-6 md:p-10'>
        <div className='w-full max-w-sm'>
          <LoginForm />
        </div>
      </main>

      <AppFooter />
    </div>
  );
}
