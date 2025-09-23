'use client';

import type { Course } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowRight, User } from 'lucide-react';

export function CourseList({ courses }: { courses: Course[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {courses.map((course) => (
        <Card key={course.id} className="flex flex-col overflow-hidden">
          <div className="relative">
            <Image 
              src={course.imageUrl} 
              alt={`${course.name} banner`}
              width={600} 
              height={400}
              data-ai-hint="course graphic"
              className="w-full h-48 object-cover"
            />
             <Badge className="absolute top-3 right-3">{course.category}</Badge>
          </div>
          <CardHeader>
            <CardTitle className="font-headline text-2xl">{course.name}</CardTitle>
             <div className="flex items-center gap-2 text-sm text-muted-foreground pt-1">
              <User className="h-4 w-4" />
              <span>{course.instructor}</span>
            </div>
          </CardHeader>
          <CardContent className="flex-grow space-y-3">
            <div>
                <div className="flex justify-between items-center mb-1">
                    <p className="text-sm text-muted-foreground">Progress</p>
                    <p className="text-sm font-semibold">{course.progress}%</p>
                </div>
                <Progress value={course.progress} className="h-2" />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">
              Continue Learning
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
