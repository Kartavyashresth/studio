import { AppLayout } from '@/components/app-layout';
import { EventGallery } from '@/components/event-gallery';

export default function GalleryPage() {
  return (
    <AppLayout>
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-headline tracking-tight">Event Gallery</h1>
          <p className="text-muted-foreground mt-1">Memories from our campus events.</p>
        </div>
        <EventGallery />
      </div>
    </AppLayout>
  );
}
