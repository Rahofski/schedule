'use client';

import { SidebarProvider } from '@/components/ui/shadcn/sidebar';
import MainSidebar from '@/components/ui/Sidebar/Sidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  // Теперь авторизация проверяется в middleware через httpOnly cookies
  // Здесь можно сразу рендерить компонент

  return (
    <div className='flex flex-row items-stretch justify-stretch h-screen w-screen'>
      <SidebarProvider>
        <MainSidebar />
        <main className='flex flex-col justify-stretch items-stretch overflow-auto w-full max-w-[1200px] mx-auto'>
          {children}
        </main>
      </SidebarProvider>
    </div>
  );
}
