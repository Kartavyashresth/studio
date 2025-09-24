'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import type { AttendanceRecord } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, CalendarOff } from 'lucide-react';

export function AttendanceTracker({ attendance }: { attendance: AttendanceRecord[] }) {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const attendanceMap = new Map(attendance.map(item => [format(new Date(item.date), 'yyyy-MM-dd'), item.status]));

  const modifiers = {
    present: (d: Date) => attendanceMap.get(format(d, 'yyyy-MM-dd')) === 'Present',
    absent: (d: Date) => attendanceMap.get(format(d, 'yyyy-MM-dd')) === 'Absent',
    holiday: (d: Date) => attendanceMap.get(format(d, 'yyyy-MM-dd')) === 'Holiday',
  };

  const modifiersClassNames = {
    present: 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300 rounded-md',
    absent: 'bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-300 rounded-md',
    holiday: 'bg-gray-100 dark:bg-gray-800/50 text-gray-500 dark:text-gray-400 rounded-md opacity-70',
  };
  
  const selectedDateStatus = date ? attendanceMap.get(format(date, 'yyyy-MM-dd')) : undefined;

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card className="lg:col-span-2">
        <CardContent className="p-2">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="w-full"
            modifiers={modifiers}
            modifiersClassNames={modifiersClassNames}
          />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
            <CardTitle>Details</CardTitle>
            <CardDescription>{date ? format(date, 'PPP') : 'Select a date'}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="flex justify-center items-center text-center p-4 rounded-lg bg-muted/50 h-32">
                {selectedDateStatus ? (
                    <div className="flex flex-col items-center gap-2">
                        {selectedDateStatus === 'Present' && <CheckCircle className="h-8 w-8 text-green-500" />}
                        {selectedDateStatus === 'Absent' && <XCircle className="h-8 w-8 text-red-500" />}
                        {selectedDateStatus === 'Holiday' && <CalendarOff className="h-8 w-8 text-gray-500" />}
                        <Badge 
                            variant={
                                selectedDateStatus === 'Present' ? 'default' :
                                selectedDateStatus === 'Absent' ? 'destructive' : 'secondary'
                            }
                            className={cn(selectedDateStatus === 'Present' && 'bg-green-600')}
                        >
                            {selectedDateStatus}
                        </Badge>
                    </div>
                ) : (
                    <p className="text-muted-foreground">No record for this day.</p>
                )}
            </div>
             <div className="space-y-2 text-sm">
                <h3 className="font-semibold">Legend</h3>
                <div className="flex items-center gap-2">
                    <div className="h-4 w-4 rounded-md bg-green-100 dark:bg-green-900/50" />
                    <span className="text-muted-foreground">Present</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="h-4 w-4 rounded-md bg-red-100 dark:bg-red-900/50" />
                    <span className="text-muted-foreground">Absent</span>
                </div>
                 <div className="flex items-center gap-2">
                    <div className="h-4 w-4 rounded-md bg-gray-100 dark:bg-gray-800/50" />
                    <span className="text-muted-foreground">Holiday</span>
                </div>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
