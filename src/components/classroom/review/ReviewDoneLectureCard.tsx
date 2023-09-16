import ClockSVG from '@/public/icon/Clock';
import HorizontalSmallLectureCard from '../../ui/lectureCard/HorizontalSmallLectureCard';
import getFormattedTime from '@/src/util/time/getFormattedTime';
import convertSecondsToMinutes from '@/src/util/time/convertSecondsToMinutes';
import LectureSVG from '@/public/icon/Lecture';
import ProgressBar from '../../ui/progress/ProgressBar';
import getCompactDateFormat from '@/src/util/day/getCompactFormattedDate';

type Props = { reviewableLecture: ReviewableLecture };

export default function ReviewDoneLectureCard({ reviewableLecture }: Props) {
  return (
    <div className='flex flex-col items-center justify-start w-full border border-sroom-gray-400'>
      <HorizontalSmallLectureCard
        src={reviewableLecture.thumbnail}
        alt={reviewableLecture.title}
        border={false}
      >
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
              <div className='flex flex-row items-start text-xs text-sroom-black-100 shrink-0 break-keep'>
                <div className='flex items-center justify-center'>
                  <span className='w-3 mr-1 stroke-sroom-black-100'>
                    <ClockSVG />
                  </span>
                  {getFormattedTime(
                    convertSecondsToMinutes(reviewableLecture.view_duration)
                  )}
                  <span className='w-[1px] h-[10px] bg-sroom-black-100 mx-2 inline-block text-center align-middle' />
                </div>
                <div className='flex items-center justify-center'>
                  <span className='w-3 mr-1 align-middle stroke-sroom-black-100'>
                    <LectureSVG />
                  </span>
                  {reviewableLecture.completed_video_count.toLocaleString()}개
                  <span>/</span>
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
          </div>
        </div>
      </HorizontalSmallLectureCard>
      <div className='w-full p-3 text-sm whitespace-pre-wrap text-sroom-black-200'>
        <p className='overflow-auto'>{reviewableLecture.content}</p>
        <p className='mt-3 text-xs text-right'>
          {getCompactDateFormat(reviewableLecture.submitted_at)}
        </p>
      </div>
    </div>
  );
}
