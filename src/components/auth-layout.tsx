
'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { NexusLogo } from '@/components/nexus-logo';

interface AuthLayoutProps {
  initialState?: 'login' | 'register';
  loginForm: React.ReactNode;
  registerForm: React.ReactNode;
}

export function AuthLayout({
  initialState = 'login',
  loginForm,
  registerForm,
}: AuthLayoutProps) {
  const [isRegisterActive, setIsRegisterActive] = useState(initialState === 'register');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // Render nothing on the server to avoid hydration mismatches
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-muted/40 p-4 font-body antialiased">
        <div className={cn(
            "relative w-full max-w-4xl min-h-[520px] rounded-lg shadow-lg overflow-hidden transition-all duration-700 ease-in-out bg-card",
            "container"
        )}>
            {/* Sign-Up Form Container */}
            <div className={cn(
                "absolute top-0 h-full w-1/2 left-0 transition-all duration-700 ease-in-out",
                "form-container sign-up-container",
                isRegisterActive ? "translate-x-full opacity-100 z-50" : "opacity-0 z-10"
            )}>
                {registerForm}
            </div>

            {/* Sign-In Form Container */}
            <div className={cn(
                "absolute top-0 h-full w-1/2 left-0 transition-all duration-700 ease-in-out",
                "form-container sign-in-container",
                isRegisterActive ? "-translate-x-full opacity-0" : "translate-x-0 opacity-100 z-20"
            )}>
                {loginForm}
            </div>

            {/* Overlay Container */}
            <div className={cn(
                "absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-transform duration-700 ease-in-out z-[100]",
                "overlay-container",
                isRegisterActive ? "-translate-x-full" : "translate-x-0"
            )}>
                <div className={cn(
                    "relative -left-full h-full w-[200%] transition-transform duration-700 ease-in-out bg-gradient-to-r from-primary to-purple-600 text-primary-foreground",
                    "overlay",
                    isRegisterActive ? "translate-x-1/2" : "translate-x-0"
                )}>
                    {/* Overlay Left */}
                    <div className={cn(
                        "absolute top-0 h-full w-1/2 flex items-center justify-center flex-col px-10 text-center",
                        "overlay-panel overlay-left",
                        isRegisterActive ? "translate-x-0" : "-translate-x-[20%]"
                    )}>
                        <NexusLogo className="h-12 w-12 mb-4 animate-pulse-glow-white" />
                        <h1 className="text-3xl font-headline">Welcome Back!</h1>
                        <p className="text-sm mt-2 mb-4">
                            your smart student platform
                        </p>
                        <button className="ghost-button" onClick={() => setIsRegisterActive(false)}>
                            Sign In
                        </button>
                    </div>
                    {/* Overlay Right */}
                    <div className={cn(
                        "absolute top-0 h-full w-1/2 flex items-center justify-center flex-col px-10 text-center right-0",
                        "overlay-panel overlay-right",
                        isRegisterActive ? "translate-x-[20%]" : "translate-x-0"
                    )}>
                         <NexusLogo className="h-12 w-12 mb-4 animate-pulse-glow-white" />
                        <h1 className="text-3xl font-headline">Welcome to Nexus</h1>
                        <p className="text-sm mt-2 mb-4">WITH US EVERY ACHIEVEMENT COUNTS</p>
                        <button className="ghost-button" onClick={() => setIsRegisterActive(true)}>
                            Sign Up
                        </button>
                    </div>
                </div>
            </div>
        </div>
      <style jsx>{`
        .container {
            box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
        }
        .form-container {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0 2rem;
        }
        .overlay-panel {
            transition: transform 0.7s ease-in-out;
        }
        .ghost-button {
            border-radius: 20px;
            border: 1px solid #fff;
            background-color: transparent;
            color: #fff;
            font-size: 12px;
            font-weight: bold;
            padding: 12px 45px;
            letter-spacing: 1px;
            text-transform: uppercase;
            transition: transform 80ms ease-in, background-color 0.3s, color 0.3s;
        }
        .ghost-button:hover {
            background-color: #fff;
            color: hsl(var(--primary));
            transform: scale(1.05);
        }
        .ghost-button:active {
            transform: scale(0.95);
        }
      `}</style>
    </main>
  );
}
