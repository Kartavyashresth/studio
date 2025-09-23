'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LogIn } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { allUsers } from '@/lib/users';
import { registeredFaculty } from '@/lib/data';
import { useEffect, useState } from 'react';


export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const email = formData.get('email') as string;

    const user = allUsers.find(u => u.email === email);

    if (!user) {
      toast({
        variant: 'destructive',
        title: 'Login Failed',
        description: 'Invalid email. Please try again.',
      });
      return;
    }
    
    const urlName = encodeURIComponent(`${firstName} ${lastName}`);

    switch (user.role) {
      case 'employer':
        router.push(`/employer/dashboard?name=${urlName}`);
        break;
      case 'faculty':
        const facultyExists = registeredFaculty.some(f => f.name.toLowerCase() === `${firstName} ${lastName}`.toLowerCase());
        if (!facultyExists) {
            toast({
                variant: 'destructive',
                title: 'Login Failed',
                description: 'You are not a registered faculty member.',
            });
            return;
        }
        router.push(`/faculty/dashboard?name=${urlName}`);
        break;
      case 'institute_admin':
        router.push(`/institute-admin/dashboard?name=${urlName}`);
        break;
      default:
        router.push(`/dashboard?name=${urlName}`);
        break;
    }
  };

  return (
    <>
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-headline">Welcome Back</CardTitle>
        <CardDescription>Sign in to your account to continue</CardDescription>
      </CardHeader>
      <CardContent>
        {isClient && (
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
            <Button type="submit" className="w-full">
                <LogIn className="mr-2 h-4 w-4" />
                Sign In
            </Button>
            </form>
        )}
      </CardContent>
      <CardFooter className="flex justify-center text-sm">
        <p className="text-muted-foreground">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="font-medium text-primary hover:underline">
            Sign Up
          </Link>
        </p>
      </CardFooter>
    </>
  );
}
