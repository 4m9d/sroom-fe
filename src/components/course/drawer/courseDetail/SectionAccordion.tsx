import VideoCompletionBadge from '@/src/components/ui/badge/VideoCompletionBadge';
import getFormattedHour from '@/src/util/day/getFormattedHour';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

type Props = {
  section: Section;
  use_schedule: boolean;
  course_title: string;
};

export default function SectionAccordion({
  section,
  use_schedule,
  course_title
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const {
    section: index,
    current_week_duration,
    is_completed,
    videos,
    week_duration
  } = section;

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`collapse ${
        isOpen === true ? 'collapse-open' : ''
      } cursor-pointer rounded-none bg-white`}
    >
      <div
        onClick={toggleAccordion}
        className={`flex justify-between px-5 py-4 collapse-title ${
          isOpen === true ? 'bg-zinc-100 border-l-[3px] border-l-black' : ''
        }`}
      >
        <h3 className='flex flex-col'>
          <p className='text-sm font-bold whitespace-normal line-clamp-1'>
            {use_schedule ? `${index}주차` : `${course_title}`}
          </p>
          <div className='flex h-[17px] items-center gap-2'>
            <p className='text-xs font-normal text-zinc-500'>
              {`${getFormattedHour(current_week_duration)} / ${getFormattedHour(
                week_duration
              )}`}{' '}
            </p>
            {is_completed && <VideoCompletionBadge />}
          </div>
        </h3>
        <Image
          src={'/icon/icon_polygon_black.svg'}
          className={`${
            isOpen === true ? 'rotate-180' : 'rotate-0'
          } mr-2 transition-all`}
          alt='화살표'
          width={10}
          height={8}
          aria-hidden
        />
      </div>
      <div className='collapse-content'>
        {isOpen === true && (
          <div className='flex flex-col gap-3 py-6'>
            {videos.map((video) => (
              <button
                type='button'
                key={video.video_id}
                className='flex items-center justify-between group h-[17px]'
              >
                <p className='w-5/6 text-start text-xs font-semibold whitespace-normal text-zinc-500 line-clamp-1 before:w-[2px] before:h-[2px] before:bg-zinc-500 before:mr-1 before:inline-block before:align-middle group-focus:text-orange-500 group-focus:before:bg-orange-500'>
                  {video.video_title}
                </p>
                {video.is_completed === true && <VideoCompletionBadge />}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}