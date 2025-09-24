
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { allUsers, addUser } from '@/lib/users';

interface RegisterFormProps {
    onSuccess: () => void;
}

export function RegisterForm({ onSuccess }: RegisterFormProps) {
  const { toast } = useToast();
  const [role, setRole] = useState('student');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const email = formData.get('email') as string;
    const selectedRole = formData.get('role') as 'student' | 'faculty' | 'employer' | 'institute_admin';
    const branch = formData.get('branch') as string;

    const existingUser = allUsers.find(u => u.email === email);
    if (existingUser) {
        toast({
            variant: 'destructive',
            title: 'Registration Failed',
            description: 'An account with this email already exists.',
        });
        return;
    }
    
    addUser({
        name: `${firstName} ${lastName}`,
        email,
        role: selectedRole,
        branch: selectedRole === 'student' ? branch : undefined,
    });

    toast({
        title: 'Registration Successful!',
        description: 'You can now sign in with your new account.',
    });

    onSuccess();
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-center px-8">
        <h1 className="text-3xl font-headline mb-4">Create Account</h1>
        <form className="space-y-4 w-full" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2 text-left">
              <Label htmlFor="register-firstName">First Name</Label>
              <Input id="register-firstName" name="firstName" placeholder="John" required />
            </div>
            <div className="space-y-2 text-left">
              <Label htmlFor="register-lastName">Last Name</Label>
              <Input id="register-lastName" name="lastName" placeholder="Doe" required />
            </div>
          </div>
          <div className="space-y-2 text-left">
            <Label htmlFor="register-email">Email</Label>
            <Input id="register-email" name="email" type="email" placeholder="name@example.com" required />
          </div>
          <div className="space-y-2 text-left">
            <Label htmlFor="register-password">Password</Label>
            <Input id="register-password" name="password" type="password" required />
          </div>
          <div className="space-y-2 text-left">
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
           {role === 'student' && (
            <div className="space-y-2 text-left">
              <Label htmlFor="branch">Branch</Label>
              <Select name="branch" required>
                <SelectTrigger id="branch">
                  <SelectValue placeholder="Select your branch" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Computer Science">Computer Science</SelectItem>
                  <SelectItem value="Mechanical Engineering">Mechanical Engineering</SelectItem>
                  <SelectItem value="Digital Media">Digital Media</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
          <Button type="submit" className="w-full">
            Sign Up
          </Button>
        </form>
    </div>
  );
}
