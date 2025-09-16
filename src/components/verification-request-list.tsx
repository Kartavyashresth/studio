'use client';

import type { Activity } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Check, X, FileText } from 'lucide-react';

type VerificationRequest = Activity & {
  studentName: string;
  studentId: string;
};

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
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="outline" size="icon" onClick={() => handleDecision(request.id, 'Rejected')}>
                        <X className="h-4 w-4" />
                        <span className="sr-only">Reject</span>
                    </Button>
                    <Button size="icon" onClick={() => handleDecision(request.id, 'Approved')} className="bg-green-600 hover:bg-green-700">
                        <Check className="h-4 w-4" />
                        <span className="sr-only">Approve</span>
                    </Button>
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
