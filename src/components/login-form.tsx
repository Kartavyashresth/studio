
'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LogIn } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { allUsers } from '@/lib/users';
import { registeredFaculty } from '@/lib/data';

interface LoginFormProps {
  onSuccess: (name: string) => void;
}

export function LoginForm({ onSuccess }: LoginFormProps) {
  const { toast } = useToast();
  const router = useRouter();

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
    
    const fullName = `${firstName} ${lastName}`;
    
    switch (user.role) {
      case 'employer':
        router.push(`/employer/dashboard?name=${encodeURIComponent(fullName)}`);
        break;
      case 'faculty':
        const facultyExists = registeredFaculty.some(f => f.email.toLowerCase() === email.toLowerCase());
        if (!facultyExists) {
            toast({
                variant: 'destructive',
                title: 'Login Failed',
                description: 'You are not a registered faculty member.',
            });
            return;
        }
        router.push(`/faculty/dashboard?name=${encodeURIComponent(fullName)}`);
        break;
      case 'institute_admin':
        router.push(`/institute-admin/dashboard?name=${encodeURIComponent(fullName)}`);
        break;
      default:
        router.push(`/dashboard?name=${encodeURIComponent(fullName)}`);
        break;
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-center px-8">
      <h1 className="text-3xl font-headline mb-4">Sign In</h1>
      <form className="space-y-4 w-full" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2 text-left">
            <Label htmlFor="firstName">First Name</Label>
            <Input id="firstName" name="firstName" placeholder="John" required />
            </div>
            <div className="space-y-2 text-left">
            <Label htmlFor="lastName">Last Name</Label>
            <Input id="lastName" name="lastName" placeholder="Doe" required />
            </div>
        </div>
        <div className="space-y-2 text-left">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" placeholder="name@example.com" required />
        </div>
        <div className="space-y-2 text-left">
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" required />
        </div>
        <Button type="submit" className="w-full">
            <LogIn className="mr-2 h-4 w-4" />
            Sign In
        </Button>
      </form>
    </div>
  );
}
