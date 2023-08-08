'use client';
import Link from 'next/link';
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
  }, []);

  return (
    <TabNav className='sticky z-10 h-16 mb-5 tab-bordered -top-14 bg-inherit'>
      {is_playlist && (
        <li>
          <Link
            href='#indexes'
            replace={true}
            scroll={false}
            shallow={true}
            className={`tab tab-bordered text-lg transition-colors ${
              activeId === 'indexes' ? 'tab-active font-bold' : 'border-none font-semibold'
            }`}
          >
            목차
          </Link>
        </li>
      )}
      <li>
        <Link
          href='#reviews'
          replace={true}
          scroll={false}
          shallow={true}
          className={`tab tab-bordered text-lg transition-colors ${
            activeId === 'reviews' ? 'tab-active font-bold' : 'border-none font-semibold'
          }`}
        >
          후기
        </Link>
      </li>
    </TabNav>
  );
}
