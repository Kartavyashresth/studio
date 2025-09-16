'use client';

import type { Activity } from '@/lib/types';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Check, X, FileText, ShieldCheck, ShieldAlert, Sparkles, Loader2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { checkCertificateAuthenticity } from '@/app/actions';
import type { VerifyCertificateOutput } from '@/ai/flows/verify-certificate';

type VerificationRequest = Activity & {
  studentName: string;
  studentId: string;
  documentUrl: string; // Ensure documentUrl is always present
};

type VerificationState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: VerifyCertificateOutput }
  | { status: 'error'; message: string };

function VerificationDialog({ request }: { request: VerificationRequest }) {
    const [state, setState] = useState<VerificationState>({ status: 'idle' });

    const handleVerify = async () => {
        setState({ status: 'loading' });
        const result = await checkCertificateAuthenticity({ documentDataUri: request.documentUrl });
        if (result.success && result.data) {
            setState({ status: 'success', data: result.data });
        } else {
            setState({ status: 'error', message: result.error || 'Verification failed.' });
        }
    };

    return (
        <Dialog onOpenChange={(open) => !open && setState({ status: 'idle' })}>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <ShieldCheck className="mr-2" />
                    Verify Document
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
                <DialogHeader>
                    <DialogTitle className="font-headline">Document Verification</DialogTitle>
                    <DialogDescription>
                       AI-powered authenticity check for {request.name} by {request.studentName}.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
                    <div className="rounded-lg overflow-hidden border">
                        <Image
                            src={request.documentUrl}
                            alt={`Document for ${request.name}`}
                            width={800}
                            height={1100}
                            data-ai-hint="certificate document"
                            className="w-full h-auto object-contain"
                        />
                    </div>
                    <div className="flex flex-col gap-4">
                        {state.status === 'idle' && (
                            <div className="flex flex-col items-center justify-center h-full rounded-lg border border-dashed p-8 text-center">
                                <ShieldAlert className="h-12 w-12 text-muted-foreground" />
                                <h3 className="mt-4 text-lg font-semibold">Ready to Verify</h3>
                                <p className="mt-2 text-sm text-muted-foreground">
                                    Click the button below to start the AI analysis of this document.
                                </p>
                                <Button onClick={handleVerify} className="mt-4">
                                    <Sparkles className="mr-2" />
                                    Analyze with AI
                                </Button>
                            </div>
                        )}
                         {state.status === 'loading' && (
                            <div className="flex flex-col items-center justify-center h-full gap-4 py-10">
                                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                                <p className="text-muted-foreground">Checking document authenticity...</p>
                            </div>
                        )}
                        {state.status === 'error' && (
                            <div className="flex flex-col items-center justify-center h-full rounded-lg border border-destructive/50 bg-destructive/10 p-8 text-center">
                                <p className="text-destructive">{state.message}</p>
                                <Button onClick={handleVerify} variant="outline" className="mt-4">Try Again</Button>
                            </div>
                        )}
                        {state.status === 'success' && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        {state.data.isAuthentic ? (
                                            <ShieldCheck className="h-6 w-6 text-green-600" />
                                        ) : (
                                            <ShieldAlert className="h-6 w-6 text-amber-600" />
                                        )}
                                        Verification Result
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <p className="font-semibold text-sm">Conclusion</p>
                                        <p className={state.data.isAuthentic ? 'text-green-600' : 'text-amber-600'}>
                                            {state.data.isAuthentic ? 'Appears Authentic' : 'Check Carefully'}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-sm">Justification</p>
                                        <p className="text-muted-foreground text-sm">{state.data.justification}</p>
                                    </div>
                                     <div>
                                        <p className="font-semibold text-sm">Extracted Details</p>
                                        <ul className="text-muted-foreground text-sm list-disc pl-5">
                                            <li><strong>Issuer:</strong> {state.data.details.issuer}</li>
                                            <li><strong>Recipient:</strong> {state.data.details.recipient}</li>
                                            <li><strong>Date:</strong> {state.data.details.date}</li>
                                        </ul>
                                    </div>
                                    <Button onClick={handleVerify} variant="outline" size="sm" className="w-full">
                                        <Sparkles className="mr-2" />
                                        Re-analyze
                                    </Button>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}


export function VerificationRequestList({ requests }: { requests: VerificationRequest[] }) {
  const [pendingRequests, setPendingRequests] = useState(requests);
  const { toast } = useToast();

  const handleDecision = (requestId: string, decision: 'Approved' | 'Rejected') => {
    setPendingRequests(pendingRequests.filter((req) => req.id !== requestId));
    toast({
        title: `Request ${decision}`,
        description: `The activity has been successfully ${decision.toLowerCase()}.`,
    });
  };

  if (pendingRequests.length === 0) {
    return (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
            <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-semibold font-headline">No Pending Requests</h3>
            <p className="mt-2 text-sm text-muted-foreground">
                There are no student submissions awaiting verification.
            </p>
        </div>
    );
  }

  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student</TableHead>
              <TableHead className="hidden md:table-cell">Activity</TableHead>
              <TableHead className="hidden sm:table-cell">Type</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pendingRequests.map((request) => (
              <TableRow key={request.id}>
                <TableCell>
                  <div className="font-medium">{request.studentName}</div>
                  <div className="text-sm text-muted-foreground md:hidden">{request.name}</div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {request.name}
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <Badge variant="outline">{request.type}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex flex-col sm:flex-row items-end justify-end gap-2">
                    <VerificationDialog request={request} />
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon" onClick={() => handleDecision(request.id, 'Rejected')}>
                            <X className="h-4 w-4" />
                            <span className="sr-only">Reject</span>
                        </Button>
                        <Button size="icon" onClick={() => handleDecision(request.id, 'Approved')} className="bg-green-600 hover:bg-green-700">
                            <Check className="h-4 w-4" />
                            <span className="sr-only">Approve</span>
                        </Button>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
