'use client';

import { useState, useEffect } from 'react';
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
import { CameraOff } from 'lucide-react';
import type { UploadedImage } from '@/lib/types';

const GALLERY_STORAGE_KEY = 'nexus-gallery-images';

export function EventGallery() {
  const [galleryImages, setGalleryImages] = useState<UploadedImage[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const storedImages = localStorage.getItem(GALLERY_STORAGE_KEY);
    if (storedImages) {
      setGalleryImages(JSON.parse(storedImages));
    }
  }, []);

  if (!isClient) {
    // Render a placeholder or nothing on the server
    return null; 
  }

  if (galleryImages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
        <CameraOff className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-semibold font-headline">The Gallery is Empty</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Check back later to see photos from campus events.
        </p>
      </div>
    );
  }

  return (
    <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
      {galleryImages.map((image, index) => (
        <Dialog key={`${image.id}-${index}`}>
          <DialogTrigger asChild>
            <div className="group relative w-full overflow-hidden rounded-lg cursor-pointer break-inside-avoid">
              <Image
                src={image.dataUrl}
                alt={`Gallery image ${index + 1}`}
                width={500}
                height={500}
                data-ai-hint="event photo"
                className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4 text-center text-white">
                <p className="font-semibold">Event Photo</p>
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
                        src={img.dataUrl}
                        alt={`Gallery image ${index + 1}`}
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
