'use client';
import getCompactFormattedTime from '@/src/util/day/getCompactFormattedTime';
import Image from 'next/image';
import React from 'react';

type Props = {
  lectureIndex: LectureIndex;
  indexNum: number;
};

export default function LectureDetailIndexCard({
  lectureIndex,
  indexNum
}: Props) {
  const { thumbnail, lecture_title, duration } = lectureIndex;
  return (
    <li className='flex items-center justify-between h-20 p-3 border border-gray-200 bg-zinc-50'>
      <div className='relative object-cover min-w-[calc(4rem*1.78)] h-16 border-gray-200 border'>
        <Image fill={true} sizes='100%' src={thumbnail} alt={lecture_title} />
      </div>
      <div className='flex items-center w-full gap-5 px-5'>
        <div className='flex items-center justify-center w-6 h-6 rounded-full shrink-0 bg-zinc-700'>
          <span className='text-sm font-semibold text-zinc-100'>{indexNum}</span>
        </div>
        <div className='text-sm font-semibold xl:text-base line-clamp-2'>
          <p>{lecture_title}</p>
        </div>
      </div>
      <div className='text-xs text-zinc-500'>
        <p>{getCompactFormattedTime(duration)}</p>
      </div>
    </li>
  );
}
