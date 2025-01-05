'use client';
import { useRouter } from 'next/navigation';
import { ClockSVG } from '@/public/icons/icons';
import { LectureSVG } from '@/public/icons/icons';
import { showModalHandler } from '@/src/util/modal/modalHandler';
import convertSecondsToMinutes from '@/src/util/time/convertSecondsToMinutes';
import getFormattedTime from '@/src/util/time/getFormattedTime';
import setUndevelopedAlertToast from '@/src/util/toast/setUndevelopedAlertToast';
import Button from '../ui/button/Button';
import HorizontalSmallLectureCard from '../ui/lectureCard/HorizontalSmallLectureCard';
import ProgressBar from '../ui/progress/ProgressBar';

type Props = {
  course: Course;
  setSelectedCourseId: React.Dispatch<React.SetStateAction<number | null>>;
};

export default function ClassroomCourseCard({
  course,
  setSelectedCourseId
}: Props) {
  const router = useRouter();

  return (
    <HorizontalSmallLectureCard
      src={course.thumbnail}
      alt={course.course_title}
      onMouseOver={() => router.prefetch(`/course/${course.course_id}`)}
      onClick={() => router.push(`/course/${course.course_id}`)}
    >
      <Button
        onClick={() => {
          setSelectedCourseId(() => course.course_id);
          showModalHandler('COURSE_DELETE');
        }}
        hoverEffect={true}
        className='absolute top-0 right-0 text-xs font-normal text-sroom-black-100 !h-8'
      >
        ✕ 삭제
      </Button>
      <div className='flex flex-col justify-between h-full mt-1 text-sroom-black-400'>
        <div className='mt-1 max-w-[calc(100%-5rem)]'>
          <p className='text-sm font-bold break-all whitespace-normal line-clamp-1'>
            {course.course_title}
          </p>
          <p className='mt-1 text-xs break-all whitespace-normal text-sroom-black-300 line-clamp-1'>
            {course.channels}
          </p>
        </div>
        <div className='flex flex-col justify-center flex-1 gap-1 shrink-0'>
          <p className='flex mt-1 text-xs text-sroom-black-100 shrink-0'>
            <span className='w-3 mr-1 stroke-sroom-black-100'>
              <ClockSVG />
            </span>
            {getFormattedTime(convertSecondsToMinutes(course.duration), true)}
            <span className='after:w-[1px] after:h-[10px] after:bg-sroom-black-100 after:mx-2 after:inline-block after:text-center after:align-middle'></span>
            <span className='w-3 mr-1 align-middle stroke-sroom-black-100'>
              <LectureSVG />
            </span>
            {course.completed_video_count.toLocaleString()}개<span>/</span>
            {course.total_video_count.toLocaleString()}개 완료
          </p>
          <div className='flex items-center shrink-0'>
            <ProgressBar
              className='w-full h-[3.5px] !bg-sroom-gray-300'
              value={course.progress}
            />
            <p className='ml-2 text-xs font-semibold text-sroom-brand shrink-0'>
              {course.progress}
              <span className='font-normal'>%</span>
            </p>
          </div>
        </div>
        <div className='flex items-center justify-evenly'>
          <Button
            onClick={() => setUndevelopedAlertToast('scrap')}
            hoverEffect={true}
            className='!h-8 text-xs max-w-[9rem]'
          >
            <p>오답 노트</p>
          </Button>
          <Button
            onClick={() => {
              setSelectedCourseId(() => course.course_id);
              showModalHandler('MATERIAL_EXPORT');
            }}
            hoverEffect={true}
            className='!h-8 text-xs max-w-[9rem]'
          >
            <p>내보내기</p>
          </Button>
          <Button
            onClick={() => {
              setSelectedCourseId(() => course.course_id);
              showModalHandler('LECTURE_REVIEW');
            }}
            hoverEffect={true}
            className='!h-8 text-xs max-w-[9rem]'
          >
            <p>후기･평점</p>
          </Button>
        </div>
      </div>
    </HorizontalSmallLectureCard>
  );
}
