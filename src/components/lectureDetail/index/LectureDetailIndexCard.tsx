'use client';
import CrownSVG from '@/public/icon/Crown';
import getCompactFormattedTime from '@/src/util/time/getCompactFormattedTime';
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
  const { thumbnail, lecture_title, duration, is_members_only } = lectureIndex;

  return (
    <li
      className={`flex items-center justify-between h-[4.5rem] p-3 border bg-sroom-gray-200 relative ${
        is_members_only ? 'border-[#FCCE00] border-2' : 'border-sroom-gray-400'
      }`}
    >
      <div className='flex items-center w-24'>
        <div className='pb-[56.25%] relative h-0 w-full'>
          <div className='absolute top-0 left-0 object-cover w-full h-full border border-sroom-gray-400'>
            <Image
              fill={true}
              sizes='100%'
              src={thumbnail}
              alt={lecture_title}
            />
          </div>
        </div>
      </div>
      <div className='flex items-center w-full gap-5 px-5'>
        <div className='flex items-center justify-center rounded-full w-7 h-7 shrink-0 bg-sroom-black-300'>
          <span className='text-sm font-semibold text-sroom-white'>
            {indexNum}
          </span>
        </div>
        <div className='text-sm font-semibold text-sroom-black-300 line-clamp-2'>
          <p>{lecture_title}</p>
        </div>
      </div>
      {is_members_only && (
        <span className='absolute -translate-y-1/2 -top-1 left-2 w-7'>
          <CrownSVG />
        </span>
      )}
      <div className='text-xs text-sroom-black-200'>
        <p>{getCompactFormattedTime(duration)}</p>
      </div>
    </li>
  );
}
