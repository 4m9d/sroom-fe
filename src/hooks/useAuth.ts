import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ErrorMessage } from '../api/ErrorMessage';
import setErrorToast from '../util/toast/setErrorToast';
import { useEffect } from 'react';

export default function useAuth() {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session?.error === 'RefreshAccessTokenError') {
      signOut();
    }
  }, [session]);

  const login = async (googleResponse: GoogleLoginCredential) => {
    if (!googleResponse) return;

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

    router.refresh();
  };

  const logout = async () => {
    await signOut().then(() => {
      router.replace('/');
      router.refresh();
    });
  };

  return { session, status, login, logout };
}
