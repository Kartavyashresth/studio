'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { SplashScreen } from '@/components/splash-screen';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/login');
    }, 4000); // 4 seconds delay for the splash screen

    return () => clearTimeout(timer);
  }, [router]);

  return <SplashScreen />;
}
