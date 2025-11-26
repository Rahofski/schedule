'use client';

import { cn } from '@/lib/utils';
import { Button } from '../shadcn/button';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../shadcn/card';
import { Input } from '../shadcn/input';
import { Label } from '../shadcn/label';
import { useState } from 'react';
import { toast } from 'sonner';

export function LoginForm({ className, ...props }: React.ComponentProps<'div'>) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (email && password) {
        // eslint-disable-next-line no-console
        console.log('[LoginForm] Submitting login...');

        // Отправляем запрос на наш API endpoint
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
          credentials: 'include', // Важно для работы с cookies
        });

        // eslint-disable-next-line no-console
        console.log('[LoginForm] Response status:', response.status);

        const _data = await response.json();

        // eslint-disable-next-line no-console
        console.log('[LoginForm] Response data:', _data);

        if (response.ok) {
          // Токены автоматически сохранены в httpOnly cookies
          // После успешной авторизации редиректим на панель
          toast.success('Вход выполнен успешно');
          window.location.href = '/panel/schedule';
        } else {
          // Обработка ошибки авторизации
          // eslint-disable-next-line no-console
          console.error('[LoginForm] Login failed:', _data);
          toast.error(_data.error || 'Неверный email или пароль');
        }
      }
    } catch (error) {
      // Обработка сетевых ошибок
      // eslint-disable-next-line no-console
      console.error('[LoginForm] Error:', error);
      toast.error('Ошибка подключения к серверу');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={cn('flex flex-col gap-6', className)}
      {...props}
    >
      <Card>
        <CardHeader className='text-center'>
          <CardTitle className='text-2xl'>Добро пожаловать</CardTitle>
          <CardDescription>Войдите в систему управления школьным расписанием</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className='flex flex-col gap-6'>
              <div className='grid gap-3'>
                <Label htmlFor='email'>Почта</Label>
                <Input
                  id='email'
                  type='email'
                  placeholder='teacher@school.com'
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
              <div className='grid gap-3'>
                <div className='flex items-center'>
                  <Label htmlFor='password'>Пароль</Label>
                </div>
                <Input
                  id='password'
                  type='password'
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
              <div className='flex flex-col gap-3'>
                <Button
                  type='submit'
                  className='w-full'
                  disabled={isLoading}
                >
                  {isLoading ? 'Вход...' : 'Войти'}
                </Button>
              </div>
            </div>
          </form>
          <div className='mt-4 rounded-lg border bg-muted/50 p-3 text-center text-xs text-muted-foreground'>
            <p className='font-medium'>Демо-доступ:</p>
            <p className='mt-1'>
              <span className='font-mono'>mock@gmail.com</span> / <span className='font-mono'>mock123</span>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
