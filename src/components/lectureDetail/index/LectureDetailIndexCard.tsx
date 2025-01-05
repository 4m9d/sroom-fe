'use client';
import Image from 'next/image';
import React from 'react';
import { CrownSVG } from '@/public/icons/icons';
import { BadgeType } from '@/src/constants/badge/badge';
import getCompactFormattedTime from '@/src/util/time/getCompactFormattedTime';
import ThumbnailBadge from '../../ui/badge/ThumbnailBadge';

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
        is_members_only
          ? 'border-sroom-black-300 border-2 rounded-sm'
          : 'border-sroom-gray-400'
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
        <div className='flex items-center gap-2'>
          <div className='flex items-center justify-center rounded-full w-7 h-7 shrink-0 bg-sroom-black-300'>
            <span className='text-sm font-semibold text-sroom-white'>
              {indexNum}
            </span>
          </div>
          {is_members_only && (
            <ThumbnailBadge
              title={BadgeType.MEMBERS_ONLY}
              className='bg-sroom-black-400'
            />
          )}
        </div>
        <div className='text-sm font-semibold break-all text-sroom-black-300 line-clamp-2'>
          <p>{lecture_title}</p>
        </div>
      </div>
      <div className='text-xs text-sroom-black-200'>
        <p>{getCompactFormattedTime(duration)}</p>
      </div>
    </li>
  );
}
