'use client';
import { useEffect, useRef } from 'react';
import useScript from '@/src/hook/useScript';
import useAuth from '@/src/hook/useAuth';

export default function LoginButton() {
  const loginButton = useRef<HTMLDivElement>(null);
  const { login, status } = useAuth();

  const onload = () => {
    window.google.accounts.id.initialize({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      callback: login
    });

    window.google.accounts.id.renderButton(loginButton.current, {
      theme: 'outline',
      width: 100
    });
  };

  useScript(
    'google-login',
    'https://accounts.google.com/gsi/client',
    onload,
    true
  );

  return (
    <div
      className='inline-block mt-5 align-middle sm:ml-5 sm:mt-0'
      id='google-login-button'
      ref={loginButton}
    />
  );
}
