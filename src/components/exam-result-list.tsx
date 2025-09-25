'use client';

import { useState } from 'react';
import type { ExamResult } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download, ChevronDown, ChevronUp } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

export function ExamResultList({ results }: { results: ExamResult[] }) {
  const [openSemester, setOpenSemester] = useState<string | null>(results.length > 0 ? results[0].semester : null);

  return (
    <div className="space-y-4">
      {results.map((result) => (
        <Collapsible
          key={result.id}
          open={openSemester === result.semester}
          onOpenChange={() => setOpenSemester(openSemester === result.semester ? null : result.semester)}
        >
          <Card>
            <CollapsibleTrigger asChild>
              <div className="flex items-center justify-between p-4 cursor-pointer">
                <div>
                  <h3 className="text-lg font-semibold font-headline">{result.semester} Examinations</h3>
                  <p className="text-sm text-muted-foreground">Published on: {new Date(result.publishDate).toLocaleDateString()}</p>
                </div>
                <div className="flex items-center gap-4">
                  <Badge variant={result.overallGrade === 'FAIL' ? 'destructive' : 'default'} className="hidden sm:inline-flex">
                    Overall: {result.overallGrade}
                  </Badge>
                  <Button variant="ghost" size="icon">
                    {openSemester === result.semester ? <ChevronUp /> : <ChevronDown />}
                    <span className="sr-only">Toggle Details</span>
                  </Button>
                </div>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Course</TableHead>
                      <TableHead className="hidden sm:table-cell">Code</TableHead>
                      <TableHead className="text-right">Grade</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {result.courses.map(course => (
                      <TableRow key={course.courseCode}>
                        <TableCell className="font-medium">{course.courseName}</TableCell>
                        <TableCell className="hidden sm:table-cell">
                          <Badge variant="outline">{course.courseCode}</Badge>
                        </TableCell>
                        <TableCell className="text-right font-semibold">{course.grade}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="p-4 flex justify-end">
                    <Button variant="outline">
                        <Download className="mr-2" />
                        Download Marksheet
                    </Button>
                </div>
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>
      ))}
    </div>
  );
}
