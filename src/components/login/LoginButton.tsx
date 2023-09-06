'use client';
import { memo, useRef } from 'react';
import useScript from '@/src/hooks/useScript';
import useAuth from '@/src/hooks/useAuth';

function LoginButton() {
  const loginButton = useRef<HTMLDivElement>(null);
  const { login, status } = useAuth();

  const onload = async () => {
    window.google.accounts.id.initialize({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      callback: async (response: GoogleLoginResponse) => await login({credential: response.credential}),
      prompt_parent_id: 'google-one-tap'
    });

    if (status !== 'authenticated') {
      window.google.accounts.id.prompt();
    }

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
      className='inline-block h-10 mt-2 align-middle md:mt-5'
      id='google-login-button'
      ref={loginButton}
    />
  );
}

export default memo(LoginButton);