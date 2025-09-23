'use client';

import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { NexusLogo } from '@/components/nexus-logo';
import { useEffect, useState } from 'react';

export function AuthLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const isRegister = pathname === '/register';

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-muted/40 p-4 perspective">
      <div className="w-full max-w-md">
        <div className="mb-4 flex justify-center">
          <NexusLogo className="h-12 w-12" />
        </div>
        <AnimatePresence initial={false}>
          <motion.div
            key={pathname}
            className="preserve-3d"
            initial={{ rotateY: isRegister ? -180 : 0 }}
            animate={{ rotateY: 0 }}
            exit={{ rotateY: isRegister ? 0 : 180 }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
          >
            {isClient && (
              <Card className="overflow-hidden backface-hidden">
                {children}
              </Card>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  );
}
