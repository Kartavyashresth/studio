import { AppLayout } from '@/components/app-layout';
import { courses, students, facultyUser } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, User, FileText, Video, Presentation, MessageSquare, Send, BookCopy, PenSquare } from 'lucide-react';
import Link from 'next/link';

export default function CourseDetailsPage({ params }: { params: { id: string } }) {
  const course = courses.find(c => c.id === params.id);

  if (!course) {
    notFound();
  }

  const courseMaterials = [
    { type: 'Video', title: 'Week 1: Introduction', icon: Video },
    { type: 'Presentation', title: 'Week 1: Slides', icon: Presentation },
    { type: 'Document', title: 'Reading: Chapter 1', icon: FileText },
    { type: 'Video', title: 'Week 2: Core Concepts', icon: Video },
  ];

  const courseAssessments = [
    { type: 'Quiz', title: 'Week 1 Quiz', status: 'Completed', score: '9/10' },
    { type: 'Assignment', title: 'Project Proposal', status: 'Submitted' },
    { type: 'Quiz', title: 'Week 2 Quiz', status: 'Not Started' },
  ]

  const discussionThreads = [
    { id: 1, author: students[1].name, message: 'Does anyone have clarification on the second topic from the lecture?', replies: [{ author: facultyUser.name, message: 'Good question! I\'ve added an extra resource link in the materials section.' }] },
    { id: 2, author: students[2].name, message: 'The project proposal deadline is this Friday, right?', replies: [] }
  ]

  return (
    <AppLayout>
        <Button asChild variant="ghost" className="mb-4 -ml-4">
            <Link href="/courses">
                <ArrowLeft className="mr-2" />
                Back to Courses
            </Link>
        </Button>

      <div className="flex flex-col gap-8">
        <Card>
          <div className="relative h-64 w-full">
            <Image src={course.imageUrl} alt={course.name} data-ai-hint="course graphic" fill className="object-cover rounded-t-lg" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6">
                 <h1 className="text-3xl md:text-4xl font-headline tracking-tight text-primary-foreground">{course.name}</h1>
                 <p className="text-muted-foreground mt-1 text-white/80 flex items-center gap-2"><User className="h-4 w-4"/> Taught by {course.instructor}</p>
            </div>
          </div>
          <CardContent className="p-6 space-y-4">
             <div>
                <div className="flex justify-between items-center mb-1">
                    <p className="text-sm text-muted-foreground">Your Progress</p>
                    <p className="text-sm font-semibold">{course.progress}%</p>
                </div>
                <Progress value={course.progress} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="materials" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="materials"><BookCopy className="mr-2"/> Course Materials</TabsTrigger>
            <TabsTrigger value="assessments"><PenSquare className="mr-2"/> Assessments</TabsTrigger>
            <TabsTrigger value="discussions"><MessageSquare className="mr-2"/> Discussions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="materials" className="mt-4">
            <Card>
                <CardHeader><CardTitle>Content & Materials</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                    {courseMaterials.map((material, index) => (
                        <div key={index} className="flex items-center justify-between p-3 rounded-lg border bg-muted/20">
                            <div className="flex items-center gap-4">
                                <material.icon className="h-5 w-5 text-primary" />
                                <span className="font-medium">{material.title}</span>
                            </div>
                            <Button variant="outline" size="sm">View</Button>
                        </div>
                    ))}
                </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="assessments" className="mt-4">
             <Card>
                <CardHeader><CardTitle>Tests & Assignments</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                    {courseAssessments.map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-3 rounded-lg border bg-muted/20">
                            <div className="flex flex-col">
                                <span className="font-medium">{item.title}</span>
                                <span className="text-sm text-muted-foreground">Status: {item.status} {item.score && `| Score: ${item.score}`}</span>
                            </div>
                            <Button variant="outline" size="sm" disabled={item.status !== 'Not Started'}>Start Now</Button>
                        </div>
                    ))}
                </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="discussions" className="mt-4">
             <Card>
                <CardHeader><CardTitle>Discussion Forum</CardTitle></CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-4">
                        {discussionThreads.map(thread => (
                            <div key={thread.id} className="p-4 border rounded-lg">
                                <p className="font-semibold">{thread.author}</p>
                                <p className="text-muted-foreground text-sm my-2">{thread.message}</p>
                                {thread.replies.map((reply, i) => (
                                     <div key={i} className="p-3 mt-2 border-l-2 border-primary bg-muted/50 rounded-r-lg">
                                         <p className="font-semibold text-sm">{reply.author}</p>
                                         <p className="text-muted-foreground text-xs mt-1">{reply.message}</p>
                                     </div>
                                ))}
                            </div>
                        ))}
                    </div>
                    <div className="flex items-center gap-2">
                        <textarea placeholder="Ask a question or start a new discussion..." className="w-full p-2 border rounded-md bg-transparent text-sm" />
                        <Button><Send className="h-4 w-4" /></Button>
                    </div>
                </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
