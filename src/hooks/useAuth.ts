import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { fetchUserAuthWithRefreshToken } from '../api/members/members';
import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '../api/queryKeys';
import { ErrorMessage } from '../api/ErrorMessage';
import { ONE_MINUTE_IN_MS, ONE_SECOND_IN_MS } from '../constants/time/time';
import setErrorToast from '../util/toast/setErrorToast';
import { useCallback, useEffect, useState } from 'react';

const THIRTY_MINUTES_IN_SEC = 60 * 30;

export default function useAuth() {
  const router = useRouter();
  const { data: session, status, update } = useSession();
  const [isRefreshEnable, setIsRefreshEnable] = useState(!!session);

  const refreshToken = { refresh_token: session?.refresh_token ?? '' };

  const refreshEnableHandler = useCallback(() => {
    return (
      !!session &&
      Math.floor(Date.now() / 1000) +
        THIRTY_MINUTES_IN_SEC -
        session.expires_at >
        5
    );
  }, [session]);

  const calculateRefetchInterval = (expiresAt: number) => {
    const now = Date.now();
    const expires = expiresAt * ONE_SECOND_IN_MS;
    const diff = expires - now;
    const refetchInterval = diff - 5 * ONE_MINUTE_IN_MS;

    return refetchInterval > 0 ? refetchInterval : ONE_MINUTE_IN_MS;
  };

  useEffect(() => {
    setIsRefreshEnable(() => refreshEnableHandler());
  }, [refreshEnableHandler]);

  useEffect(() => {
    if(session?.error === 'RefreshAccessTokenError') {
      signOut();
    }
  },[session])

  useQuery(
    [QueryKeys.REFRESH],
    () => fetchUserAuthWithRefreshToken(refreshToken),
    {
      enabled: isRefreshEnable,
      refetchInterval: (data) => {
        if (!data) return false;
        return calculateRefetchInterval(data.expires_at);
      },
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchIntervalInBackground: true,
      onSuccess: async (data) => {
        await update(data);
      }
    }
  );

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
