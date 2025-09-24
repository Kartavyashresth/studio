import { AppLayout } from '@/components/app-layout';
import { CourseList } from '@/components/course-list';
import { courses } from '@/lib/data';

export default function CoursesPage() {
  return (
    <AppLayout>
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-headline tracking-tight">Your Courses</h1>
          <p className="text-muted-foreground mt-1">Manage your enrolled courses and track your progress.</p>
        </div>
        <CourseList courses={courses} />
      </div>
    </AppLayout>
  );
}
