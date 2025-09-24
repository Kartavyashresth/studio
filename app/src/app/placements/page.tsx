import { AppLayout } from '@/components/app-layout';
import { PlacementList } from '@/components/placement-list';
import { placements } from '@/lib/placements';

export default function PlacementsPage() {
  return (
    <AppLayout>
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-headline tracking-tight">Placement & Career Support</h1>
          <p className="text-muted-foreground mt-1">Explore internship and job opportunities.</p>
        </div>
        <PlacementList placements={placements} />
      </div>
    </AppLayout>
  );
}
