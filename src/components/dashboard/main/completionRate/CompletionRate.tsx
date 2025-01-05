'use client';
import { COMPLETION_RATE_BREAKPOINT_LG, COMPLETION_RATE_BREAKPOINT_SM } from '@/src/constants/window/window';
import useWindowSize from '@/src/hooks/useWindowSize';
import RadialProgress from '../../../ui/progress/RadialProgress';

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
          innerTextClassName='text-sroom-black-400 text-xs sm:text-sm md:text-md lg:text-xl xl:text-2xl font-bold'
          value={value}
          size={width < COMPLETION_RATE_BREAKPOINT_SM ?  '3rem' : width < COMPLETION_RATE_BREAKPOINT_LG ? '4rem' : '5rem'}
        />
      </div>
    </div>
  );
}
