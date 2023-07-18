'use client';
import Image from 'next/image';
import React from 'react';

type Props = {
  lectureIndex: LectureIndex;
};

export default function LectureDetailIndexCard({ lectureIndex }: Props) {
  const { thumbnail, lecture_title, duration } = lectureIndex;
  return (
    <li className='flex items-center justify-between h-20 px-4 bg-zinc-50'>
      <div className='relative object-cover min-w-[calc(4rem*1.78)] h-full'>
        <Image fill={true} sizes='100%' src={thumbnail} alt={lecture_title} />
      </div>
      <div className='text-sm font-semibold'>{lecture_title}</div>
      <div className='text-sm'>{duration}</div>
    </li>
  );
}
