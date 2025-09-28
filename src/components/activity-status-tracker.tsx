'use client';

import { CheckCircle, Clock, Send, ShieldCheck, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Activity } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

type StatusStep = {
  name: 'Submitted' | 'Pending Review' | 'Approved' | 'Rejected';
  icon: React.ElementType;
  date: Date | null;
};

const getStatusTimeline = (activity: Activity): StatusStep[] => {
  const baseDate = new Date(activity.date);
  
  const timeline: StatusStep[] = [
    { name: 'Submitted', icon: Send, date: baseDate },
    { name: 'Pending Review', icon: Clock, date: null },
    { name: 'Approved', icon: CheckCircle, date: null },
  ];
  
  const pendingStep = timeline.find(s => s.name === 'Pending Review');
  const approvedStep = timeline.find(s => s.name === 'Approved');

  switch (activity.status) {
    case 'Pending':
      if (pendingStep) pendingStep.date = baseDate;
      break;
    case 'Approved':
       if (pendingStep) pendingStep.date = baseDate;
       if (approvedStep) approvedStep.date = new Date(baseDate.getTime() + 86400000); // 1 day later for demo
      break;
    case 'Rejected':
       if (pendingStep) pendingStep.date = baseDate;
       // Replace 'Approved' with 'Rejected'
       timeline[2] = { name: 'Rejected', icon: XCircle, date: new Date(baseDate.getTime() + 86400000) };
      break;
  }
  
  return timeline;
};


export function ActivityStatusTracker({ activity }: { activity: Activity }) {
  const timeline = getStatusTimeline(activity);

  return (
    <Card>
        <CardHeader>
            <CardTitle>Approval Status</CardTitle>
            <CardDescription>Follow the progress of your verification request.</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="relative pl-8">
                {/* Vertical line */}
                <div className="absolute left-12 top-0 bottom-0 w-0.5 bg-border" />
                
                <div className="space-y-12">
                    {timeline.map((step, index) => (
                        <div key={step.name} className="relative flex items-center gap-6">
                            <div className={cn(
                                "z-10 flex h-10 w-10 items-center justify-center rounded-full",
                                step.date ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                            )}>
                                <step.icon className="h-5 w-5" />
                            </div>
                            <div>
                                <h4 className={cn(
                                    "font-semibold",
                                    !step.date && "text-muted-foreground"
                                )}>
                                    {step.name}
                                </h4>
                                <p className="text-sm text-muted-foreground">
                                    {step.date 
                                        ? `Completed on ${step.date.toLocaleDateString()}` 
                                        : 'Waiting...'}
                                </p>
                            </div>
                            {step.name === 'Approved' && step.date && (
                                <div className="absolute top-full left-10 mt-4 text-sm text-green-600 flex items-center gap-2">
                                    <ShieldCheck className="h-4 w-4" />
                                    <span>Verified by {activity.approver}</span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </CardContent>
    </Card>
  );
}
