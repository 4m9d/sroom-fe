'use client';
import { useRouter } from 'next/navigation';
import Button from '../components/ui/button/Button';

export default function NotFound({}) {
  const router = useRouter();

  return (
    <div className='flex bg-sroom-gray-200'>
      <div className='max-w-md mx-auto pt-60 pb-96'>
        <h2 className='mb-8 text-3xl font-bold text-sroom-black-400'>
          {'해당 페이지를 찾을 수 없어요 :('}
        </h2>
        <h3 className='mb-16 text-lg font-medium text-sroom-black-100'>
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
