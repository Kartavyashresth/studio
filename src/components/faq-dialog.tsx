
'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { HelpCircle } from 'lucide-react';

const faqData = [
  {
    question: 'How do I add a new activity?',
    answer:
      "You can add a new activity by navigating to the 'Activities' page from the sidebar and clicking the 'Add Activity' button. Fill in the required details and upload a supporting document for verification.",
  },
  {
    question: 'Where can I see the status of my activity submissions?',
    answer:
      "On the 'Activities' page, you can see a list of all your submitted activities and their current status (Pending, Approved, or Rejected). Click on any activity to view more details and see the verification timeline.",
  },
  {
    question: 'How do I customize and share my portfolio?',
    answer:
      "Go to the 'Portfolio' page. On the right, you can use the toggles to show or hide different sections. To share, click the 'Share Link' button to copy a unique URL to your clipboard. You can also download a PDF version using the 'Download PDF' button.",
  },
  {
    question: 'How are credits calculated?',
    answer:
      'Credits are awarded for each activity once it is approved by a faculty member. The number of credits varies depending on the type, duration, and significance of the activity. Academic credits are awarded based on course completion and grades.',
  },
  {
    question: 'Who approves my activity submissions?',
    answer:
      'Submissions are typically reviewed and approved by faculty members from your department or a designated authority for the specific activity type (e.g., a club advisor or event coordinator).',
  },
];

export function FaqDialog() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full justify-start">
          <HelpCircle className="mr-2" />
          FAQ
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Frequently Asked Questions</DialogTitle>
          <DialogDescription>
            Find answers to common questions about the Nexus platform.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 max-h-[60vh] overflow-y-auto pr-4">
          <Accordion type="single" collapsible className="w-full">
            {faqData.map((item, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </DialogContent>
    </Dialog>
  );
}
