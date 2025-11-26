'use client';

import { SidebarProvider } from '@/components/ui/shadcn/sidebar';
import MainSidebar from '@/components/ui/Sidebar/Sidebar';
import { AppFooter } from '@/components/ui/AppFooter';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex h-screen w-screen flex-col'>
      <SidebarProvider>
        <div className='flex flex-1 flex-row items-stretch justify-stretch overflow-hidden'>
          <MainSidebar />
          <div className='flex w-full flex-col overflow-auto'>
            <main className='mx-auto flex w-full max-w-[1200px] flex-1 flex-col items-stretch justify-stretch'>
              {children}
            </main>
            <AppFooter />
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
}
