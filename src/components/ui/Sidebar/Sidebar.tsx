'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from '@/components/ui/shadcn/sidebar';
import Link from 'next/link';
import { LogOut } from 'lucide-react';

import { SIDEBAR_SECTION_ICONS } from '@/components/icons/sidebar-section-icons';
import { SIDEBAR_SECTION_CODES, SIDEBAR_SECTION_TITLES } from '@/lib/data';
import { SIDEBAR_SECTION_URLS } from '@/lib/data/titles/sidebar-section-urls';
import { usePathname } from 'next/navigation';

export default function MainSidebar() {
  const pathname = usePathname();

  const sections = SIDEBAR_SECTION_CODES.map(code => ({
    code,
    title: SIDEBAR_SECTION_TITLES[code],
    url: SIDEBAR_SECTION_URLS[code],
    icon: SIDEBAR_SECTION_ICONS[code],
  }));

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      // После успешного logout редиректим на login
      window.location.href = '/login';
    } catch {
      // В случае ошибки все равно редиректим
      window.location.href = '/login';
    }
  };

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{process.env.NEXT_PUBLIC_SERVICE_TITLE}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sections.map(({ code, title, url, icon }) => (
                <SidebarMenuItem key={code}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname.startsWith(url)}
                  >
                    <Link href={url}>
                      {icon}
                      {title}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarSeparator />
              <SidebarMenuItem>
                <SidebarMenuButton onClick={handleLogout}>
                  <LogOut className='h-4 w-4' />
                  Выйти
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
