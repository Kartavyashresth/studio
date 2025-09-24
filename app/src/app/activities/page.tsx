import { AppLayout } from '@/components/app-layout';
import { ActivityList } from '@/components/activity-list';
import { ActivitySubmission } from '@/components/activity-submission';
import { activities } from '@/lib/data';

export default function ActivitiesPage() {
  return (
    <AppLayout>
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
            <div>
                <h1 className="text-3xl md:text-4xl font-headline tracking-tight">Your Activities</h1>
                <p className="text-muted-foreground mt-1">Manage and track all your co-curricular and extra-curricular achievements.</p>
            </div>
            <ActivitySubmission />
        </div>
        <ActivityList activities={activities} />
      </div>
    </AppLayout>
  );
}
