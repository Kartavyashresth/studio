import { AppLayout } from '@/components/app-layout';
import { VerificationRequestList } from '@/components/verification-request-list';
import { students } from '@/lib/data';

export default function VerificationPage() {
  // Aggregate all pending activities from all students
  const pendingActivities = students.flatMap(student => 
    student.activities
      .filter(activity => activity.status === 'Pending')
      .map(activity => ({ ...activity, studentName: student.name, studentId: student.studentId }))
  );

  return (
    <AppLayout>
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-headline tracking-tight">Verification Requests</h1>
          <p className="text-muted-foreground mt-1">
            Review and approve or reject student activity submissions.
          </p>
        </div>
        <VerificationRequestList requests={pendingActivities} />
      </div>
    </AppLayout>
  );
}
