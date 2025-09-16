import { AppLayout } from '@/components/app-layout';
import { ReportGenerator } from '@/components/report-generator';

export default function FacultyReportsPage() {
  return (
    <AppLayout>
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-headline tracking-tight">Accreditation Reports</h1>
          <p className="text-muted-foreground mt-1">
            Generate institutional reports for accreditation bodies like NAAC, AICTE, and NIRF.
          </p>
        </div>
        <ReportGenerator />
      </div>
    </AppLayout>
  );
}
