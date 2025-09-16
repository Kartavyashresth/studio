'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Download, FileText, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function ReportGenerator() {
  const [reportType, setReportType] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleGenerate = () => {
    if (!reportType) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Please select a report type to generate.',
      });
      return;
    }
    setIsGenerating(true);
    // Simulate report generation
    setTimeout(() => {
      setIsGenerating(false);
      toast({
        title: 'Report Generated!',
        description: `Your ${reportType} report is ready for download.`,
      });
    }, 2500);
  };

  return (
    <Card className="max-w-xl mx-auto">
      <CardHeader>
        <CardTitle className="font-headline">Generate Report</CardTitle>
        <CardDescription>Select the type of accreditation report you need to generate. The system will compile all relevant student data.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
            <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger>
                    <SelectValue placeholder="Select a report type..." />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="NAAC">NAAC Report</SelectItem>
                    <SelectItem value="AICTE">AICTE Report</SelectItem>
                    <SelectItem value="NIRF">NIRF Report</SelectItem>
                </SelectContent>
            </Select>
        </div>
        {reportType && (
            <div className="p-4 bg-muted/50 border rounded-lg text-sm text-muted-foreground flex items-start gap-3">
                <FileText className="h-5 w-5 mt-0.5 shrink-0" />
                <p>
                    This will generate a comprehensive <strong>{reportType}</strong> report including data on student performance, activities, placements, and diversity metrics based on the records in the system.
                </p>
            </div>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={handleGenerate} disabled={!reportType || isGenerating} className="w-full">
            {isGenerating ? (
                <>
                    <Loader2 className="mr-2 animate-spin" />
                    Generating...
                </>
            ) : (
                <>
                    <Download className="mr-2" />
                    Generate & Download
                </>
            )}
        </Button>
      </CardFooter>
    </Card>
  );
}
