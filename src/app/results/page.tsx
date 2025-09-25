import { AppLayout } from '@/components/app-layout';
import { ExamResultList } from '@/components/exam-result-list';
import { examResults } from '@/lib/data';

export default function ResultsPage() {
  return (
    <AppLayout>
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-headline tracking-tight">Exam Results</h1>
          <p className="text-muted-foreground mt-1">View your semester-wise examination results.</p>
        </div>
        <ExamResultList results={examResults} />
      </div>
    </AppLayout>
  );
}
