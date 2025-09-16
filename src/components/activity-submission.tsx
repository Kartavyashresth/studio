'use client';

import { useState, useRef, type FormEvent } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { generateVerificationRequest } from '@/app/actions';
import { Loader2, Sparkles, UploadCloud, PlusCircle, ThumbsUp } from 'lucide-react';
import type { AutoVerificationRequestOutput } from '@/ai/flows/auto-verification-request';

type SubmissionState = 
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: AutoVerificationRequestOutput }
  | { status: 'error'; message: string };

export function ActivitySubmission() {
  const [isOpen, setIsOpen] = useState(false);
  const [state, setState] = useState<SubmissionState>({ status: 'idle' });
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
    setState({ status: 'idle' });
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

  const readFileAsDataURI = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setState({ status: 'loading' });

    const formData = new FormData(event.currentTarget);
    const activityDescription = formData.get('description') as string;
    const file = fileInputRef.current?.files?.[0];

    if (!file) {
      setState({ status: 'error', message: 'Please upload a supporting document.' });
      return;
    }

    try {
      const supportingDocumentDataUri = await readFileAsDataURI(file);
      const result = await generateVerificationRequest({ activityDescription, supportingDocumentDataUri });

      if (result.success && result.data) {
        setState({ status: 'success', data: result.data });
      } else {
        setState({ status: 'error', message: result.error || 'An unknown error occurred.' });
      }
    } catch (error) {
      setState({ status: 'error', message: 'Failed to process the document.' });
    }
  };
  
  const handleFinalSubmit = () => {
     toast({
        title: "Activity Submitted!",
        description: "Your activity has been sent for verification.",
     });
     setIsOpen(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Activity
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px]">
        {state.status === 'idle' && (
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              
              <DialogDescription>
                Upload a document to get an AI-powered suggestion for the verifier.
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
                    <SelectItem value="mooc">MOOC</SelectItem>
                    <SelectItem value="internship">Internship</SelectItem>
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
                <Sparkles className="mr-2 h-4 w-4" />
                Get Suggestion
              </Button>
            </DialogFooter>
          </form>
        )}
        
        {state.status === 'loading' && (
            <div className="flex flex-col items-center justify-center gap-4 py-10">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <p className="text-muted-foreground">Analyzing your document...</p>
            </div>
        )}

        {state.status === 'success' && (
           <>
            <DialogHeader>
              
              <DialogDescription>
                Our AI has suggested an approver based on your submission.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                <div className="rounded-lg border bg-muted/50 p-4">
                    <p className="font-semibold text-sm">Suggested Approver</p>
                    <p className="text-lg text-primary">{state.data.suggestedApprover}</p>
                </div>
                 <div className="rounded-lg border bg-muted/50 p-4">
                    <p className="font-semibold text-sm">Justification</p>
                    <p className="text-muted-foreground">{state.data.justification}</p>
                </div>
            </div>
            <DialogFooter className="sm:justify-between">
              <Button variant="outline" onClick={resetForm}>Back</Button>
              <Button onClick={handleFinalSubmit} className="bg-green-600 hover:bg-green-700">
                <ThumbsUp className="mr-2 h-4 w-4" />
                Confirm & Submit
              </Button>
            </DialogFooter>
           </>
        )}

        {state.status === 'error' && (
            <>
              <DialogHeader>
                
                <DialogDescription>
                  {state.message}
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" onClick={resetForm}>Try Again</Button>
              </DialogFooter>
            </>
        )}
      </DialogContent>
    </Dialog>
  );
}
