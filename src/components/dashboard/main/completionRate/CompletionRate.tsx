'use client';
import RadialProgress from '../../../ui/RadialProgress';
import useWindowSize from '@/src/hooks/useWindowSize';

type Props = {
  value: number;
};

export default function CompletionRate({ value }: Props) {
  const { width } = useWindowSize();

  return (
    <div className='flex items-center justify-center gap-2 md:gap-5 bg-sroom-brand'>
      <p className='text-xs font-semibold sm:text-sm md:text-md lg:text-lg xl:text-xl text-sroom-white'>
        등록한 강의 완강률
      </p>
      <div className='h-[65.7%] w-[22.8%] flex justify-center items-center'>
        <RadialProgress
          className='w-full h-full text-sroom-white'
          innerTextClassName='text-sroom-black-400 text-xs sm:text-sm md:text-md lg:text-xl xl:text-3xl font-bold'
          value={value}
          size={width < 768 ? '2rem' : width < 1024 ? '4rem' : '5rem'}
        />
      </div>
    </div>
  );
}
