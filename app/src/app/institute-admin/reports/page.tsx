import { AppLayout } from '@/components/app-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

export default function AdminReportsPage() {
  return (
    <AppLayout>
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-headline tracking-tight">Data & Report Management</h1>
          <p className="text-muted-foreground mt-1">
            Access and download comprehensive institutional data and generated reports.
          </p>
        </div>
        <Card>
            <CardHeader>
                <CardTitle>Institutional Reports</CardTitle>
                <CardDescription>Download pre-generated accreditation and internal reports.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                        <p className="font-medium">NAAC Report 2024</p>
                        <p className="text-sm text-muted-foreground">Generated on: 2024-05-20</p>
                    </div>
                    <Button variant="outline" size="icon"><Download /></Button>
                </div>
                 <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                        <p className="font-medium">AICTE Report 2024</p>
                        <p className="text-sm text-muted-foreground">Generated on: 2024-05-18</p>
                    </div>
                    <Button variant="outline" size="icon"><Download /></Button>
                </div>
                 <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                        <p className="font-medium">NIRF Data 2024</p>
                        <p className="text-sm text-muted-foreground">Generated on: 2024-05-21</p>
                    </div>
                    <Button variant="outline" size="icon"><Download /></Button>
                </div>
                 <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                        <p className="font-medium">Annual Activity Summary</p>
                        <p className="text-sm text-muted-foreground">Generated on: 2024-05-22</p>
                    </div>
                    <Button variant="outline" size="icon"><Download /></Button>
                </div>
            </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
