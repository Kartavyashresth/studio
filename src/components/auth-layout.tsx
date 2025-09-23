'use client';

import { usePathname } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { NexusLogo } from '@/components/nexus-logo';
import { AnimatePresence, motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export function AuthLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLogin = pathname === '/login';
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-muted/40 p-4">
             <div className="w-full max-w-md">
                <div className="mb-4 flex justify-center">
                    <NexusLogo className="h-12 w-12" />
                </div>
                <Card>{children}</Card>
            </div>
        </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-muted/40 p-4 perspective">
      <div className="w-full max-w-md">
        <div className="mb-4 flex justify-center">
          <NexusLogo className="h-12 w-12" />
        </div>
        <AnimatePresence mode="wait">
            <motion.div
                key={pathname}
                initial={{ opacity: 0, rotateY: isLogin ? -90 : 90 }}
                animate={{ opacity: 1, rotateY: 0 }}
                exit={{ opacity: 0, rotateY: isLogin ? 90 : -90 }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
                className="preserve-3d"
            >
                <Card className="backface-hidden">
                    {children}
                </Card>
            </motion.div>
        </AnimatePresence>
      </div>
    </main>
  );
}
