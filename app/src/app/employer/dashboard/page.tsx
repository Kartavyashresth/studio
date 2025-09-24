import { AppLayout } from '@/components/app-layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Briefcase, Users, FileStack } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function EmployerDashboardPage({ searchParams }: { searchParams: { name?: string } }) {
  const employerName = searchParams.name || 'Employer';

  return (
    <AppLayout>
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-headline tracking-tight">Welcome, {employerName}!</h1>
          <p className="text-muted-foreground mt-1">
            Manage your recruitment pipeline and connect with top talent.
          </p>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Job Postings</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">Open positions awaiting candidates.</p>
              <Button asChild variant="link" className="p-0 h-auto mt-2">
                <Link href="/employer/postings">Manage Postings</Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
              <FileStack className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">82</div>
              <p className="text-xs text-muted-foreground">Received across all postings.</p>
               <Button asChild variant="link" className="p-0 h-auto mt-2">
                <Link href="/employer/applications">Review Applications</Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">New Candidates</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+15</div>
              <p className="text-xs text-muted-foreground">New profiles match your needs this week.</p>
              <Button asChild variant="link" className="p-0 h-auto mt-2">
                <Link href="/employer/search">Discover Talent</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center py-8">
            <h2 className="text-2xl font-headline mb-4">Ready to find your next hire?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">Use our powerful search tools to find verified student portfolios and connect with the best candidates for your roles.</p>
            <Button asChild size="lg">
                <Link href="/employer/search">Start Searching</Link>
            </Button>
        </div>
      </div>
    </AppLayout>
  );
}
