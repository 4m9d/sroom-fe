'use client';
import TabNav from '../ui/TabNav';
import { useEffect, useState } from 'react';
import useIntersectionObserver from '@/src/hooks/useIntersectionObserver';

type Props = {
  is_playlist: boolean;
};

export default function LectureDetailTabNav({ is_playlist }: Props) {
  const [activeId, setActiveId] = useState<string>(
    is_playlist ? 'indexes' : 'reviews'
  );
  const [observe, unobserve] = useIntersectionObserver(
    setActiveId,
    document.getElementById('modal')
  );
  
  useEffect(() => {
    const entries = document.querySelectorAll('section');
    entries.forEach((entry) => observe(entry));

    return () => entries.forEach((entry) => unobserve(entry));
  }, [observe, unobserve]);

  return (
    <TabNav className='sticky z-10 h-16 border-b tab-bordered border-b-sroom-black-100 -top-14 bg-sroom-white text-sroom-black-400'>
        <li>
          <a
            href='#indexes'
            className={`tab tab-bordered text-lg transition-colors p-1 ${
              activeId === 'indexes'
                ? 'tab-active font-bold border-b-sroom-black-400 border-b-2'
                : 'border-none text-sroom-black-100 font-medium'
            }`}
          >
            목차
          </a>
        </li>
      <li>
        <a
          href='#reviews'
          className={`tab tab-bordered text-lg transition-colors ml-3 p-1 ${
            activeId === 'reviews'
              ? 'tab-active font-bold border-b-sroom-black-400 border-b-2'
              : 'border-none text-sroom-black-100 font-medium'
          }`}
        >
          후기
        </a>
      </li>
    </TabNav>
  );
}
