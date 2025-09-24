
import { AppLayout } from '@/components/app-layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ActivityList } from '@/components/activity-list';
import { academicStats, user, activities } from '@/lib/data';
import { GraduationCap, Percent, Star, Target } from 'lucide-react';

export default function DashboardPage({ searchParams }: { searchParams: { name?: string } }) {
  const recentActivities = [...activities]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 4);
    
  const userName = searchParams.name || user.name;
  const firstName = userName.split(' ')[0];

  return (
    <AppLayout>
      <div className="flex flex-col gap-8">
        <header>
            <h1 className="text-3xl md:text-4xl font-headline tracking-tight">Welcome back, {firstName}!</h1>
            <p className="text-muted-foreground mt-1">Here's a summary of your academic journey.</p>
        </header>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overall GPA</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{academicStats.gpa.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">Out of 4.0</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Attendance</CardTitle>
              <Percent className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{academicStats.attendance}%</div>
              <p className="text-xs text-muted-foreground">Across all subjects this semester</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Credits Earned</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+{academicStats.credits}</div>
              <p className="text-xs text-muted-foreground">Total academic and activity credits</p>
            </CardContent>
          </Card>
        </div>

        <div>
            <h2 className="text-2xl font-headline mb-4">Recent Activity</h2>
            <ActivityList activities={recentActivities} />
        </div>
      </div>
    </AppLayout>
  );
}
