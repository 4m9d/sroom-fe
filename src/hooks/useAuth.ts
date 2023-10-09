import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { fetchUserAuthWithRefreshToken } from '../api/members/members';
import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '../api/queryKeys';
import { ErrorMessage } from '../api/ErrorMessage';
import { ONE_MINUTE_IN_MS } from '../constants/time/time';
import setErrorToast from '../util/toast/setErrorToast';

export default function useAuth() {
  const router = useRouter();
  const { data: session, status, update } = useSession();

  const refreshToken = { refresh_token: session?.refresh_token ?? '' };

  const calculateRefreshInterval = () => {
    if (!session) return 0;

    const NOW = Date.now();
    const EXPIRES_AT = session.expires_at * 1000;

    const REFRESH_INTERVAL = EXPIRES_AT - NOW - ONE_MINUTE_IN_MS;

    if (REFRESH_INTERVAL <= 0) {
      return 0;
    }
    return REFRESH_INTERVAL;
  };

  const silentRefresh = async () => {
    const response = await fetchUserAuthWithRefreshToken(refreshToken).catch(
      async () => {
        await logout();
        setErrorToast(new Error(ErrorMessage.REFRESH));
        return null;
      }
    );
    return response;
  };

  useQuery([QueryKeys.REFRESH], silentRefresh, {
    enabled: !!session,
    refetchInterval: calculateRefreshInterval,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchIntervalInBackground: true,
    onSuccess: async (data) => {
      await update(data);
    }
  });

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
        router.push('/dashboard');
      })
      .catch((err) => {
        setErrorToast(err);
      });
    router.refresh();
  };

  const logout = async () => {
    await signOut().then(() => {
      router.push('/');
    });
  };

  return { session, status, login, logout, silentRefresh };
}
