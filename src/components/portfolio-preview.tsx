'use client';

import Image from 'next/image';
import React, { useState, useRef, type ChangeEvent } from 'react';
import { user as staticUser, activities } from '@/lib/data';
import { Card, CardContent } from '@/components/ui/card';
import { Briefcase, Calendar, Presentation, Trophy, Camera, Pencil, Save, BookOpen, Heart, Award, UserCheck, Handshake, User as UserIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type { SectionVisibility } from '@/app/portfolio/page';
import type { Activity } from '@/lib/types';
import { cn } from '@/lib/utils';


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

const activityIcons: Record<Activity['type'], React.ReactElement> = {
    'Internship': <Briefcase className="h-5 w-5 text-primary" />,
    'MOOC': <CustomCertificateIcon className="h-5 w-5 text-primary" />,
    'Conference': <Presentation className="h-5 w-5 text-primary" />,
    'Seminar': <Presentation className="h-5 w-5 text-primary" />,
    'Extra-curricular': <Trophy className="h-5 w-5 text-primary" />,
    'Workshop': <BookOpen className="h-5 w-5 text-primary" />,
    'Volunteering': <Heart className="h-5 w-5 text-primary" />,
    'Competition': <Award className="h-5 w-5 text-primary" />,
    'Leadership Role': <UserCheck className="h-5 w-5 text-primary" />,
    'Community Service': <Handshake className="h-5 w-5 text-primary" />,
};

const approvedActivities = activities.filter(a => a.status === 'Approved');

interface PortfolioPreviewProps {
  sectionVisibility: SectionVisibility;
}

export function PortfolioPreview({ sectionVisibility }: PortfolioPreviewProps) {
  const [user, setUser] = useState(staticUser);
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const groupActivities = (
    activities: typeof approvedActivities, 
    key: 'type'
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

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUser(prev => ({...prev, [name]: value}));
  };

  const getSectionTitle = (type: Activity['type']) => {
    if (type === 'Conference' || type === 'Seminar') {
        return 'Conferences & Seminars';
    }
     if (type === 'Volunteering' || type === 'Community Service') {
        return 'Volunteering & Community Service';
    }
    if (type === 'MOOC') {
        return 'Online Courses (MOOCs)';
    }
    if (type === 'Leadership Role') {
        return 'Leadership Roles';
    }
    return `${type}s`;
  }
  
  const combinedActivities = Object.entries(activitiesByType).reduce((acc, [type, activities]) => {
    const title = getSectionTitle(type as Activity['type']);
    if (!acc[title]) {
        acc[title] = { icon: activityIcons[type as Activity['type']], activities: [], type: type as Activity['type'] };
    }
    acc[title].activities.push(...activities);
    return acc;
  }, {} as Record<string, { icon: React.ReactElement; activities: Activity[], type: Activity['type'] }>);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10,
      },
    },
  };
  
  const cardHoverVariants = {
    hover: {
      y: -5,
      boxShadow: "0px 10px 20px rgba(0,0,0,0.1)",
      transition: {
        type: "spring",
        stiffness: 300,
      },
    },
  };


  return (
    <Card className="overflow-hidden bg-transparent border-0 shadow-none">
      <CardContent className="p-0">
        <motion.div 
            className="bg-card rounded-lg shadow-lg p-8 relative overflow-hidden"
            variants={itemVariants}
        >
            <div className="absolute top-4 right-4 z-10">
                <Button variant="ghost" size="icon" onClick={() => setIsEditing(!isEditing)} className="rounded-full">
                    {isEditing ? <Save className="h-5 w-5" /> : <Pencil className="h-5 w-5" />}
                    <span className="sr-only">{isEditing ? 'Save Changes' : 'Edit Profile'}</span>
                </Button>
            </div>
             <div className="absolute -top-1/4 -left-1/4 w-96 h-96 bg-primary/10 rounded-full filter blur-3xl opacity-50 animate-pulse-slow"></div>
            <div className="absolute -bottom-1/4 -right-1/4 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl opacity-50 animate-pulse-slow-delay"></div>

            <div className="flex flex-col items-center gap-6 relative z-10">
                <div className="relative group">
                    <motion.div whileHover={{ scale: 1.05 }} transition={{ type: 'spring', stiffness: 300 }}>
                        <Image 
                            src={user.avatarUrl}
                            width={150}
                            height={150}
                            alt={user.name}
                            data-ai-hint="profile picture"
                            className="rounded-full border-4 border-background shadow-lg shadow-primary/20"
                        />
                    </motion.div>
                     <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={handleAvatarClick}
                        className="absolute inset-0 h-full w-full bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                        aria-label="Change profile picture"
                     >
                        <Camera className="h-8 w-8" />
                     </Button>
                     <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={handleFileChange}
                        className="hidden" 
                        accept="image/*"
                     />
                </div>
                <div className="flex-grow text-center">
                    {isEditing ? (
                        <div className="space-y-2">
                           <Input name="name" value={user.name} onChange={handleInputChange} className="text-4xl font-headline h-auto p-1 border-0 bg-transparent text-center" />
                           <Input name="program" value={user.program} onChange={handleInputChange} className="h-auto p-1 border-0 bg-transparent text-muted-foreground text-center" />
                           <Input name="email" value={user.email} onChange={handleInputChange} className="text-sm h-auto p-1 border-0 bg-transparent text-muted-foreground text-center" />
                        </div>
                    ) : (
                        <div>
                            <h1 className="text-4xl font-headline">{user.name}</h1>
                            <p className="text-muted-foreground text-lg">{user.program}</p>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
        
        <motion.div 
            className="p-8 space-y-12"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
             <motion.section variants={itemVariants}>
                <h2 className="text-3xl font-headline flex items-center gap-3 mb-4">
                    <UserIcon className="h-6 w-6 text-primary" />
                    About Me
                </h2>
                {isEditing ? (
                    <Textarea 
                        name="about"
                        value={user.about}
                        onChange={handleInputChange}
                        className="text-muted-foreground text-base"
                        rows={4}
                        placeholder="Tell everyone a little bit about yourself..."
                    />
                ) : (
                    <p className="text-muted-foreground text-base whitespace-pre-wrap">
                        {user.about || 'This user has not written an "About Me" section yet.'}
                    </p>
                )}
            </motion.section>

            {Object.entries(combinedActivities).map(([title, { icon, activities, type }]) => {
                if (!sectionVisibility[type as keyof SectionVisibility] && 
                    !(type === 'Seminar' && sectionVisibility['Conference']) &&
                    !(type === 'Community Service' && sectionVisibility['Volunteering'])
                ) return null;

                return (
                    <motion.section key={title} variants={itemVariants}>
                        <h2 className="text-3xl font-headline flex items-center gap-3 mb-6">
                            {React.cloneElement(icon, {className: "h-6 w-6 text-primary"})}
                            {title}
                        </h2>
                        <div className="space-y-6">
                            {activities.map((activity) => (
                                <motion.div 
                                    key={activity.id} 
                                    className="bg-card p-4 rounded-lg shadow-md hover:shadow-primary/20 transition-shadow duration-300"
                                    variants={cardHoverVariants}
                                    whileHover="hover"
                                >
                                    <h3 className="font-semibold text-lg">{activity.name}</h3>
                                    <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                                        <Calendar className="h-4 w-4" />
                                        {new Date(activity.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
                                    </p>
                                    <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                                        Verified by: {activity.approver}
                                    </p>
                                 </motion.div>
                            ))}
                        </div>
                    </motion.section>
                )
            })}
        </motion.div>
      </CardContent>
    </Card>
  );
}
