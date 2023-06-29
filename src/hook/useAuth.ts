import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
export default function useAuth() {
  const router = useRouter();

  const login = async (credential: GoogleLoginResponse) => {
    signIn('credentials', {
      credential: credential,
      redirect: false
    }).then(() => {
      router.replace('/dashboards');
      //TODO: 로그인한 유저 -> 메인으로 못 가게 막기
    });
  };
  return { login };
}
