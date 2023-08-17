import React from 'react';
import ProgressBar from '../../ui/ProgressBar';
import HorizontalSmallLectureCard from '../../ui/lectureCard/HorizontalSmallLectureCard';
import Button from '../../ui/button/Button';
import getFormattedHour from '@/src/util/day/getFormattedHour';
import convertSecondsToMinutes from '@/src/util/day/convertSecondsToMinutes';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  course: Course;
};

export default function LatestLearningCourseCard({ course }: Props) {
  return (
    <HorizontalSmallLectureCard
      src={course.thumbnail}
      alt={course.course_title}
    >
      <div className='flex flex-col justify-between h-full text-sroom-black-400'>
        <div className='mt-1'>
          <p className='text-lg font-bold whitespace-normal line-clamp-2'>
            {course.course_title}
          </p>
          <p className='mt-2 text-sm whitespace-normal text-sroom-black-300 line-clamp-1'>
            {course.channels}
          </p>
        </div>
        <div className='flex justify-between h-10 gap-5 mb-1 shrink-0'>
          <div className='flex flex-col justify-between flex-1 gap-1 py-1 shrink-0'>
            <p className='flex flex-wrap text-xs text-sroom-black-100 shrink-0'>
              <Image
                className='w-auto h-auto mr-1'
                src={'/icon/icon_time.svg'}
                alt='총 재생 시간'
                width={12}
                height={12}
              />
              {getFormattedHour(convertSecondsToMinutes(course.duration))}
              <span className='after:w-[1px] after:h-[10px] after:bg-zinc-400 after:mx-2 after:inline-block after:text-center after:align-middle'></span>
              <Image
                className='w-auto h-auto mr-1'
                src={'/icon/icon_lecture.svg'}
                alt='수강한 영상'
                width={12}
                height={12}
              />
              {course.completed_video_count.toLocaleString()}개<span>/</span>
              {course.total_video_count.toLocaleString()}개 완료
            </p>
            <div className='flex items-center shrink-0'>
              <ProgressBar
                className='w-full h-[4px] bg-sroom-gray-300'
                value={course.progress}
              />
              <p className='ml-2 text-xs text-sroom-brand shrink-0'>
                {course.progress}%
              </p>
            </div>
          </div>
          <Link href={`/course/${course.course_id}`}>
            <Button className='!h-10 flex justify-between w-28 text-sm font-semibold text-sroom-white bg-sroom-black-400 shrink-0 gap-5'>
              <p>바로 학습</p>
              <p> 〉 </p>
            </Button>
          </Link>
        </div>
      </div>
    </HorizontalSmallLectureCard>
  );
}
