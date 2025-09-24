'use client';

import { useRouter } from 'next/navigation';
import { AuthLayout } from '@/components/auth-layout';
import { LoginForm } from '@/components/login-form';
import { RegisterForm } from '@/components/register-form';

export default function LoginPage() {
  const router = useRouter();

  const handleLoginSuccess = (name: string) => {
    const urlName = encodeURIComponent(name);
    // This logic can be expanded based on user role
    router.push(`/dashboard?name=${urlName}`);
  };

  const handleRegisterSuccess = () => {
    // We can show a toast message here if needed
    // For now, the layout will handle switching back to the login form
  };

  return (
    <AuthLayout
      loginForm={<LoginForm onSuccess={handleLoginSuccess} />}
      registerForm={<RegisterForm onSuccess={handleRegisterSuccess} />}
    />
  );
}
