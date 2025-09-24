'use client';

import { useRouter } from 'next/navigation';
import { AuthLayout } from '@/components/auth-layout';
import { LoginForm } from '@/components/login-form';
import { RegisterForm } from '@/components/register-form';

export default function RegisterPage() {
  const router = useRouter();

  const handleLoginSuccess = (name: string) => {
    const urlName = encodeURIComponent(name);
    router.push(`/dashboard?name=${urlName}`);
  };

  const handleRegisterSuccess = () => {
    // The layout handles showing the login form
  };

  return (
    <AuthLayout
      initialState="register"
      loginForm={<LoginForm onSuccess={handleLoginSuccess} />}
      registerForm={<RegisterForm onSuccess={handleRegisterSuccess} />}
    />
  );
}
