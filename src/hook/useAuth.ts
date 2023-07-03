import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { fetchUserAuthWithRefreshToken } from '../api/auth/login';
import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '../lib/queryKeys';
import useAlert from './useAlert';

export default function useAuth() {
  const router = useRouter();
  const { data: session, status, update } = useSession();
  const { setAlert } = useAlert();
  const NOW = Math.floor(Date.now() / 1000);
  //서버에서 설정한 만료 시간보다 1분 짧게 변경
  const REFRESH_PERIOD = session ? session?.expiresAt - NOW - 60 * 1000 : 0;
  const refreshToken = { refreshToken: session?.refreshToken ?? '' };

  const loginErrorHandler = (e: Error) => {
    setAlert({
      type: 'error',
      title: '에러 발생',
      description: e.message
    });
  };
  const silentRefresh = async (refreshToken: RefreshToken, update: any) => {
    const response = await fetchUserAuthWithRefreshToken(refreshToken);
    if (response.ok) {
      //TODO: 로그 추후 삭제
      console.log('silent refresh!');
      await update(response);
    } else {
    }
    return response;
  };

  useQuery([QueryKeys.REFRESH], () => silentRefresh(refreshToken, update), {
    enabled: !!session,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: 2,
    refetchInterval: REFRESH_PERIOD,
    refetchIntervalInBackground: true
  });

  const login = async (credential: GoogleLoginResponse) => {
    //TODO: 로그 추후 삭제
    console.log('구글 토큰', credential);
    if (!credential) return;

    await signIn('credentials', {
      credential: credential,
      redirect: false
    })
      .then((res) => {
        if (!res?.ok) {
          throw new Error('로그인에 실패했어요');
        }
        router.replace('/dashboards');
      })
      .catch((err) => {
        loginErrorHandler(err);
      });
  };

  return { session, status, login, silentRefresh };
}
