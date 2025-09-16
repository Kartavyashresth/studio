import type { Placement } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Building2, ExternalLink, MapPin } from 'lucide-react';

export function PlacementList({ placements }: { placements: Placement[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {placements.map((placement) => (
        <Card key={placement.id} className="flex flex-col">
          <CardHeader>
            <div className="flex items-start gap-4">
              <Image 
                src={placement.companyLogoUrl} 
                alt={`${placement.companyName} logo`}
                width={56} 
                height={56}
                data-ai-hint="company logo"
                className="rounded-lg border p-1 aspect-square object-contain"
              />
              <div>
                <CardTitle className="font-headline text-2xl">{placement.role}</CardTitle>
                <CardDescription className="flex items-center gap-2">
                    <Building2 className="h-4 w-4" />
                    {placement.companyName}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex-grow space-y-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{placement.location}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant={placement.type === 'Internship' ? 'secondary' : 'default'}>
                {placement.type}
              </Badge>
              {placement.tags.map(tag => (
                <Badge key={tag} variant="outline">{tag}</Badge>
              ))}
            </div>
            <p className="text-sm text-muted-foreground line-clamp-3">
              {placement.description}
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <a href="#" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                Apply Now
              </a>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
