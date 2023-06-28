'use client';
import { useRef } from 'react';
import useScript from '@/src/hook/useScript';
import useAuth from '@/src/hook/useAuth';

export default function LoginButton() {
  const loginButton = useRef<HTMLDivElement>(null);
  const { login } = useAuth();

  const onload = () => {
    window.google.accounts.id.initialize({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      callback: login
    });

    window.google.accounts.id.renderButton(loginButton.current, {
      theme: 'outline',
      width: 250
    });
    window.google.accounts.id.prompt();
  };

  useScript('https://accounts.google.com/gsi/client', onload);

  return <div id='google-login-button' ref={loginButton} />;
}
