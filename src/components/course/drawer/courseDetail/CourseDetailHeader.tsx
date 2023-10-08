import ProgressBar from '@/src/components/ui/progress/ProgressBar';
import convertSecondsToMinutes from '@/src/util/time/convertSecondsToMinutes';
import getFormattedTime from '@/src/util/time/getFormattedTime';
import Image from 'next/image';

type Props = {
  thumbnail: string;
  course_title: string;
  channels: string;
  course_duration: number;
  total_video_count: number;
  progress: number;
  current_duration: number;
};

export default function CourseDetailHeader({
  thumbnail,
  course_title,
  channels,
  course_duration,
  total_video_count,
  progress,
  current_duration
}: Props) {
  return (
    <section className='flex flex-col gap-3 px-5 pt-5 after:w-full after:h-[1px] after:bg-sroom-gray-500 after:my-[30px] text-sroom-black-400 max-h-[25rem]'>
      <div className='relative pb-[56.25%] pt-0 h-0 w-full'>
        <div className='absolute top-0 left-0 w-full h-full'>
          <Image fill={true} sizes='100%' src={thumbnail} alt={course_title} />
        </div>
      </div>
      <h2 className='text-base font-bold break-all whitespace-normal md:text-lg line-clamp-1'>
        {course_title}
      </h2>
      <h3 className='text-xs font-normal break-all whitespace-normal md:text-sm text-sroom-black-300 line-clamp-1'>
        {channels}
      </h3>
      <h4 className='flex flex-wrap text-xs font-normal md:text-sm text-sroom-black-200'>
        <span className='after:w-[1px] after:h-[9px] after:bg-sroom-black-100 after:mx-2 after:inline-block after:text-center after:align-middle'>
          {`총 재생 시간 : ${getFormattedTime(
            convertSecondsToMinutes(course_duration)
          )}`}
        </span>
        <span>{`영상 ${total_video_count}개`}</span>
      </h4>
      <ProgressBar value={progress} className='!bg-sroom-gray-400' />
      <h5 className='flex flex-wrap gap-1 text-xs font-normal text-sroom-black-100'>
        <span>
          {`수강 시간 : ${getFormattedTime(
            convertSecondsToMinutes(current_duration)
          )}`}
        </span>
        <span>{`(진도율 : ${progress}%)`}</span>
      </h5>
    </section>
  );
}
