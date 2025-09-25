
import { AppLayout } from '@/components/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { UserCog, Cog, BarChart, UserPlus, FilePenLine } from 'lucide-react';
import { registeredFaculty, students } from '@/lib/data';
import { PublishNoticeForm } from '@/components/publish-notice-form';

export default function AdminDashboardPage({ searchParams }: { searchParams: { name?: string } }) {
  const adminName = searchParams.name || 'Admin';

  return (
    <AppLayout>
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-headline tracking-tight">Welcome, {adminName}!</h1>
          <p className="text-muted-foreground mt-1">
            Manage the Nexus platform and its users.
          </p>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Faculty Management</CardTitle>
              <UserPlus className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{registeredFaculty.length}</div>
              <p className="text-xs text-muted-foreground">Registered faculty members.</p>
              <Button asChild variant="link" className="p-0 h-auto mt-2">
                <Link href="/institute-admin/faculty-management">Manage Faculty</Link>
              </Button>
            </CardContent>
          </Card>
           <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">User Management</CardTitle>
              <UserCog className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{students.length + registeredFaculty.length}</div>
              <p className="text-xs text-muted-foreground">Total platform users.</p>
              <Button asChild variant="link" className="p-0 h-auto mt-2">
                <Link href="/institute-admin/user-management">Manage Users</Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Data & Reports</CardTitle>
              <BarChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5+</div>
              <p className="text-xs text-muted-foreground">Available report types.</p>
              <Button asChild variant="link" className="p-0 h-auto mt-2">
                <Link href="/institute-admin/reports">View Reports</Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Quick Actions</CardTitle>
               <Cog className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
                <PublishNoticeForm />
                <Button variant="outline" className="w-full justify-start" asChild>
                    <Link href="/institute-admin/system-configuration">
                        <Cog className="mr-2" />
                        System Configuration
                    </Link>
                </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
