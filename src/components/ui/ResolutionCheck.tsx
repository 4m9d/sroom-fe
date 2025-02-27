'use client';
import { usePathname } from 'next/navigation';
import { BROWSER_MIN_WIDTH } from '@/src/constants/window/window';
import useWindowSize from '@/src/hooks/useWindowSize';

type Props = { children: React.ReactNode };

export default function ResolutionCheck({ children }: Props) {
  const { width } = useWindowSize();
  const pathname = usePathname();

  const isInnerRoute = pathname !== '/';
  const isSmallerThanBrowser = width && width < BROWSER_MIN_WIDTH;

  if (isSmallerThanBrowser && isInnerRoute) {
    return (
      <div className='h-screen px-4 pt-20 text-sroom-black-400 break-keep'>
        <h2 className='w-full text-xl font-bold'>
          <div className='flex'>
            <span className='mr-1'>{'스룸은'}</span>
            <span className='text-sroom-brand'>{'태블릿'}</span>
            <div className='px-1 animate-bounce'>📝</div>
            <span className='mr-1'>{'과'}</span>
            <span className='text-sroom-brand'>{'PC'}</span>
            <div className='px-1 animate-[bounce_1s_infinite_0.5s]'>💻</div>
            {'에'}
          </div>
          <p>{'최적화 되어있어요 :)'}</p>
        </h2>
        <h3 className='mt-3 text-sm font-medium text-sroom-black-100'>
          {'더 쾌적한 환경에서 스룸을 만나보세요!'}
        </h3>
      </div>
    );
  } else {
    return <>{children}</>;
  }
}
