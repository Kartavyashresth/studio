import type { PropsWithChildren } from 'react';
import { MainNav } from '@/components/main-nav';
import { SiteHeader } from '@/components/site-header';
import { Chatbot } from '@/components/chatbot';

export function AppLayout({ children }: PropsWithChildren) {
  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <div className="flex min-h-screen">
        <MainNav />
        <main className="flex-1 flex flex-col">
          <SiteHeader />
          <div className="flex-1 p-4 sm:p-6 md:p-8">
            {children}
          </div>
        </main>
      </div>
      <Chatbot />
    </div>
  );
}
