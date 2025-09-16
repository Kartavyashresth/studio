
'use client';

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
import { ChevronRight, ChevronsUpDown, BarChart, BrainCircuit, Dumbbell } from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Badge } from './ui/badge';
import { cn } from '@/lib/utils';
import { useState } from 'react';

// A simple categorization for demo purposes
const getSkillCategory = (skill: string) => {
  const academicSkills = ['Machine Learning', 'Python', 'React', 'Node.js', 'Research', 'Data Analysis', 'CAD', 'Java', 'Academic Writing', 'Critical Thinking', 'Problem Solving'];
  const sportSkills = ['Athleticism', 'Sportsmanship', 'Teamwork'];

  if (academicSkills.includes(skill)) return 'Academics';
  if (sportSkills.includes(skill)) return 'Sports';
  return 'Other';
};

function StudentRow({ student }: { student: Student }) {
  const [isOpen, setIsOpen] = useState(false);
  
  const categorizedSkills = student.skills?.reduce((acc, skill) => {
    const category = getSkillCategory(skill);
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(skill);
    return acc;
  }, {} as Record<string, string[]>);

  const categoryIcons: Record<string, React.ReactNode> = {
    'Academics': <BrainCircuit className="h-4 w-4 text-blue-500" />,
    'Sports': <Dumbbell className="h-4 w-4 text-orange-500" />,
    'Other': <BarChart className="h-4 w-4 text-green-500" />,
  };

  return (
    <Collapsible asChild open={isOpen} onOpenChange={setIsOpen}>
      <tbody className="border-0">
        <TableRow className="cursor-pointer">
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
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="icon">
                <ChevronRight className={cn('h-4 w-4 transition-transform', isOpen && 'rotate-90')} />
                <span className="sr-only">View Details</span>
              </Button>
            </CollapsibleTrigger>
          </TableCell>
        </TableRow>
        <CollapsibleContent asChild>
          <tr className="bg-muted/50">
            <TableCell colSpan={5} className="p-0">
                <div className="p-6">
                    <h4 className="font-semibold text-lg mb-4">Extracurricular Skills</h4>
                    {categorizedSkills && Object.keys(categorizedSkills).length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {Object.entries(categorizedSkills).map(([category, skills]) => (
                                <div key={category}>
                                    <div className="flex items-center gap-2 mb-2">
                                        {categoryIcons[category]}
                                        <h5 className="font-semibold">{category}</h5>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {skills.map(skill => (
                                            <Badge key={skill} variant="secondary">{skill}</Badge>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-muted-foreground text-sm">No specific skills listed for approved activities.</p>
                    )}
                </div>
            </TableCell>
          </tr>
        </CollapsibleContent>
      </tbody>
    </Collapsible>
  );
}

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
              <StudentRow key={student.studentId} student={student} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
