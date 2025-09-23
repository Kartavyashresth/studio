'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { allUsers, addUser } from '@/lib/users';

export default function RegisterPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [role, setRole] = useState('student');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const selectedRole = formData.get('role') as 'student' | 'faculty' | 'employer' | 'institute_admin';

    const existingUser = allUsers.find(u => u.email === email);
    if (existingUser) {
        toast({
            variant: 'destructive',
            title: 'Registration Failed',
            description: 'An account with this email already exists.',
        });
        return;
    }
    
    // In a real app, you would hash the password here.
    // For this demo, we store it as is.
    addUser({
        name: `${firstName} ${lastName}`,
        email,
        password,
        role: selectedRole,
    });

    toast({
        title: 'Registration Successful!',
        description: 'You can now sign in with your new account.',
    });

    router.push('/login', { scroll: false });
  };

  return (
    <>
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-headline">Create an Account</CardTitle>
        <CardDescription>Enter your details to get started</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" name="firstName" placeholder="John" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" name="lastName" placeholder="Doe" required />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" placeholder="name@example.com" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" required />
          </div>
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
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="w-full">
            Sign Up
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center text-sm">
        <p className="text-muted-foreground">
          Already have an account?{' '}
          <Link href="/login" className="font-medium text-primary hover:underline" scroll={false}>
            Sign In
          </Link>
        </p>
      </CardFooter>
    </>
  );
}
