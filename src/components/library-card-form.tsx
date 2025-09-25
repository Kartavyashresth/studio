'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Library } from 'lucide-react';
import { user } from '@/lib/data';

export function LibraryCardForm() {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    toast({
      title: 'Application Submitted',
      description: 'Your library card application is being processed.',
    });
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full justify-start">
          <Library className="mr-2" />
          Apply for Library Card
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Library Card Application</DialogTitle>
          <DialogDescription>
            Confirm your details to apply for a new library card.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 py-4">
             <div className="space-y-2 rounded-lg border bg-muted/50 p-4">
                <p className="font-semibold text-sm">Name</p>
                <p className="text-muted-foreground">{user.name}</p>
            </div>
             <div className="space-y-2 rounded-lg border bg-muted/50 p-4">
                <p className="font-semibold text-sm">Student ID</p>
                <p className="text-muted-foreground">{user.studentId}</p>
            </div>
             <div className="space-y-2 rounded-lg border bg-muted/50 p-4">
                <p className="font-semibold text-sm">Program</p>
                <p className="text-muted-foreground">{user.program}</p>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Confirm and Apply</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
