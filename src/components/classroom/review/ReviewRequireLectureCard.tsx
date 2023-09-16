import ClockSVG from '@/public/icon/Clock';
import Button from '../../ui/button/Button';
import HorizontalSmallLectureCard from '../../ui/lectureCard/HorizontalSmallLectureCard';
import getFormattedTime from '@/src/util/time/getFormattedTime';
import convertSecondsToMinutes from '@/src/util/time/convertSecondsToMinutes';
import LectureSVG from '@/public/icon/Lecture';
import ProgressBar from '../../ui/progress/ProgressBar';
import PencilSVG from '@/public/icon/Pencil';

type Props = {
  reviewableLecture: ReviewableLecture;
};

export default function ReviewRequireLectureCard({ reviewableLecture }: Props) {
  return (
    <HorizontalSmallLectureCard src={reviewableLecture.thumbnail} alt={reviewableLecture.title}>
      <div className='flex flex-col justify-around h-full text-sroom-black-400'>
        <div className='mt-1'>
          <p className='text-lg font-bold whitespace-normal line-clamp-2'>
            {reviewableLecture.title}
          </p>
          <p className='mt-2 text-sm whitespace-normal text-sroom-black-300 line-clamp-1'>
            {reviewableLecture.channel}
          </p>
        </div>
        <div className='flex justify-between mb-1 min-h-10 shrink-0'>
          <div className='flex-col justify-between flex-1 hidden gap-1 py-1 md:flex shrink-0'>
            <div className='flex flex-col items-start text-xs lg:flex-row text-sroom-black-100 shrink-0 break-keep'>
              <div className='flex items-center justify-center'>
                <span className='w-3 mr-1 stroke-sroom-black-100'>
                  <ClockSVG />
                </span>
                {getFormattedTime(
                  convertSecondsToMinutes(reviewableLecture.view_duration)
                )}
                <span className='hidden w-[1px] h-[10px] bg-sroom-black-100 mx-2 lg:inline-block text-center align-middle' />
              </div>
              <div className='flex items-center justify-center'>
                <span className='w-3 mr-1 align-middle stroke-sroom-black-100'>
                  <LectureSVG />
                </span>
                {reviewableLecture.completed_video_count.toLocaleString()}개<span>/</span>
                {reviewableLecture.total_video_count.toLocaleString()}개 완료
              </div>
            </div>
            <div className='flex items-center shrink-0'>
              <ProgressBar
                className='w-full h-[4px] !bg-sroom-gray-300'
                value={reviewableLecture.progress}
              />
              <p className='ml-2 text-xs font-semibold text-sroom-brand shrink-0'>
                {reviewableLecture.progress}
                <span className='font-normal'>%</span>
              </p>
            </div>
          </div>
          <div className='flex items-center justify-center flex-1 shrink-0 w-1/5 max-w-[10rem]'>
            <Button className='!h-10 flex justify-between w-24 md:w-28 font-semibold text-sroom-black-400 bg-sroom-gray-400 shrink-0'>
              <span className='w-3 stroke-sroom-black-400'>
                <PencilSVG />
              </span>
              <p>작성하기</p>
            </Button>
          </div>
        </div>
      </div>
    </HorizontalSmallLectureCard>
  );
}
