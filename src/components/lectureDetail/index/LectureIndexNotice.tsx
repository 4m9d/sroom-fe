import convertSecondsToMinutes from '@/src/util/time/convertSecondsToMinutes';
import getFormattedTime from '@/src/util/time/getFormattedTime';
import React from 'react';

type Props = {
  duration: number;
  lecture_count: number;
};

export default function LectureIndexNotice({ duration, lecture_count }: Props) {
  return (
    <div className='flex items-center justify-start w-full gap-5 px-5 py-2 mb-10 text-xs font-medium rounded-sm md:gap-10 md:px-10 md:text-sm min-h-[3.5rem] max-h-[5rem] bg-sroom-black-300 text-sroom-gray-400'>
      <div className='text-base md:text-xl'>📌</div>
      <div className='flex flex-col w-full gap-2'>
        <div>
          •
          <span className='pl-2 pr-1 text-base font-semibold md:text-lg text-sroom-white'>
            {getFormattedTime(convertSecondsToMinutes(duration))}
          </span>
          분량
        </div>
        <div>
          •
          <span className='pl-2 pr-1 text-base font-semibold md:text-lg text-sroom-white'>
            {lecture_count}
          </span>
          개의 영상
        </div>
      </div>
    </div>
  );
}
