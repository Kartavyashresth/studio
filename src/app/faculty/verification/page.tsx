import { AppLayout } from '@/components/app-layout';
import { VerificationRequestList } from '@/components/verification-request-list';
import { students, facultyUser } from '@/lib/data';

export default function VerificationPage() {
  // Aggregate all pending activities from students in the faculty's branch
  const pendingActivities = students.flatMap(student =>
    student.branch === facultyUser.branch
      ? student.activities
          .filter(activity => activity.status === 'Pending')
          .map(activity => ({
            ...activity,
            studentName: student.name,
            studentId: student.studentId,
            // Use a placeholder if documentUrl is missing for the demo
            documentUrl:
              activity.documentUrl ||
              'https://picsum.photos/seed/doc-placeholder/800/1100',
          }))
      : []
  );

  return (
    <AppLayout>
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-headline tracking-tight">Verification Requests</h1>
          <p className="text-muted-foreground mt-1">
            Review and approve or reject student activity submissions from your branch.
          </p>
        </div>
        <VerificationRequestList requests={pendingActivities} />
      </div>
    </AppLayout>
  );
}
