'use client';
import { useRef } from 'react';
import useScript from '@/src/hook/useScript';

declare global {
  interface Window {
    google: any;
  }
}

export default function Login() {
  const loginButton = useRef<HTMLDivElement>(null);

  const onGoogleLogin = async (res) => {
    //TODO: fetch authorization code
    console.log(res)
  };
  const onload = () => {
    window.google.accounts.id.initialize({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      callback: onGoogleLogin,
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
