
'use client';

import type { Notice } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Megaphone } from 'lucide-react';

export function NoticeBoard({ notices }: { notices: Notice[] }) {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Megaphone />
          Notice Board
        </CardTitle>
        <CardDescription>Latest announcements and updates.</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden p-0">
        <ScrollArea className="h-full p-6 pt-0">
          <div className="space-y-6">
            {notices.map((notice, index) => (
              <div key={notice.id}>
                <div className="space-y-2">
                    <h3 className="font-semibold text-base">{notice.title}</h3>
                    <p className="text-sm text-muted-foreground">{notice.content}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>- {notice.author}</span>
                        <span>{new Date(notice.date).toLocaleDateString()}</span>
                    </div>
                </div>
                {index < notices.length - 1 && <Separator className="mt-6" />}
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
