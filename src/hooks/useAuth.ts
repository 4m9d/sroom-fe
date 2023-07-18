import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { fetchUserAuthWithRefreshToken } from '../api/members/login';
import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '../api/queryKeys';
import useToast from './useToast';
import { ErrorMessage } from '../api/ErrorMessage';
import { ONE_MINUTE_IN_MS } from '../constants/auth/auth';

export default function useAuth() {
  const router = useRouter();
  const { data: session, status, update } = useSession();
  const { setErrorToast } = useToast();
  const NOW = Math.floor(Date.now() / 1000);
  //NOTE: 서버에서 설정한 만료 시간보다 1분 짧게 변경
  const REFRESH_PERIOD = session
    ? session?.expires_at - NOW - ONE_MINUTE_IN_MS
    : 0;
  const refreshToken = { refresh_token: session?.refresh_token ?? '' };

  const silentRefresh = async () => {
    const response = await fetchUserAuthWithRefreshToken(refreshToken)
      .then(async (res) => {
        //TODO: 로그 추후 삭제
        console.log('silent refresh! response: ', res);
        await update(res);
        return res;
      })
      .catch(async () => {
        setErrorToast(new Error(ErrorMessage.REFRESH));
        await logout();
      });

    return response;
  };

  useQuery([QueryKeys.REFRESH], silentRefresh, {
    enabled: !!session,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: true,
    retry: 2,
    refetchInterval: REFRESH_PERIOD,
    refetchIntervalInBackground: true
  });

  const login = async (googleResponse: GoogleLoginCredential) => {
    //TODO: 로그 추후 삭제
    console.log('구글 토큰', googleResponse);
    if (!googleResponse) return;

    await signIn('credentials', {
      credential: googleResponse.credential,
      redirect: false
    })
      .then((res) => {
        if (res?.error) {
          throw new Error(ErrorMessage.LOGIN);
        }
        router.replace('/dashboard');
      })
      .catch((err) => {
        setErrorToast(err);
      });
  };

  const logout = async () => {
    await signOut().then(() => {
      router.push('/');
    });
  };

  return { session, status, login, logout, silentRefresh };
}
