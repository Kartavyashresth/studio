import { AppLayout } from '@/components/app-layout';
import { AttendanceTracker } from '@/components/attendance-tracker';
import { attendanceData } from '@/lib/data';

export default function AttendancePage() {
  return (
    <AppLayout>
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-headline tracking-tight">Your Attendance</h1>
          <p className="text-muted-foreground mt-1">Track your presence for the current semester.</p>
        </div>
        <AttendanceTracker attendance={attendanceData} />
      </div>
    </AppLayout>
  );
}
