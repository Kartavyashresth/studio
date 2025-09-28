import { AppLayout } from '@/components/app-layout';
import { ActivityStatusTracker } from '@/components/activity-status-tracker';
import { activities } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ActivityDetailsPage({ params }: { params: { id: string } }) {
  const activity = activities.find(a => a.id === params.id);

  if (!activity) {
    return (
      <AppLayout>
        <div className="text-center">
            <h1 className="text-2xl font-bold">Activity not found</h1>
            <p className="text-muted-foreground">The requested activity could not be located.</p>
            <Button asChild variant="link" className="mt-4">
                <Link href="/activities">
                    <ArrowLeft className="mr-2" />
                    Back to all activities
                </Link>
            </Button>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="flex flex-col gap-8">
        <div>
            <Button asChild variant="ghost" className="mb-4 -ml-4">
                <Link href="/activities">
                    <ArrowLeft className="mr-2" />
                    Back to Activities
                </Link>
            </Button>
          <h1 className="text-3xl md:text-4xl font-headline tracking-tight">{activity.name}</h1>
          <div className="flex items-center gap-4 mt-2">
            <Badge variant="outline">{activity.type}</Badge>
            <p className="text-muted-foreground">Submitted on: {new Date(activity.date).toLocaleDateString()}</p>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
            <ActivityStatusTracker activity={activity} />
            <Card>
                <CardHeader>
                    <CardTitle>Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                     <div>
                        <h4 className="font-semibold text-sm">Skills Gained</h4>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {activity.skills?.map(skill => (
                                <Badge key={skill} variant="secondary">{skill}</Badge>
                            )) || <p className="text-sm text-muted-foreground">No skills listed.</p>}
                        </div>
                    </div>
                     <div>
                        <h4 className="font-semibold text-sm">Credits Awarded</h4>
                        <p className="text-2xl font-bold">{activity.status === 'Approved' ? activity.credits : 'N/A'}</p>
                        <p className="text-xs text-muted-foreground">Credits are awarded upon approval.</p>
                    </div>
                     {activity.documentUrl && (
                        <div>
                            <h4 className="font-semibold text-sm mb-2">Supporting Document</h4>
                            <Button asChild variant="outline">
                                <Link href={activity.documentUrl} target="_blank" rel="noopener noreferrer">
                                    View Document
                                </Link>
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
      </div>
    </AppLayout>
  );
}
