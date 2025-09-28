'use client';

import type { Activity } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { CheckCircle, Clock, XCircle, FileText } from 'lucide-react';
import { useRouter } from 'next/navigation';

type StatusConfig = {
  [key in Activity['status']]: {
    icon: React.ElementType;
    color: string;
    label: string;
  };
};

const statusConfig: StatusConfig = {
  Approved: {
    icon: CheckCircle,
    color: 'text-green-600',
    label: 'Approved',
  },
  Pending: {
    icon: Clock,
    color: 'text-amber-600',
    label: 'Pending',
  },
  Rejected: {
    icon: XCircle,
    color: 'text-red-600',
    label: 'Rejected',
  },
};

export function ActivityList({ activities }: { activities: Activity[] }) {
  const router = useRouter();

  if (activities.length === 0) {
    return (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
            <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-semibold font-headline">No Activities Found</h3>
            <p className="mt-2 text-sm text-muted-foreground">
                You haven't submitted any activities yet.
            </p>
        </div>
    );
  }

  const handleRowClick = (activityId: string) => {
    router.push(`/activities/${activityId}`);
  };


  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Activity</TableHead>
              <TableHead className="hidden md:table-cell">Type</TableHead>
              <TableHead className="hidden sm:table-cell">Date</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activities.map((activity) => {
              const { icon: Icon, color, label } = statusConfig[activity.status];
              return (
                <TableRow key={activity.id} onClick={() => handleRowClick(activity.id)} className="cursor-pointer">
                  <TableCell>
                    <div className="font-medium">{activity.name}</div>
                    <div className="text-sm text-muted-foreground md:hidden">{activity.type}</div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge variant="outline">{activity.type}</Badge>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">{new Date(activity.date).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                     <div className={cn('flex items-center justify-end gap-2', color)}>
                        <Icon className="h-4 w-4" />
                        <span className='hidden sm:inline'>{label}</span>
                     </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
