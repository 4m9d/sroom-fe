import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { fetchUserAuthWithRefreshToken } from '../api/auth/login';
import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '../lib/queryKeys';

export default function useAuth() {
  const router = useRouter();
  const { data: session, status, update } = useSession();
  const NOW = Math.floor(Date.now() / 1000);
  //서버에서 설정한 만료 시간보다 1분 짧게 변경
  const REFRESH_PERIOD = session ? session?.expiresAt - NOW - 60 * 1000 : 0;
  const refreshToken = { refreshToken: session?.refreshToken ?? '' };

  const silentRefresh = async (refreshToken: RefreshToken, update: any) => {
    const response = await fetchUserAuthWithRefreshToken(refreshToken);
    if (response.ok) {
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
    await signIn('credentials', {
      credential: credential,
      redirect: false
    }).then((res) => {
      if (res?.ok) {
        router.replace('/dashboards');
      } else {
        console.log('로그인 실패');
      }
      //TODO: 로그인한 유저 -> 메인으로 못 가게 막기
    });
  };

  return { session, status, login, silentRefresh };
}