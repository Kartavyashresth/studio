import { AppLayout } from '@/components/app-layout';
import { StudentList } from '@/components/student-list';
import { students } from '@/lib/data';

export default function FacultyDashboardPage() {
  return (
    <AppLayout>
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-headline tracking-tight">Faculty Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Overview of student achievements for mentorship and guidance.
          </p>
        </div>
        <StudentList students={students} />
      </div>
    </AppLayout>
  );
}
