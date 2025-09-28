
'use client';

import { useState, useRef } from 'react';
import { AppLayout } from '@/components/app-layout';
import { PortfolioPreview } from '@/components/portfolio-preview';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Download, Share2, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export type SectionVisibility = {
  Internship: boolean;
  MOOC: boolean;
  Conference: boolean;
  'Extra-curricular': boolean;
  Seminar: boolean;
  Workshop: boolean;
  Volunteering: boolean;
  Competition: boolean;
  'Leadership Role': boolean;
  'Community Service': boolean;
};

export default function PortfolioPage() {
  const [visibility, setVisibility] = useState<SectionVisibility>({
    Internship: true,
    MOOC: true,
    Conference: true,
    Seminar: true,
    'Extra-curricular': false,
    Workshop: true,
    Volunteering: true,
    Competition: true,
    'Leadership Role': true,
    'Community Service': false,
  });
  const [isDownloading, setIsDownloading] = useState(false);
  const { toast } = useToast();
  const portfolioRef = useRef<HTMLDivElement>(null);

  const handleVisibilityChange = (section: keyof SectionVisibility, checked: boolean) => {
    setVisibility(prev => ({ ...prev, [section]: checked }));
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: 'Link Copied!',
      description: 'Your portfolio link has been copied to the clipboard.',
    });
  };

  const handleDownload = async () => {
    if (!portfolioRef.current) return;
    setIsDownloading(true);

    try {
        const canvas = await html2canvas(portfolioRef.current, {
            scale: 2, // Higher scale for better resolution
            useCORS: true,
            backgroundColor: null, 
        });
        
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
            orientation: 'p',
            unit: 'px',
            format: [canvas.width, canvas.height]
        });

        pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
        pdf.save('portfolio.pdf');
    } catch (error) {
        console.error('Error generating PDF:', error);
        toast({
            variant: 'destructive',
            title: 'Download Failed',
            description: 'Could not generate PDF. Please try again.',
        });
    } finally {
        setIsDownloading(false);
    }
  };

  return (
    <AppLayout>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-headline tracking-tight">Digital Portfolio</h1>
            <p className="text-muted-foreground mt-1">Your verified, shareable record of achievements.</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={handleShare}>
              <Share2 className="mr-2 h-4 w-4" />
              Share Link
            </Button>
            <Button onClick={handleDownload} disabled={isDownloading}>
                {isDownloading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                    <Download className="mr-2 h-4 w-4" />
                )}
                {isDownloading ? 'Downloading...' : 'Download PDF'}
            </Button>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div ref={portfolioRef}>
                <PortfolioPreview sectionVisibility={visibility} />
            </div>
          </div>
          <div className="lg:col-span-1">
             <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Customize</CardTitle>
                    <CardDescription>Toggle sections to include in your portfolio.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="show-internships">Internships</Label>
                        <Switch 
                            id="show-internships" 
                            checked={visibility.Internship}
                            onCheckedChange={(checked) => handleVisibilityChange('Internship', checked)}
                        />
                    </div>
                     <div className="flex items-center justify-between">
                        <Label htmlFor="show-courses">Online Courses (MOOCs)</Label>
                        <Switch 
                            id="show-courses" 
                            checked={visibility.MOOC}
                            onCheckedChange={(checked) => handleVisibilityChange('MOOC', checked)}
                        />
                    </div>
                     <div className="flex items-center justify-between">
                        <Label htmlFor="show-conferences">Conferences & Seminars</Label>
                        <Switch 
                            id="show-conferences" 
                            checked={visibility.Conference || visibility.Seminar}
                            onCheckedChange={(checked) => {
                                handleVisibilityChange('Conference', checked);
                                handleVisibilityChange('Seminar', checked);
                            }}
                        />
                    </div>
                     <div className="flex items-center justify-between">
                        <Label htmlFor="show-competitions">Competitions</Label>
                        <Switch 
                            id="show-competitions" 
                            checked={visibility.Competition}
                            onCheckedChange={(checked) => handleVisibilityChange('Competition', checked)}
                        />
                    </div>
                     <div className="flex items-center justify-between">
                        <Label htmlFor="show-leadership">Leadership Roles</Label>
                        <Switch 
                            id="show-leadership" 
                            checked={visibility['Leadership Role']}
                            onCheckedChange={(checked) => handleVisibilityChange('Leadership Role', checked)}
                        />
                    </div>
                     <div className="flex items-center justify-between">
                        <Label htmlFor="show-volunteering">Volunteering & Community Service</Label>
                        <Switch 
                            id="show-volunteering" 
                            checked={visibility.Volunteering || visibility['Community Service']}
                            onCheckedChange={(checked) => {
                                handleVisibilityChange('Volunteering', checked);
                                handleVisibilityChange('Community Service', checked);
                            }}
                        />
                    </div>
                     <div className="flex items-center justify-between">
                        <Label htmlFor="show-extra">Extra-curriculars</Label>
                        <Switch 
                            id="show-extra" 
                            checked={visibility['Extra-curricular']}
                            onCheckedChange={(checked) => handleVisibilityChange('Extra-curricular', checked)}
                        />
                    </div>
                </CardContent>
             </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
