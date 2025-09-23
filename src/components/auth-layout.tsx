'use client';

import { usePathname } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { NexusLogo } from '@/components/nexus-logo';
import { AnimatePresence, motion } from 'framer-motion';

export function AuthLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-muted/40 p-4">
      <div className="w-full max-w-md">
        <div className="mb-4 flex justify-center">
          <NexusLogo className="h-12 w-12" />
        </div>
        <Card className="overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, x: pathname === '/login' ? -100 : 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: pathname === '/login' ? 100 : -100 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </Card>
      </div>
    </main>
  );
}
