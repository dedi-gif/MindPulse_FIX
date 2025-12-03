
'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, Book, Activity, Settings, Home } from 'lucide-react';
import { Logo } from '@/components/icons/logo';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';


const navItems = [
  { href: '/', label: 'Beranda', icon: Home },
  { href: '/history', label: 'Jurnal', icon: Book },
  { href: '/insights', label: 'Aktivitas', icon: Activity },
  { href: '/settings', label: 'Pengaturan', icon: Settings },
];

const desktopNavItems = [
    { href: '/', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/history', label: 'Jurnal', icon: Book },
    { href: '/insights', label: 'Aktivitas', icon: Activity },
    { href: '/settings', label: 'Pengaturan', icon: Settings },
]

const BottomNavBar = () => {
    const pathname = usePathname();
    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-sm border-t p-2 z-40">
            <div className="grid grid-cols-4 gap-2">
                {navItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                            "flex flex-col items-center justify-center gap-1 p-2 rounded-lg transition-colors",
                            pathname === item.href ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-accent"
                        )}
                    >
                        <item.icon className="h-5 w-5" />
                        <span className="text-xs font-medium">{item.label}</span>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isMobile = useIsMobile();

  const currentNavItems = isMobile ? navItems : desktopNavItems;
  const currentLabel = navItems.find(item => item.href === pathname)?.label

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="md:hidden" asChild>
              <Link href="/">
                <Logo />
              </Link>
            </Button>
            <div className="flex items-center gap-2 group-data-[collapsible=icon]:hidden">
              <Logo />
              <h1 className="font-bold text-lg font-headline">MindPulse</h1>
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {desktopNavItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href}
                  tooltip={item.label}
                >
                  <Link href={item.href}>
                    <item.icon />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <SidebarInset className="flex flex-col pb-20 md:pb-0">
        <header className="flex h-14 items-center gap-4 border-b bg-background/50 backdrop-blur-sm px-4 md:px-6 sticky top-0 z-30">
            <SidebarTrigger className="md:hidden" />
            <div className='flex-1'>
                <h2 className="text-lg font-semibold font-headline">
                    {currentLabel}
                </h2>
            </div>
        </header>
        <main className="flex-1 flex flex-col">{children}</main>
        <BottomNavBar />
      </SidebarInset>
    </SidebarProvider>
  );
}
