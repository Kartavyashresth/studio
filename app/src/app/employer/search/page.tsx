'use client';

import { useState } from 'react';
import { AppLayout } from '@/components/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { StudentList } from '@/components/student-list';
import { students } from '@/lib/data';
import { Search as SearchIcon, SlidersHorizontal } from 'lucide-react';

const allSkills = [...new Set(students.flatMap(s => s.skills || []))];

export default function CandidateSearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const handleSkillChange = (skill: string) => {
    setSelectedSkills(prev =>
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  const filteredStudents = students.filter(student => {
    const nameMatch = student.name.toLowerCase().includes(searchTerm.toLowerCase());
    const skillMatch = selectedSkills.length === 0 || selectedSkills.every(skill => student.skills?.includes(skill));
    return nameMatch && skillMatch;
  });

  return (
    <AppLayout>
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-headline tracking-tight">Candidate Search</h1>
          <p className="text-muted-foreground mt-1">Find the perfect student candidates for your roles.</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-4">
            <div className="lg:col-span-1">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><SlidersHorizontal/> Filters</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label>Skills</Label>
                            <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                                {allSkills.map(skill => (
                                    <div key={skill} className="flex items-center space-x-2">
                                        <Checkbox 
                                            id={skill} 
                                            onCheckedChange={() => handleSkillChange(skill)}
                                            checked={selectedSkills.includes(skill)}
                                        />
                                        <Label htmlFor={skill} className="font-normal">{skill}</Label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div className="lg:col-span-3">
                <div className="relative mb-6">
                    <Input 
                        placeholder="Search by student name..."
                        className="pl-10 text-base"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                </div>
                
                <StudentList students={filteredStudents} />
            </div>
        </div>
      </div>
    </AppLayout>
  );
}
