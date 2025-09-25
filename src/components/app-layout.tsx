'use client';

import type { PropsWithChildren } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the client-side layout to prevent hydration errors.
// The ssr: false option ensures this component only renders on the client.
const AppLayoutClient = dynamic(() => import('./app-layout-client').then(mod => mod.AppLayoutClient), {
  ssr: false,
});

export function AppLayout({ children }: PropsWithChildren) {
  return <AppLayoutClient>{children}</AppLayoutClient>;
}
