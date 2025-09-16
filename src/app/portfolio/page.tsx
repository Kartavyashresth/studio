import { AppLayout } from '@/components/app-layout';
import { PortfolioPreview } from '@/components/portfolio-preview';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Download, Share2 } from 'lucide-react';

export default function PortfolioPage() {
  return (
    <AppLayout>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-headline tracking-tight">Digital Portfolio</h1>
            <p className="text-muted-foreground mt-1">Your verified, shareable record of achievements.</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Share2 className="mr-2 h-4 w-4" />
              Share Link
            </Button>
            <Button>
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </Button>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <PortfolioPreview />
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
                        <Switch id="show-internships" defaultChecked />
                    </div>
                     <div className="flex items-center justify-between">
                        <Label htmlFor="show-courses">Online Courses (MOOCs)</Label>
                        <Switch id="show-courses" defaultChecked />
                    </div>
                     <div className="flex items-center justify-between">
                        <Label htmlFor="show-conferences">Conferences & Seminars</Label>
                        <Switch id="show-conferences" defaultChecked />
                    </div>
                     <div className="flex items-center justify-between">
                        <Label htmlFor="show-extra">Extra-curriculars</Label>
                        <Switch id="show-extra" />
                    </div>
                </CardContent>
             </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
