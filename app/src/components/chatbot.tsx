'use client';

import { useState, useRef, useEffect, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageSquare, Send, X, Loader2, Bot, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getChatbotResponse } from '@/app/actions';

type Message = {
    role: 'user' | 'model';
    content: string;
};

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setIsOpen(prev => {
        if (!prev && messages.length === 0) {
            // Add initial greeting when opening for the first time
            setMessages([{ role: 'model', content: "Hi there! I'm NexusBot. How can I help you today?" }]);
        }
        return !prev;
    });
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
        scrollAreaRef.current.scrollTo({
            top: scrollAreaRef.current.scrollHeight,
            behavior: 'smooth'
        });
    }
  }, [messages]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const messageContent = formData.get('message') as string;

    if (!messageContent.trim()) return;
    
    event.currentTarget.reset();

    const newUserMessage: Message = { role: 'user', content: messageContent };
    const currentMessages = [...messages, newUserMessage];
    setMessages(currentMessages);
    setIsLoading(true);

    const result = await getChatbotResponse({
        message: messageContent,
        history: messages.map(msg => ({ role: msg.role, content: msg.content })),
    });

    if (result.success && result.data) {
        setMessages([...currentMessages, { role: 'model', content: result.data }]);
    } else {
        setMessages([...currentMessages, { role: 'model', content: result.error || "Something went wrong." }]);
    }
    setIsLoading(false);
  };

  return (
    <>
      <div className={cn("fixed bottom-4 right-4 z-50 transition-transform duration-300", isOpen ? "translate-x-[500px]" : "translate-x-0")}>
        <Button size="icon" className="rounded-full w-14 h-14 shadow-lg" onClick={handleToggle}>
          <MessageSquare className="h-6 w-6" />
          <span className="sr-only">Toggle Chatbot</span>
        </Button>
      </div>
      <div className={cn("fixed bottom-4 right-4 z-40 w-full max-w-sm transition-transform duration-300", !isOpen ? "translate-x-[500px]" : "translate-x-0")}>
        <Card className="flex flex-col h-[60vh] shadow-2xl">
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle className="font-headline">NexusBot</CardTitle>
                    <CardDescription>Your AI Assistant</CardDescription>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                    <X className="h-4 w-4"/>
                    <span className="sr-only">Close chat</span>
                </Button>
            </CardHeader>
            <CardContent className="flex-1 overflow-hidden p-0">
                <ScrollArea className="h-full p-4" ref={scrollAreaRef}>
                    <div className="space-y-4">
                        {messages.map((message, index) => (
                            <div key={index} className={cn('flex items-start gap-3', message.role === 'user' ? 'justify-end' : '')}>
                                {message.role === 'model' && (
                                    <div className="bg-primary text-primary-foreground p-2 rounded-full">
                                        <Bot className="h-5 w-5" />
                                    </div>
                                )}
                                <div className={cn('max-w-[75%] rounded-lg px-4 py-2 text-sm', message.role === 'user' ? 'bg-muted' : 'bg-muted/50')}>
                                    {message.content}
                                </div>
                                 {message.role === 'user' && (
                                    <div className="bg-secondary text-secondary-foreground p-2 rounded-full">
                                        <User className="h-5 w-5" />
                                    </div>
                                )}
                            </div>
                        ))}
                         {isLoading && (
                            <div className="flex items-start gap-3">
                                <div className="bg-primary text-primary-foreground p-2 rounded-full">
                                    <Bot className="h-5 w-5" />
                                </div>
                                <div className="bg-muted/50 rounded-lg px-4 py-2 text-sm">
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                </div>
                            </div>
                        )}
                    </div>
                </ScrollArea>
            </CardContent>
            <CardFooter className="p-4 border-t">
                <form onSubmit={handleSubmit} className="flex w-full items-center gap-2">
                    <Input name="message" placeholder="Ask a question..." autoComplete="off" disabled={isLoading} />
                    <Button type="submit" size="icon" disabled={isLoading}>
                        <Send className="h-4 w-4" />
                        <span className="sr-only">Send</span>
                    </Button>
                </form>
            </CardFooter>
        </Card>
      </div>
    </>
  );
}
