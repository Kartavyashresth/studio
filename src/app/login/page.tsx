'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { NexusLogo } from '@/components/nexus-logo';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LogIn } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState('student');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (role === 'faculty') {
      router.push('/faculty/dashboard');
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-muted/40 p-4">
        <div className="w-full max-w-md">
            <Card>
                <CardHeader className="text-center">
                    <div className="mb-4 flex justify-center">
                        <NexusLogo className="h-12 w-12" />
                    </div>
                    <CardTitle className="text-3xl font-headline">Welcome to Nexus</CardTitle>
                    <CardDescription>Select your role to sign in to your account</CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                         <div className="space-y-2">
                            <Label htmlFor="role">Role</Label>
                            <Select name="role" required value={role} onValueChange={setRole}>
                                <SelectTrigger id="role">
                                    <SelectValue placeholder="Select your role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="student">Student</SelectItem>
                                    <SelectItem value="faculty">Faculty</SelectItem>
                                    <SelectItem value="employer">Employer</SelectItem>
                                    <SelectItem value="institute_admin">Institute Admin</SelectItem>
                                    <SelectItem value="admin">Admin</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="name@example.com" required />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" required />
                        </div>
                        <Button type="submit" className="w-full">
                            <LogIn className="mr-2 h-4 w-4" />
                            Sign In
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    </main>
  );
}
