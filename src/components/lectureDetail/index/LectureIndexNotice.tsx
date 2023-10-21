import convertSecondsToMinutes from '@/src/util/time/convertSecondsToMinutes';
import getFormattedTime from '@/src/util/time/getFormattedTime';
import React from 'react';

type Props = {
  duration: number;
  lecture_count: number;
  hasMembersOnly: boolean;
};

export default function LectureIndexNotice({
  duration,
  lecture_count,
  hasMembersOnly
}: Props) {
  return (
    <>
      <div className='flex items-center justify-start w-full gap-5 px-5 py-2 mb-10 text-xs font-medium rounded-sm md:gap-10 md:px-10 md:text-sm min-h-[3.5rem] max-h-[5rem] bg-sroom-black-300 text-sroom-gray-400'>
        <div className='text-base md:text-xl'>📌</div>
        <div className='flex flex-col w-full gap-2'>
          <div>
            •
            <span className='pl-2 pr-1 text-base font-semibold md:text-lg text-sroom-white'>
              {getFormattedTime(convertSecondsToMinutes(duration), true)}
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
      {hasMembersOnly && (
        <div className='flex items-center justify-start w-full gap-5 px-5 py-5 mb-10 text-xs font-medium rounded-sm md:gap-10 md:px-10 md:text-sm min-h-[3.5rem] max-h-[5rem] bg-sroom-gray-200 border border-sroom-gray-400 text-sroom-black-400'>
          <div className='text-base md:text-xl'>👑</div>
          <div className='flex flex-col w-full gap-1'>
            <div className='text-base font-bold md:text-lg'>
              회원 전용 강의가 포함되어 있어요!
            </div>
            <div className='text-sroom-black-300'>
              해당 채널의 멤버십에 가입하시면 모든 강의를 시청하실 수 있어요.
            </div>
          </div>
        </div>
      )}
    </>
  );
}
