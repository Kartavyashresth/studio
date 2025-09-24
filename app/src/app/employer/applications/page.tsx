import { AppLayout } from '@/components/app-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { students } from '@/lib/data';
import Image from 'next/image';
import { Eye, CheckCircle, XCircle, Star } from 'lucide-react';

const applications = [
  { id: 'app001', studentId: 'STU123456', jobRole: 'Frontend Developer Intern', date: '2024-05-20', status: 'Pending', isShortlisted: false },
  { id: 'app002', studentId: 'STU654321', jobRole: 'Data Analyst (Full-time)', date: '2024-05-18', status: 'Reviewed', isShortlisted: true },
  { id: 'app003', studentId: 'STU345678', jobRole: 'Frontend Developer Intern', date: '2024-05-21', status: 'Pending', isShortlisted: false },
  { id: 'app004', studentId: 'STU789012', jobRole: 'Data Analyst (Full-time)', date: '2024-05-15', status: 'Rejected', isShortlisted: false },
];

const getStudentById = (id: string) => students.find(s => s.studentId === id);

export default function ApplicationsPage() {
  return (
    <AppLayout>
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-headline tracking-tight">Application Tracking</h1>
          <p className="text-muted-foreground mt-1">Review and manage student applications for your job postings.</p>
        </div>

        <Card>
            <CardContent className="p-0">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Candidate</TableHead>
                            <TableHead className="hidden md:table-cell">Applying For</TableHead>
                             <TableHead className="hidden sm:table-cell">Date</TableHead>
                            <TableHead className="hidden sm:table-cell">Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {applications.map(app => {
                            const student = getStudentById(app.studentId);
                            if (!student) return null;
                            return (
                                <TableRow key={app.id}>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Image src={student.avatarUrl} width={40} height={40} alt={student.name} data-ai-hint="profile picture" className="rounded-full" />
                                            <div>
                                                <div className="font-medium">{student.name}</div>
                                                <div className="text-sm text-muted-foreground md:hidden">{app.jobRole}</div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">{app.jobRole}</TableCell>
                                    <TableCell className="hidden sm:table-cell">{new Date(app.date).toLocaleDateString()}</TableCell>
                                     <TableCell className="hidden sm:table-cell">
                                        <Badge variant={app.status === 'Rejected' ? 'destructive' : 'secondary'}>{app.status}</Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Button variant={app.isShortlisted ? 'default' : 'outline'} size="icon">
                                                <Star className="h-4 w-4" />
                                            </Button>
                                            <Button variant="outline" size="icon"><Eye className="h-4 w-4" /></Button>
                                            <Button variant="outline" size="icon"><XCircle className="h-4 w-4 text-destructive" /></Button>
                                            <Button variant="outline" size="icon"><CheckCircle className="h-4 w-4 text-green-600" /></Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
