'use client';

import { useState, useRef, type FormEvent } from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Sparkles, UploadCloud, PlusCircle, ThumbsUp } from 'lucide-react';
import type { AutoVerificationRequestOutput } from '@/ai/flows/auto-verification-request';


export function ActivitySubmission() {
  const [isOpen, setIsOpen] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
    } else {
      setFileName(null);
    }
  };
  
  const resetForm = () => {
    setFileName(null);
    if(fileInputRef.current) {
        fileInputRef.current.value = "";
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      resetForm();
    }
    setIsOpen(open);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    toast({
        title: "Activity Submitted!",
        description: "Your activity has been sent for verification.",
     });
     setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Activity
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px]">
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>Add New Activity</DialogTitle>
              <DialogDescription>
                Fill in the details and upload a supporting document for verification.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="type">Activity Type</Label>
                <Select name="type" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="seminar">Seminar</SelectItem>
                    <SelectItem value="conference">Conference</SelectItem>
                    <SelectItem value="workshop">Workshop</SelectItem>
                    <SelectItem value="mooc">MOOC</SelectItem>
                    <SelectItem value="internship">Internship</SelectItem>
                    <SelectItem value="competition">Competition</SelectItem>
                    <SelectItem value="leadership-role">Leadership Role</SelectItem>
                    <SelectItem value="volunteering">Volunteering</SelectItem>
                    <SelectItem value="community-service">Community Service</SelectItem>
                    <SelectItem value="extra-curricular">Extra-curricular</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" placeholder="e.g., Attended the 'Future of AI' conference..." required />
              </div>
              <div className="grid gap-2">
                 <Label htmlFor="document">Supporting Document</Label>
                 <Input id="document" type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" required accept="image/*,application/pdf" />
                 <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()}>
                    <UploadCloud className="mr-2 h-4 w-4" />
                    {fileName || 'Upload a file'}
                 </Button>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">
                <ThumbsUp className="mr-2 h-4 w-4" />
                Confirm & Submit
              </Button>
            </DialogFooter>
          </form>
      </DialogContent>
    </Dialog>
  );
}
