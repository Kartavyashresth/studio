'use client';

import { AppLayout } from '@/components/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building2, MapPin, Users, PlusCircle, Trash2, Edit } from 'lucide-react';

const jobPostings = [
    { id: 'job001', role: 'Frontend Developer Intern', location: 'Remote', applicants: 15, status: 'Open' },
    { id: 'job002', role: 'Data Analyst (Full-time)', location: 'New York, NY', applicants: 32, status: 'Open' },
    { id: 'job003', role: 'UX/UI Designer', location: 'San Francisco, CA', applicants: 8, status: 'Open' },
    { id: 'job004', role: 'Marketing Intern', location: 'Remote', applicants: 45, status: 'Closed' },
];

export default function JobPostingsPage() {
  return (
    <AppLayout>
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
            <div>
                <h1 className="text-3xl md:text-4xl font-headline tracking-tight">Your Job Postings</h1>
                <p className="text-muted-foreground mt-1">Create, manage, and track your career opportunities.</p>
            </div>
            <Button>
                <PlusCircle className="mr-2" />
                Create New Posting
            </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {jobPostings.map((job) => (
                <Card key={job.id} className="flex flex-col">
                    <CardHeader>
                        <CardTitle className="font-headline text-2xl">{job.role}</CardTitle>
                        <CardDescription className="flex items-center gap-2 pt-1">
                            <MapPin className="h-4 w-4" /> {job.location}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow space-y-4">
                        <div className="flex items-center gap-2">
                             <Badge variant={job.status === 'Open' ? 'default' : 'secondary'}>
                                {job.status}
                            </Badge>
                             <div className="flex items-center text-sm text-muted-foreground gap-2">
                                <Users className="h-4 w-4" />
                                <span>{job.applicants} Applicants</span>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                         <Button variant="outline">View Applicants</Button>
                         <div className="flex gap-2">
                            <Button variant="ghost" size="icon"><Edit className="h-4 w-4" /></Button>
                            <Button variant="ghost" size="icon" className="text-destructive"><Trash2 className="h-4 w-4" /></Button>
                         </div>
                    </CardFooter>
                </Card>
            ))}
        </div>
      </div>
    </AppLayout>
  );
}
