import { AppLayout } from '@/components/app-layout';
import { StudentList } from '@/components/student-list';
import { students, facultyUser } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, FileClock, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function FacultyDashboardPage() {
    const pendingActivitiesCount = students.flatMap(student =>
        student.activities.filter(activity => activity.status === 'Pending')
    ).length;

    const totalStudents = students.length;

  return (
    <AppLayout>
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-headline tracking-tight">Welcome, {facultyUser.name}!</h1>
          <p className="text-muted-foreground mt-1">
            Here's an overview of student achievements for your mentorship and guidance.
          </p>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
              <FileClock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingActivitiesCount}</div>
              <p className="text-xs text-muted-foreground">Submissions awaiting your review.</p>
              <Button asChild variant="link" className="p-0 h-auto mt-2">
                <Link href="/faculty/verification">Review Requests</Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalStudents}</div>
              <p className="text-xs text-muted-foreground">Students under your mentorship.</p>
            </CardContent>
          </Card>
            <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Verified Activities</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">128</div>
              <p className="text-xs text-muted-foreground">Total activities you've approved this year.</p>
            </CardContent>
          </Card>
        </div>

        <div>
            <h2 className="text-2xl font-headline mb-4">Your Students</h2>
            <StudentList students={students} />
        </div>
      </div>
    </AppLayout>
  );
}
