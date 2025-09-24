import { AppLayout } from '@/components/app-layout';
import { AcademicRecordList } from '@/components/academic-record-list';
import { academicRecords } from '@/lib/data';
import { BookMarked } from 'lucide-react';

export default function RecordsPage() {
  return (
    <AppLayout>
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
            <div>
                <h1 className="text-3xl md:text-4xl font-headline tracking-tight">Academic Records</h1>
                <p className="text-muted-foreground mt-1">A detailed history of your coursework and grades.</p>
            </div>
        </div>
        <AcademicRecordList records={academicRecords} />
      </div>
    </AppLayout>
  );
}
