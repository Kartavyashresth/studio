import { NexusLogo } from '@/components/nexus-logo';

export function SplashScreen() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground">
      <div className="flex flex-col items-center justify-center gap-4">
        <NexusLogo className="h-24 w-24 animate-thunder-glow" />
        <h1 className="text-6xl font-headline tracking-wider animate-fade-in-scale">Nexus</h1>
      </div>
      <p className="mt-8 text-muted-foreground animate-fade-in-delay">
        developed by students of gecv
      </p>
    </main>
  );
}
