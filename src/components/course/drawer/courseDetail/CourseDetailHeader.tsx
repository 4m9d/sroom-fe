import ProgressBar from '@/src/components/ui/ProgressBar';
import convertSecondsToMinutes from '@/src/util/day/convertSecondsToMinutes';
import getFormattedHour from '@/src/util/day/getFormattedHour';
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
    <section className='flex flex-col gap-3 px-5 pt-5 after:w-full after:h-[1px] after:bg-zinc-200 after:my-[30px]'>
      <div className='relative w-full h-[calc((19rem-2.5rem)*0.5625)] px-5'>
        <Image fill={true} sizes='100%' src={thumbnail} alt={course_title} />
      </div>
      <h2 className='text-lg font-bold'>{course_title}</h2>
      <h3 className='text-sm font-normal whitespace-normal text-zinc-500 line-clamp-1'>
        {channels}
      </h3>
      <h4 className='flex text-sm font-normal text-zinc-400'>
        <span className='after:w-[1px] after:h-[10px] after:bg-zinc-400 after:mx-2 after:inline-block after:text-center after:align-middle'>
          {`총 재생 시간 : ${getFormattedHour(
            convertSecondsToMinutes(course_duration)
          )}`}
        </span>
        <span>{`영상 ${total_video_count}개`}</span>
      </h4>
      <ProgressBar value={progress} className='bg-zinc-100' />
      <h5 className='text-xs font-normal text-zinc-400'>
        {`수강 시간 : ${getFormattedHour(
          convertSecondsToMinutes(current_duration)
        )} (진도율 : ${progress}%)`}
      </h5>
    </section>
  );
}
