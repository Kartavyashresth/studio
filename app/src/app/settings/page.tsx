import { AppLayout } from '@/components/app-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Bell, KeyRound, Save } from 'lucide-react';

export default function SettingsPage() {
  return (
    <AppLayout>
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-headline tracking-tight">Settings</h1>
          <p className="text-muted-foreground mt-1">
            Manage your account and notification preferences.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
            {/* Notification Settings */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Bell /> Notification Preferences</CardTitle>
                    <CardDescription>Control how you receive notifications from Nexus.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                            <Label htmlFor="email-notifications" className="font-medium">Email Notifications</Label>
                            <p className="text-sm text-muted-foreground">Receive important updates via email.</p>
                        </div>
                        <Switch id="email-notifications" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                            <Label htmlFor="push-notifications" className="font-medium">Push Notifications</Label>
                            <p className="text-sm text-muted-foreground">Get real-time alerts on your devices.</p>
                        </div>
                        <Switch id="push-notifications" />
                    </div>
                </CardContent>
            </Card>

            {/* Change Password */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><KeyRound /> Change Password</CardTitle>
                    <CardDescription>For security, choose a strong, unique password.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="current-password">Current Password</Label>
                            <Input id="current-password" type="password" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="new-password">New Password</Label>
                            <Input id="new-password" type="password" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="confirm-password">Confirm New Password</Label>
                            <Input id="confirm-password" type="password" required />
                        </div>
                        <Button type="submit" className="w-full">
                            Update Password
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
        
        <div className="flex justify-start">
             <Button size="lg">
                <Save className="mr-2" />
                Save All Changes
            </Button>
        </div>
      </div>
    </AppLayout>
  );
}
