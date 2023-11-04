import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ErrorMessage } from '../api/ErrorMessage';
import setErrorToast from '../util/toast/setErrorToast';
import { useEffect, useState } from 'react';

export default function useAuth() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (session?.error === 'RefreshAccessTokenError') {
      signOut();
    }
  }, [session]);

  const login = async (googleResponse: GoogleLoginCredential) => {
    if (!googleResponse) return;
    setIsLoading(() => true);

    await signIn('credentials', {
      credential: googleResponse.credential,
      redirect: false
    })
      .then((res) => {
        if (res?.error) {
          throw new Error(ErrorMessage.LOGIN);
        }
      })
      .catch((err) => {
        setErrorToast(err);
      });

    setIsLoading(() => false);

    router.refresh();
  };

  const logout = async () => {
    await signOut().then(() => {
      router.replace('/');
      router.refresh();
    });
  };

  return { session, status, login, logout, isLoading };
}
