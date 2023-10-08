import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { fetchUserAuthWithRefreshToken } from '../api/members/members';
import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '../api/queryKeys';
import { ErrorMessage } from '../api/ErrorMessage';
import { ONE_MINUTE_IN_MS } from '../constants/time/time';
import setErrorToast from '../util/toast/setErrorToast';

const refreshInterval = ONE_MINUTE_IN_MS * 29;

export default function useAuth() {
  const router = useRouter();
  const { data: session, status, update } = useSession();
  const refreshToken = { refresh_token: session?.refresh_token ?? '' };

  const silentRefresh = async () => {
    const response = await fetchUserAuthWithRefreshToken(refreshToken)
      .then(async (res) => {
        await update(res);
        return res;
      })
      .catch(async () => {
        await logout();
        setErrorToast(new Error(ErrorMessage.REFRESH));
      });

    return response;
  };

  useQuery([QueryKeys.REFRESH], () => silentRefresh(), {
    enabled: !!session,
    refetchInterval: refreshInterval,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchIntervalInBackground: true
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
