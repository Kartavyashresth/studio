'use client';

import type { CollegeEvent } from '@/lib/types';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

const galleryImages = [
  {
    id: 'img001',
    name: 'Hackathon Finals',
    width: 600,
    height: 400,
    imageUrl: 'https://picsum.photos/seed/gallery1/600/400',
  },
  {
    id: 'img002',
    name: 'Award Ceremony',
    width: 400,
    height: 600,
    imageUrl: 'https://picsum.photos/seed/gallery2/400/600',
  },
  {
    id: 'img003',
    name: 'Project Expo',
    width: 600,
    height: 400,
    imageUrl: 'https://picsum.photos/seed/gallery3/600/400',
  },
  {
    id: 'img004',
    name: 'Annual Sports Meet',
    width: 400,
    height: 300,
    imageUrl: 'https://picsum.photos/seed/gallery4/400/300',
  },
    {
    id: 'img005',
    name: 'Guest Lecture',
    width: 600,
    height: 800,
    imageUrl: 'https://picsum.photos/seed/gallery5/600/800',
  },
   {
    id: 'img006',
    name: 'Convocation Day',
    width: 800,
    height: 400,
    imageUrl: 'https://picsum.photos/seed/gallery6/800/400',
  },
   {
    id: 'img007',
    name: 'Cultural Fest',
    width: 400,
    height: 500,
    imageUrl: 'https://picsum.photos/seed/gallery7/400/500',
  },
  {
    id: 'img008',
    name: 'Science Fair',
    width: 600,
    height: 400,
    imageUrl: 'https://picsum.photos/seed/gallery8/600/400',
  },
];

export function EventGallery({ events }: { events: CollegeEvent[] }) {
  return (
    <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
      {galleryImages.map((image, index) => (
        <Dialog key={`${image.id}-${index}`}>
          <DialogTrigger asChild>
            <div className="group relative w-full overflow-hidden rounded-lg cursor-pointer break-inside-avoid">
              <Image
                src={image.imageUrl}
                alt={`Image from ${image.name}`}
                width={image.width}
                height={image.height}
                data-ai-hint="event photo"
                className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
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
                        src={img.imageUrl}
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
