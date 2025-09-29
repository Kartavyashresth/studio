'use client';

import { useState } from 'react';
import { AppLayout } from '@/components/app-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { PlusCircle, UploadCloud, BookOpen, Users, BarChart } from 'lucide-react';
import { courses as initialCourses, students } from '@/lib/data';
import type { Course } from '@/lib/types';
import Image from 'next/image';
import { Progress } from '@/components/ui/progress';

export default function LmsManagementPage() {
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const { toast } = useToast();

  const handleAddCourse = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get('name') as string;
    const instructor = formData.get('instructor') as string;
    const category = formData.get('category') as string;

    if (!name || !instructor || !category) return;

    const newCourse: Course = {
      id: `crs${Math.random().toString(36).substring(2, 8)}`,
      name,
      instructor,
      category,
      progress: 0, // New courses start with 0 progress
      imageUrl: `https://picsum.photos/seed/${name.replace(/\s/g, '-')}/600/400`,
    };

    setCourses(prev => [newCourse, ...prev]);
    
    toast({
        title: 'Course Created',
        description: `The course "${name}" has been successfully added.`,
    });

    event.currentTarget.reset();
  };

  const studentsEnrolled = (courseId: string) => {
    // Mock logic for student enrollment
    return Math.floor(Math.random() * students.length) + 1;
  };
  
  const averageProgress = (courseId: string) => {
    // Mock logic for average progress
    return Math.floor(Math.random() * 80) + 10;
  }

  return (
    <AppLayout>
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-headline tracking-tight">LMS Management</h1>
          <p className="text-muted-foreground mt-1">
            Create courses, upload content, and track learner progress.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="font-headline">Create New Course</CardTitle>
                <CardDescription>
                  Add a new course to the learning management system.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4" onSubmit={handleAddCourse}>
                  <div className="space-y-2">
                    <Label htmlFor="name">Course Name</Label>
                    <Input id="name" name="name" placeholder="e.g., Introduction to Physics" required />
                  </div>
                   <div className="space-y-2">
                    <Label htmlFor="instructor">Instructor</Label>
                    <Input id="instructor" name="instructor" placeholder="e.g., Dr. Jane Doe" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category/Department</Label>
                    <Input id="category" name="category" placeholder="e.g., Physics" required />
                  </div>
                  <Button type="submit" className="w-full">
                    <PlusCircle className="mr-2" />
                    Create Course
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-2 space-y-6">
            {courses.map(course => (
              <Card key={course.id}>
                <CardHeader>
                    <CardTitle>{course.name}</CardTitle>
                    <CardDescription>Taught by {course.instructor}</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-4">
                        <h4 className="font-semibold">Learner Management</h4>
                        <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                            <Users className="h-4 w-4"/> 
                            <span>{studentsEnrolled(course.id)} Students Enrolled</span>
                        </div>
                         <div className="space-y-1">
                             <div className="flex justify-between items-center text-sm text-muted-foreground">
                                <span>Average Progress</span>
                                <span>{averageProgress(course.id)}%</span>
                             </div>
                            <Progress value={averageProgress(course.id)} />
                         </div>
                         <Button variant="outline" size="sm"><BarChart className="mr-2"/> View Reports</Button>
                    </div>
                     <div className="space-y-4">
                        <h4 className="font-semibold">Content Administration</h4>
                         <Textarea placeholder="Add a link to a virtual session (e.g., Google Meet)" />
                         <Button variant="outline" className="w-full">
                            <UploadCloud className="mr-2"/> Upload Materials
                         </Button>
                    </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
