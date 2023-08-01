import React from 'react';
import ProgressBar from '../../ui/ProgressBar';
import HorizontalSmallLectureCard from '../../ui/lectureCard/HorizontalSmallLectureCard';
import Button from '../../ui/button/Button';

type Props = {
  course: Course;
};

export default function LatestLearningCourseCard({ course }: Props) {
  return (
    <HorizontalSmallLectureCard
      src={course.thumbnail}
      alt={course.course_title}
    >
      <div className='flex flex-col justify-between h-full'>
        <div className='mt-2'>
          <p className='text-lg font-bold whitespace-normal line-clamp-2'>
            {course.course_title}
          </p>
          <p className='text-sm font-semibold whitespace-normal text-zinc-500 line-clamp-1'>
            {course.channels}
          </p>
        </div>
        <div className='flex justify-between h-10 gap-5 mb-1'>
          <div className='flex flex-col justify-between flex-1 gap-1 py-1'>
            <p className='text-xs text-zinc-500'>
              총 강의 시간 : {course.duration.toLocaleString()}분 | 수강한 영상 :{' '}
              {course.completed_video_count.toLocaleString()}개 / {course.total_video_count.toLocaleString()}개
            </p>
            <div className='flex items-center'>
              <ProgressBar
                className='w-full h-[5px] bg-zinc-100'
                value={course.progress}
              />
              <p className='ml-2 text-xs font-semibold text-orange-500'>
                {course.progress}%
              </p>
            </div>
          </div>
          <Button className='flex justify-between w-32 text-sm text-zinc-200 bg-zinc-800'>
            <p>바로 학습</p>
            <p> 〉 </p>
          </Button>
        </div>
      </div>
    </HorizontalSmallLectureCard>
  );
}
