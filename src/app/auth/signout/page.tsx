'use client';
import Button from '@/src/components/ui/button/Button';
import useAuth from '@/src/hooks/useAuth';
import { useRouter } from 'next/navigation';

export default function Signout({}) {
  const router = useRouter();
  const { logout } = useAuth();

  return (
    <div className='flex bg-sroom-gray-200'>
      <div className='max-w-md mx-auto pt-60 pb-96'>
        <h2 className='flex flex-col gap-2 mb-8 text-3xl font-bold text-sroom-black-400'>
          <p>{'지금 로그아웃 하시면'}</p>
          <p>{'스룸의 기능을 이용하실 수 없어요! :('}</p>
        </h2>
        <h3 className='mb-16 text-lg font-medium text-sroom-black-100'>
          {'이용 중이시던 서비스를 계속해서 즐겨보세요'}
        </h3>
        <Button
          className='w-full mb-5 text-sroom-white bg-sroom-brand'
          onClick={router.back}
        >
          돌아가기
        </Button>
        <Button
          className='w-full border text-sroom-black-400 bg-sroom-white border-sroom-gray-500'
          onClick={logout}
        >
          로그아웃 하기
        </Button>
      </div>
    </div>
  );
}
