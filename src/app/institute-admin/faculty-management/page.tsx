'use client';

import { useState } from 'react';
import { AppLayout } from '@/components/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { registeredFaculty as initialFaculty } from '@/lib/data';
import type { Faculty } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { PlusCircle, Trash2 } from 'lucide-react';
import Image from 'next/image';

export default function FacultyManagementPage() {
  const [facultyList, setFacultyList] = useState<Faculty[]>(initialFaculty);
  const { toast } = useToast();

  const handleRegisterFaculty = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const department = formData.get('department') as string;
    const branch = formData.get('branch') as string;

    if (!name || !email || !department || !branch) return;

    const newFaculty: Faculty = {
      name,
      email,
      department,
      branch,
      avatarUrl: `https://picsum.photos/seed/${email}/100/100`, // Use email for a unique seed
    };

    setFacultyList(prev => [...prev, newFaculty]);
    
    toast({
        title: 'Faculty Registered',
        description: `${name} has been successfully added.`,
    });

    event.currentTarget.reset();
  };

  const handleRemoveFaculty = (email: string) => {
    setFacultyList(prev => prev.filter(f => f.email !== email));
     toast({
        title: 'Faculty Removed',
        variant: 'destructive',
    });
  }

  return (
    <AppLayout>
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-headline tracking-tight">Faculty Management</h1>
          <p className="text-muted-foreground mt-1">
            Register new faculty members and manage existing accounts.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="font-headline">Register New Faculty</CardTitle>
                <CardDescription>
                  Add a new faculty member to the system. They will be able to log in immediately.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4" onSubmit={handleRegisterFaculty}>
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" name="name" placeholder="Dr. Jane Doe" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" name="email" type="email" placeholder="jane.d@university.edu" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Input id="department" name="department" placeholder="Physics" required />
                  </div>
                   <div className="space-y-2">
                    <Label htmlFor="branch">Branch</Label>
                    <Select name="branch" required>
                        <SelectTrigger id="branch">
                        <SelectValue placeholder="Select a branch" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Computer Science">Computer Science</SelectItem>
                            <SelectItem value="Mechanical Engineering">Mechanical Engineering</SelectItem>
                            <SelectItem value="Digital Media">Digital Media</SelectItem>
                            <SelectItem value="General">General</SelectItem>
                        </SelectContent>
                    </Select>
                  </div>
                  <Button type="submit" className="w-full">
                    <PlusCircle className="mr-2" />
                    Register Faculty
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-2">
             <Card>
                <CardHeader>
                    <CardTitle>Registered Faculty List</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead className="hidden sm:table-cell">Branch</TableHead>
                                <TableHead className="text-right"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {facultyList.map(faculty => (
                                <TableRow key={faculty.email}>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Image src={faculty.avatarUrl} width={40} height={40} alt={faculty.name} data-ai-hint="profile picture" className="rounded-full" />
                                            <div>
                                                <div className="font-medium">{faculty.name}</div>
                                                <div className="text-sm text-muted-foreground">{faculty.email}</div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="hidden sm:table-cell">{faculty.branch}</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleRemoveFaculty(faculty.email)}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
             </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
