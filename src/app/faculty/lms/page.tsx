
'use client';

import { useState } from 'react';
import { AppLayout } from '@/components/app-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { PlusCircle, UploadCloud, BookOpen, Users, BarChart, TrendingUp, User } from 'lucide-react';
import { courses as initialCourses, students } from '@/lib/data';
import type { Course } from '@/lib/types';
import { ResponsiveContainer, BarChart as RechartsBarChart, XAxis, YAxis, Tooltip, Legend, Bar, CartesianGrid } from 'recharts';


function CourseAnalytics({ courses }: { courses: Course[] }) {
    const chartData = courses.map(course => ({
        name: course.name,
        'Avg. Progress': Math.floor(Math.random() * 80) + 10, // Mock data
        'Students': Math.floor(Math.random() * students.length) + 1, // Mock data
    }));

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><TrendingUp /> Course Analytics</CardTitle>
                <CardDescription>Overview of student enrollment and average progress across your courses.</CardDescription>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <RechartsBarChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" tick={{ fontSize: 12 }} angle={-15} textAnchor="end" height={50} />
                        <YAxis />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'hsl(var(--background))',
                                borderColor: 'hsl(var(--border))',
                            }}
                        />
                        <Legend />
                        <Bar dataKey="Students" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="Avg. Progress" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
                    </RechartsBarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}

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
          <div className="lg:col-span-2 space-y-8">
             <CourseAnalytics courses={courses} />
            
             <h2 className="text-2xl font-headline">Course Administration</h2>
             <div className="space-y-6">
                {courses.map(course => (
                <Card key={course.id}>
                    <CardHeader>
                        <CardTitle>{course.name}</CardTitle>
                        <CardDescription>Taught by {course.instructor}</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-4">
                            <h4 className="font-semibold">Content Administration</h4>
                            <Textarea placeholder="Add a link to a virtual session (e.g., Google Meet)" />
                            <Button variant="outline" className="w-full">
                                <UploadCloud className="mr-2"/> Upload Materials
                            </Button>
                        </div>
                        <div className="space-y-4">
                            <h4 className="font-semibold">Learner Tools</h4>
                            <Button variant="outline" className="w-full"><BarChart className="mr-2"/> View Detailed Reports</Button>
                            <Button variant="outline" className="w-full"><Users className="mr-2"/> Manage Enrollment</Button>
                        </div>
                    </CardContent>
                </Card>
                ))}
            </div>
          </div>
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
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
        </div>
      </div>
    </AppLayout>
  );
}
