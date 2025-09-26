
'use client';

import dynamic from 'next/dynamic';
import { AppLayout } from '@/components/app-layout';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const DashboardContent = dynamic(
  () => import('@/components/dashboard-content').then((mod) => mod.DashboardContent),
  {
    ssr: false,
    loading: () => <DashboardSkeleton />,
  }
);

function DashboardSkeleton() {
    return (
        <div className="flex flex-col gap-8">
            <header>
                <Skeleton className="h-10 w-1/2" />
                <Skeleton className="h-4 w-1/3 mt-2" />
            </header>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card><CardContent className="p-6"><Skeleton className="h-20" /></CardContent></Card>
                <Card><CardContent className="p-6"><Skeleton className="h-20" /></CardContent></Card>
                <Card><CardContent className="p-6"><Skeleton className="h-20" /></CardContent></Card>
                <Card><CardContent className="p-6"><Skeleton className="h-20" /></CardContent></Card>
            </div>
             <div className="grid gap-8 lg:grid-cols-3">
                <div className="lg:col-span-2">
                    <Card><CardContent className="p-6"><Skeleton className="h-72" /></CardContent></Card>
                </div>
                <div className="lg:col-span-1">
                    <Card><CardContent className="p-6"><Skeleton className="h-72" /></CardContent></Card>
                </div>
            </div>
        </div>
    );
}

export default function DashboardPage() {
  return (
    <AppLayout>
      <DashboardContent />
    </AppLayout>
  );
}
