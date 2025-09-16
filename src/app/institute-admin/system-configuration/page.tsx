import { AppLayout } from '@/components/app-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Save } from 'lucide-react';

export default function SystemConfigPage() {
  return (
    <AppLayout>
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-headline tracking-tight">System Configuration</h1>
          <p className="text-muted-foreground mt-1">
            Manage global settings for the Nexus platform.
          </p>
        </div>

        <Card className="max-w-2xl">
            <CardHeader>
                <CardTitle>Feature Flags</CardTitle>
                <CardDescription>Enable or disable major features across the platform.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                        <Label htmlFor="enable-placements" className="font-medium">Placements Portal</Label>
                        <p className="text-sm text-muted-foreground">Allow students to see job/internship listings.</p>
                    </div>
                    <Switch id="enable-placements" defaultChecked />
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                        <Label htmlFor="enable-events" className="font-medium">Events & Registration</Label>
                        <p className="text-sm text-muted-foreground">Show the upcoming events page to students.</p>
                    </div>
                    <Switch id="enable-events" defaultChecked />
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                        <Label htmlFor="enable-chatbot" className="font-medium">AI Chatbot</Label>
                        <p className="text-sm text-muted-foreground">Enable the AI assistant for all users.</p>
                    </div>
                    <Switch id="enable-chatbot" defaultChecked />
                </div>
                 <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                        <Label htmlFor="employer-access" className="font-medium">Employer Portal Access</Label>
                        <p className="text-sm text-muted-foreground">Allow new employers to sign up and access student data.</p>
                    </div>
                    <Switch id="employer-access" />
                </div>
            </CardContent>
        </Card>
        <div className="flex justify-start">
             <Button size="lg">
                <Save className="mr-2" />
                Save Changes
            </Button>
        </div>
      </div>
    </AppLayout>
  );
}
