import ProgressBar from '../../ui/ProgressBar';
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
      <div className='flex flex-col justify-between h-full text-sroom-black-400'>
        <div className='mt-1'>
          <p className='text-lg font-bold whitespace-normal line-clamp-2'>
            {course.course_title}
          </p>
          <p className='mt-2 text-sm whitespace-normal text-sroom-black-300 line-clamp-1'>
            {course.channels}
          </p>
        </div>
        <div className='flex justify-between gap-5 mb-1 min-h-10 shrink-0'>
          <div className='flex-col justify-between flex-1 hidden gap-1 py-1 sm:flex shrink-0'>
            <p className='flex text-xs text-sroom-black-100 shrink-0'>
              <span className='w-3 mr-1 stroke-sroom-black-100'>
                <ClockSVG />
              </span>
              {getFormattedTime(convertSecondsToMinutes(course.duration))}
              <span className='after:w-[1px] after:h-[10px] after:bg-sroom-black-100 after:mx-2 after:inline-block after:text-center after:align-middle'></span>
              <span className='w-3 mr-1 align-middle stroke-sroom-black-100'>
                <LectureSVG />
              </span>
              {course.completed_video_count.toLocaleString()}개<span>/</span>
              {course.total_video_count.toLocaleString()}개 완료
            </p>
            <div className='flex items-center shrink-0'>
              <ProgressBar
                className='w-full h-[4px] !bg-sroom-gray-300'
                value={course.progress}
              />
              <p className='ml-2 text-xs font-semibold text-sroom-brand shrink-0'>
                {course.progress}
                <span className='font-normal'>%</span>
              </p>
            </div>
          </div>
          <Link href={`/course/${course.course_id}`}>
            <Button className='!h-10 flex justify-between w-28 text-sm font-semibold text-sroom-white bg-sroom-black-400 shrink-0 gap-3'>
              <p>바로 학습</p>
              <span className='w-3 stroke-sroom-white'>
                <ArrowRightSVG />
              </span>
            </Button>
          </Link>
        </div>
      </div>
    </HorizontalSmallLectureCard>
  );
}
