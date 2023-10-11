'use client';
import { useRef } from 'react';
import useAuth from '@/src/hooks/useAuth';
import Script from 'next/script';
import useWindowSize from '@/src/hooks/useWindowSize';
import { BROWSER_MIN_WIDTH } from '@/src/constants/window/window';

type Props = {
  className?: string;
  buttonWidth?: number;
};

export default function LoginButton({ className, buttonWidth: width = 100 }: Props) {
  const loginButton = useRef<HTMLDivElement>(null);
  const { login, status } = useAuth();
  const { width: windowWidth } = useWindowSize();

  const onload = async () => {
    window.google.accounts.id.initialize({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      callback: async (response: GoogleLoginResponse) =>
        await login({ credential: response.credential }),
      prompt_parent_id: 'google-one-tap'
    });

    if (status !== 'authenticated') {
      window.google.accounts.id.prompt();
    }

    window.google.accounts.id.renderButton(loginButton.current, {
      theme: 'outline',
      width: width
    });
  };

  return (
    <>
      {windowWidth >= BROWSER_MIN_WIDTH && (
        <>
          <Script
            id='google-login'
            src='https://accounts.google.com/gsi/client'
            onLoad={onload}
            defer
          />
          <div
            className={`${className} inline-block h-10 mt-2 align-middle md:mt-5`}
            id='google-login-button'
            ref={loginButton}
          />
        </>
      )}
    </>
  );
}
