import { AppLayout } from '@/components/app-layout';
import { GalleryManagement } from '@/components/gallery-management';

export default function GalleryManagementPage() {
  return (
    <AppLayout>
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-headline tracking-tight">Gallery Management</h1>
          <p className="text-muted-foreground mt-1">Upload and manage photos for the student event gallery.</p>
        </div>
        <GalleryManagement />
      </div>
    </AppLayout>
  );
}
