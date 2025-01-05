'use client';
import { useRouter } from 'next/navigation';
import LoginButton from '@/src/components/login/LoginButton';
import Button from '@/src/components/ui/button/Button';

export default function Signin({}) {
  const router = useRouter();

  return (
    <div className='flex bg-sroom-gray-200'>
      <div className='max-w-[400px] mx-auto pt-60 pb-96'>
        <h2 className='flex flex-col gap-2 mb-8 text-3xl font-bold text-sroom-black-400'>
          <p>{'스룸의 기능은 로그인을 해야'}</p>
          <p>{'이용하실 수 있어요 :)'}</p>
        </h2>
        <h3 className='mb-16 text-lg font-medium text-sroom-black-100'>
          {'구글 로그인으로 간편하게 스룸을 이용해보세요!'}
        </h3>
        <LoginButton className='mb-5' buttonWidth={400} />
        <Button
          className='w-full text-sroom-white bg-sroom-brand'
          onClick={() => {
            router.replace('/');
            router.refresh();
          }}
        >
          홈으로 가기
        </Button>
      </div>
    </div>
  );
}
