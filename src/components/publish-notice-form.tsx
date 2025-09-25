
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Megaphone, Send } from 'lucide-react';

export function PublishNoticeForm() {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const title = formData.get('title') as string;
    
    toast({
      title: 'Notice Published!',
      description: `The notice "${title}" is now live for all students.`,
    });
    
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full justify-start">
            <Megaphone className="mr-2" />
            Publish a Notice
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>Publish New Notice</DialogTitle>
          <DialogDescription>
            This notice will be visible to all students on their dashboard.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                    <Label htmlFor="title">Title</Label>
                    <Input id="title" name="title" placeholder="e.g., Holiday Announcement" required />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="content">Content</Label>
                    <Textarea id="content" name="content" placeholder="Write the notice content here..." required rows={5} />
                </div>
                 <div className="grid gap-2">
                    <Label htmlFor="author">Author / Department</Label>
                    <Input id="author" name="author" placeholder="e.g., Office of the Dean" required />
                </div>
            </div>
            <DialogFooter>
                <Button type="submit">
                    <Send className="mr-2" />
                    Publish Now
                </Button>
            </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
