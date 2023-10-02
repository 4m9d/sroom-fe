'use client';
import { useRouter } from 'next/navigation';
import Button from '../components/ui/button/Button';

export default function NotFound({}) {
  const router = useRouter();

  return (
    <div className='z-[9999] w-screen h-screen bg-white'>
      <div className='max-w-md mx-auto mt-60'>
        <h2 className='mb-8 text-4xl font-bold text-sroom-black-400'>
          {'해당 페이지를 찾을 수 없어요 :('}
        </h2>
        <h3 className='mb-16 text-xl font-medium text-sroom-black-100'>
          {'404 not found'}
        </h3>
        <Button
          className='w-full text-sroom-white bg-sroom-brand'
          onClick={router.back}
        >
          돌아가기
        </Button>
      </div>
    </div>
  );
}
