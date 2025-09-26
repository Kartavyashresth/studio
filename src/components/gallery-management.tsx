'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { UploadCloud, Trash2, ImagePlus } from 'lucide-react';
import type { UploadedImage } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

const GALLERY_STORAGE_KEY = 'nexus-gallery-images';

export function GalleryManagement() {
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [isClient, setIsClient] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    setIsClient(true);
    try {
      const storedImages = localStorage.getItem(GALLERY_STORAGE_KEY);
      if (storedImages) {
        setImages(JSON.parse(storedImages));
      }
    } catch (error) {
      console.error("Failed to parse gallery images from localStorage", error);
    }
  }, []);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem(GALLERY_STORAGE_KEY, JSON.stringify(images));
    }
  }, [images, isClient]);

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const newImages: UploadedImage[] = [];
    let processedFiles = 0;
    const totalFiles = files.length;

    Array.from(files).forEach(file => {
      if (!file.type.startsWith('image/')) {
        processedFiles++;
        if (processedFiles === totalFiles) {
          if (newImages.length > 0) {
            setImages(prev => [...prev, ...newImages]);
            toast({
              title: "Upload Successful",
              description: `${newImages.length} image(s) have been added to the gallery.`,
            });
          }
        }
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          newImages.push({
            id: `${Date.now()}-${file.name}`,
            dataUrl: e.target.result as string,
          });
        }
        processedFiles++;
        if (processedFiles === totalFiles) {
          if (newImages.length > 0) {
            setImages(prev => [...prev, ...newImages]);
            toast({
              title: "Upload Successful",
              description: `${newImages.length} image(s) have been added to the gallery.`,
            });
          }
        }
      };
      reader.onerror = (error) => {
          console.error("Error reading file:", error);
          processedFiles++;
          if (processedFiles === totalFiles) {
             if (newImages.length > 0) {
                setImages(prev => [...prev, ...newImages]);
                toast({
                  title: "Upload Partially Successful",
                  description: `${newImages.length} image(s) have been added. Some files failed to upload.`,
                });
             }
          }
      };
      reader.readAsDataURL(file);
    });

    // Reset file input to allow re-uploading the same file
    if (event.target) {
        event.target.value = '';
    }
  };

  const handleDeleteImage = (id: string) => {
    setImages(prev => prev.filter(image => image.id !== id));
    toast({
        title: "Image Deleted",
        description: "The photo has been removed from the gallery.",
        variant: "destructive"
    });
  };
  
  if (!isClient) {
    return null; // Render nothing on the server to avoid hydration mismatch
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Upload New Photos</CardTitle>
          <CardDescription>Select one or more images to add to the student gallery.</CardDescription>
        </CardHeader>
        <CardContent>
          <Input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            multiple 
            accept="image/*"
            onChange={handleFileUpload}
            aria-hidden="true"
          />
          <Button onClick={handleFileSelect}>
            <UploadCloud className="mr-2" />
            Select Images
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
            <CardTitle>Current Gallery</CardTitle>
            <CardDescription>These are the images currently visible to students.</CardDescription>
        </CardHeader>
        <CardContent>
            {images.length > 0 ? (
                 <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {images.map(image => (
                        <div key={image.id} className="relative group">
                            <Image 
                                src={image.dataUrl} 
                                alt="Uploaded to gallery" 
                                width={200} 
                                height={200}
                                data-ai-hint="event photo"
                                className="rounded-lg object-cover aspect-square"
                            />
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                                <Button variant="destructive" size="icon" onClick={() => handleDeleteImage(image.id)}>
                                    <Trash2 />
                                    <span className="sr-only">Delete Image</span>
                                </Button>
                            </div>
                        </div>
                    ))}
                 </div>
            ) : (
                <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
                    <ImagePlus className="mx-auto h-12 w-12 text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-semibold font-headline">No Photos Uploaded</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Use the uploader above to add photos to the gallery.
                    </p>
                </div>
            )}
        </CardContent>
      </Card>
    </div>
  );
}
