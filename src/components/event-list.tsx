'use client';

import type { CollegeEvent } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Ticket } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function EventList({ events }: { events: CollegeEvent[] }) {
  const { toast } = useToast();

  const handleRegister = (eventName: string) => {
    toast({
      title: 'Successfully Registered!',
      description: `You are now registered for ${eventName}.`,
    });
  };

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => (
        <Card key={event.id} className="flex flex-col overflow-hidden">
          <div className="relative">
            <Image 
              src={event.imageUrl} 
              alt={`${event.name} banner`}
              width={600} 
              height={400}
              data-ai-hint="event poster"
              className="w-full h-48 object-cover"
            />
          </div>
          <CardHeader>
            <CardTitle className="font-headline text-2xl">{event.name}</CardTitle>
            <div className="flex flex-wrap gap-2 pt-2">
              {event.tags.map(tag => (
                <Badge key={tag} variant="outline">{tag}</Badge>
              ))}
            </div>
          </CardHeader>
          <CardContent className="flex-grow space-y-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>{new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
             <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{event.location}</span>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-3 pt-2">
              {event.description}
            </p>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={() => handleRegister(event.name)}>
              <Ticket className="mr-2 h-4 w-4" />
              Register Now
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
