'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import useIntersectionObserver from '@/src/hooks/useIntersectionObserver';
import TabNav from '../ui/TabNav';

type Props = {
  is_playlist: boolean;
};

export default function LectureDetailTabNav({ is_playlist }: Props) {
  const [activeId, setActiveId] = useState<string>(
    is_playlist ? 'indexes' : 'reviews'
  );
  const [observe, unobserve] = useIntersectionObserver(
    setActiveId,
    document.querySelector('#lecture-detail-container')
  );

  useEffect(() => {
    const entries = document.querySelectorAll(
      'dialog section'
    ) as NodeListOf<HTMLElement>;

    entries.forEach((entry) => observe(entry));

    return () => entries.forEach((entry) => unobserve(entry));
  }, [observe, unobserve]);

  return (
    <TabNav className='sticky z-10 h-16 border-b tab-bordered border-b-sroom-black-100 -top-14 bg-sroom-white text-sroom-black-400'>
      <li>
        <Link
          href='#indexes'
          replace={true}
          className={`tab tab-bordered text-lg transition-colors p-1 ${
            activeId === 'indexes'
              ? 'tab-active font-bold border-b-sroom-black-400 border-b-2'
              : 'border-none text-sroom-black-100 font-medium'
          }`}
        >
          목차
        </Link>
      </li>
      <li>
        <Link
          href='#reviews'
          replace={true}
          className={`tab tab-bordered text-lg transition-colors ml-3 p-1 ${
            activeId === 'reviews'
              ? 'tab-active font-bold border-b-sroom-black-400 border-b-2'
              : 'border-none text-sroom-black-100 font-medium'
          }`}
        >
          후기
        </Link>
      </li>
    </TabNav>
  );
}
