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
    name: 'College Fest Crowd',
    width: 800,
    height: 533,
    imageUrl: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 'img002',
    name: 'Audience Watching a Presentation',
    width: 800,
    height: 533,
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 'img003',
    name: 'Live Concert Performance',
    width: 800,
    height: 533,
    imageUrl: 'https://images.unsplash.com/photo-1519750024442-3a3f5626b969?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 'img004',
    name: 'Speaker at a Conference',
    width: 800,
    height: 533,
    imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=2062&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 'img005',
    name: 'Group Discussion',
    width: 700,
    height: 933,
    imageUrl: 'https://images.unsplash.com/photo-1582192730842-d21a1a45f94d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 'img006',
    name: 'Outdoor Festival',
    width: 800,
    height: 533,
    imageUrl: 'https://images.unsplash.com/photo-1494500764479-0c8f2919a3d8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 'img007',
    name: 'Conference Presentation',
    width: 800,
    height: 533,
    imageUrl: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
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
            <Carousel
              opts={{
                startIndex: index,
              }}
            >
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
