'use client';

import Image from 'next/image';
import { user as staticUser, activities } from '@/lib/data';
import { Card, CardContent } from '@/components/ui/card';
import { Briefcase, Calendar, Presentation, Trophy, Camera } from 'lucide-react';
import { useState, useRef, type ChangeEvent } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';


// Custom Certificate icon as it is not in lucide-react
const CustomCertificateIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M12 15l-3.5-3.5a2.5 2.5 0 1 1 3.5 3.5z" />
        <path d="M14 10.5L8.5 5" />
        <path d="M14.5 4.5c.9-.9 2.1-.9 3 0s.9 2.1 0 3L13 12" />
        <path d="M2 20l4-4" />
        <path d="M14 10.5L8.5 5" />
        <path d="M14.5 4.5c.9-.9 2.1-.9 3 0s.9 2.1 0 3L13 12" />
        <path d="M2 20l4-4" />
        <path d="M18 10V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11" />
    </svg>
)

const activityIcons = {
    'Internship': <Briefcase className="h-5 w-5 text-primary" />,
    'MOOC': <CustomCertificateIcon className="h-5 w-5 text-primary" />,
    'Conference': <Presentation className="h-5 w-5 text-primary" />,
    'Seminar': <Presentation className="h-5 w-5 text-primary" />,
    'Extra-curricular': <Trophy className="h-5 w-5 text-primary" />,
};

const approvedActivities = activities.filter(a => a.status === 'Approved');

export function PortfolioPreview() {
  const [user, setUser] = useState(staticUser);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const groupActivities = (
    activities: typeof approvedActivities, 
    key: 'type' | 'status'
    ) => {
    return activities.reduce((acc, activity) => {
      const group = activity[key];
      if (!acc[group]) {
        acc[group] = [];
      }
      acc[group].push(activity);
      return acc;
    }, {} as Record<string, typeof approvedActivities>);
  };
  
  const activitiesByType = groupActivities(approvedActivities, 'type');

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setUser({ ...user, avatarUrl: e.target.result as string });
        }
      };
      reader.readAsDataURL(file);
    }
  };


  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="bg-muted/40 p-8">
            <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="relative group">
                    <Image 
                        src={user.avatarUrl}
                        width={100}
                        height={100}
                        alt={user.name}
                        data-ai-hint="profile picture"
                        className="rounded-full border-4 border-background shadow-md"
                    />
                     <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={handleAvatarClick}
                        className="absolute inset-0 h-full w-full bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        aria-label="Change profile picture"
                     >
                        <Camera className="h-6 w-6" />
                     </Button>
                     <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={handleFileChange}
                        className="hidden" 
                        accept="image/*"
                     />
                </div>
                <div>
                    <h1 className="text-3xl font-headline">{user.name}</h1>
                    <p className="text-muted-foreground">{user.program}</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
            </div>
        </div>
        
        <div className="p-8 space-y-8">
            {Object.entries(activitiesByType).map(([type, activities]) => (
                <section key={type}>
                    <h2 className="text-2xl font-headline flex items-center gap-3 mb-4">
                        {activityIcons[type as keyof typeof activityIcons]}
                        {type}s
                    </h2>
                    <div className="space-y-4 border-l-2 border-primary/20 pl-6 relative">
                        {activities.map((activity, index) => (
                             <div key={activity.id} className="relative">
                                <div className="absolute -left-[35px] top-1 h-4 w-4 rounded-full bg-primary border-2 border-background"></div>
                                <h3 className="font-semibold">{activity.name}</h3>
                                <p className="text-sm text-muted-foreground flex items-center gap-2">
                                    <Calendar className="h-3 w-3" />
                                    {new Date(activity.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
                                </p>
                                <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                                    Verified by: {activity.approver}
                                </p>
                             </div>
                        ))}
                    </div>
                </section>
            ))}
        </div>
      </CardContent>
    </Card>
  );
}
