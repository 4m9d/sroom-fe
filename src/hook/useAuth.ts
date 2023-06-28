import { useQueryClient, useQuery } from '@tanstack/react-query';
import { QueryKeys } from '../api/queryKeys';
import fetchUserAuth from '../api/auth/login';

export default function useAuth() {
  const QueryClient = useQueryClient();

  const login = async (credential: GoogleLoginResponse) => {
    console.log('일단 호출은 됨');
    await fetchUserAuth(credential).then((res) => {
      if (res) {
        QueryClient.setQueryData(QueryKeys.AuthQueryKey, res);
        QueryClient.invalidateQueries(QueryKeys.AuthQueryKey);
        console.log('로그인 성공');
      }
    });
  };
  return { login };
}
