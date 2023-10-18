import ProgressBar from '../../ui/progress/ProgressBar';
import HorizontalSmallLectureCard from '../../ui/lectureCard/HorizontalSmallLectureCard';
import Button from '../../ui/button/Button';
import getFormattedTime from '@/src/util/time/getFormattedTime';
import convertSecondsToMinutes from '@/src/util/time/convertSecondsToMinutes';
import Link from 'next/link';
import ClockSVG from '@/public/icon/Clock';
import LectureSVG from '@/public/icon/Lecture';
import ArrowRightSVG from '@/public/icon/ArrowRight';

type Props = {
  course: Course;
};

export default function LatestLearningCourseCard({ course }: Props) {
  return (
    <HorizontalSmallLectureCard
      src={course.thumbnail}
      alt={course.course_title}
    >
      <div className='flex flex-col justify-between h-[7.5rem] text-sroom-black-400'>
        <div className='mt-1'>
          <p className='text-base font-bold break-all whitespace-normal line-clamp-1'>
            {course.course_title}
          </p>
          <p className='w-3/4 mt-1 text-sm break-all whitespace-normal text-sroom-black-300 line-clamp-1'>
            {course.channels}
          </p>
        </div>
        <div className='flex flex-col shrink-0'>
          <div className='flex items-center flex-1 gap-1 shrink-0'>
            <p className='flex mb-2 text-xs break-keep text-sroom-black-100 shrink-0'>
              <span className='w-3 mr-1 stroke-sroom-black-100'>
                <ClockSVG />
              </span>
              {getFormattedTime(convertSecondsToMinutes(course.duration))}
              <span className='after:w-[1px] after:h-[10px] after:bg-sroom-black-100 after:mx-2 after:inline-block after:text-center after:align-middle'></span>
              <span className='w-3 mr-1 align-middle stroke-sroom-black-100'>
                <LectureSVG />
              </span>
              {course.completed_video_count.toLocaleString()}개<span>/</span>
              {course.total_video_count.toLocaleString()}개
            </p>
          </div>
          <div className='flex w-full gap-5'>
            <div className='flex items-center flex-1 shrink-0'>
              <ProgressBar
                className='w-full h-[4px] !bg-sroom-gray-300'
                value={course.progress}
              />
              <p className='ml-2 text-xs font-semibold text-sroom-brand shrink-0'>
                {course.progress}
                <span className='font-normal'>%</span>
              </p>
            </div>
            <Link href={`/course/${course.course_id}`}>
              <Button className='!h-9 px-3 flex justify-around w-26 text-xs font-semibold text-sroom-white bg-sroom-black-400 shrink-0 gap-3'>
                <p>바로 학습</p>
                <span className='w-3 stroke-sroom-white'>
                  <ArrowRightSVG />
                </span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </HorizontalSmallLectureCard>
  );
}
