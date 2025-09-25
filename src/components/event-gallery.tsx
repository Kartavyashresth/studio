'use client';

import type { CollegeEvent } from '@/lib/types';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

export function EventGallery({ events }: { events: CollegeEvent[] }) {
  const galleryImages = events.flatMap(event => 
    Array.from({ length: 5 }, (_, i) => ({
      ...event,
      galleryImageUrl: `https://picsum.photos/seed/${event.id}-gallery${i + 1}/600/400`,
    }))
  );

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {galleryImages.map((image, index) => (
        <Dialog key={`${image.id}-${index}`}>
          <DialogTrigger asChild>
            <div className="group relative aspect-square w-full overflow-hidden rounded-lg cursor-pointer">
              <Image
                src={image.galleryImageUrl}
                alt={`Image from ${image.name}`}
                fill
                data-ai-hint="event photo"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4 text-center text-white">
                <p className="font-semibold">{image.name}</p>
              </div>
            </div>
          </DialogTrigger>
          <DialogContent className="max-w-4xl p-0 border-0 bg-transparent">
             <Carousel>
                <CarouselContent>
                    {galleryImages.map((img, idx) => (
                        <CarouselItem key={`${img.id}-${idx}`}>
                            <div className="relative aspect-video">
                                <Image
                                    src={img.galleryImageUrl}
                                    alt={`Image from ${img.name}`}
                                    fill
                                    data-ai-hint="event photo"
                                    className="object-contain"
                                />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="absolute left-4" />
                <CarouselNext className="absolute right-4" />
            </Carousel>
          </DialogContent>
        </Dialog>
      ))}
    </div>
  );
}
