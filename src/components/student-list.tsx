import type { Student } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Image from 'next/image';
import { Button } from './ui/button';
import { ChevronRight } from 'lucide-react';

export function StudentList({ students }: { students: Student[] }) {
  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student</TableHead>
              <TableHead className="hidden md:table-cell">Program</TableHead>
              <TableHead className="hidden sm:table-cell text-center">GPA</TableHead>
              <TableHead className="hidden sm:table-cell text-center">Credits</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.studentId}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Image
                      src={student.avatarUrl}
                      width={40}
                      height={40}
                      alt={student.name}
                      data-ai-hint="profile picture"
                      className="rounded-full"
                    />
                    <div>
                      <div className="font-medium">{student.name}</div>
                      <div className="text-sm text-muted-foreground">{student.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">{student.program}</TableCell>
                <TableCell className="hidden sm:table-cell text-center font-medium">
                  {student.stats.gpa.toFixed(2)}
                </TableCell>
                <TableCell className="hidden sm:table-cell text-center font-medium">
                  {student.stats.credits}
                </TableCell>
                <TableCell className="text-right">
                    <Button variant="ghost" size="icon">
                        <ChevronRight className="h-4 w-4" />
                        <span className="sr-only">View Details</span>
                    </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
