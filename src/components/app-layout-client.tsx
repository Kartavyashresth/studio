'use client';

import type { PropsWithChildren } from 'react';
import { MainNav } from '@/components/main-nav';
import { SiteHeader } from '@/components/site-header';
import { Chatbot } from '@/components/chatbot';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

export function AppLayoutClient({ children }: PropsWithChildren) {
  const pathname = usePathname();
  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <div className="flex min-h-screen">
        <MainNav />
        <main className="flex-1 flex flex-col">
          <SiteHeader />
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="flex-1 p-4 sm:p-6 md:p-8"
          >
            {children}
          </motion.div>
        </main>
      </div>
      <Chatbot />
    </div>
  );
}
