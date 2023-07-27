import React from 'react'
import ProgressBar from '../../ui/ProgressBar';
import HorizontalSmallLectureCard from '../../ui/lectureCard/HorizontalSmallLectureCard';
import getRelativeTime from '@/src/util/day/getRelativeTime';
import Button from '../../ui/Button';

type Props = {
  lecture: LatestLearningLecture;
}

export default function LatestLearningLectureCard({lecture}: Props) {
  return (
    <HorizontalSmallLectureCard
      src={lecture.thumbnail}
      alt={lecture.course_title}
    >
      <div className='flex flex-col justify-between h-full'>
        <div className='mt-2'>
          <p className='text-lg font-bold line-clamp-2'>
            {lecture.course_title}
          </p>
          <p className='text-sm font-semibold text-zinc-500 line-clamp-1'>
            {lecture.channel}
          </p>
        </div>
        <div className='flex justify-between h-12 gap-5 mb-1'>
          <div className='flex flex-col justify-between flex-1 py-1'>
            <p className='text-xs text-zinc-500'>
              총 강의 시간 : {lecture.course_duration}분 |{' '}
              {getRelativeTime(lecture.last_view_time)}
            </p>
            <ProgressBar
              className='w-full h-[5px] bg-zinc-100'
              value={lecture.progress}
            />
          </div>
          <Button className='flex justify-between w-32 text-zinc-200 bg-zinc-800'>
            <p>바로 학습</p>
            <p> 〉 </p>
          </Button>
        </div>
      </div>
    </HorizontalSmallLectureCard>
  );
}