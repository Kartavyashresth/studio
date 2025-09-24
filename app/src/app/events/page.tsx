import { AppLayout } from '@/components/app-layout';
import { EventList } from '@/components/event-list';
import { events } from '@/lib/events';

export default function EventsPage() {
  return (
    <AppLayout>
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-headline tracking-tight">Upcoming Events</h1>
          <p className="text-muted-foreground mt-1">Get involved in campus life. Register for events and workshops.</p>
        </div>
        <EventList events={events} />
      </div>
    </AppLayout>
  );
}
