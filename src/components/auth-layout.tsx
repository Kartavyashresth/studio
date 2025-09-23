'use client';

import { Card } from '@/components/ui/card';
import { NexusLogo } from '@/components/nexus-logo';

export function AuthLayout({ children }: { children: React.ReactNode }) {
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
