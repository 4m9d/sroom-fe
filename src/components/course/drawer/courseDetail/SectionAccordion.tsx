'use client';
import VideoCompletionBadge from '@/src/components/ui/badge/VideoCompletionBadge';
import convertSecondsToMinutes from '@/src/util/time/convertSecondsToMinutes';
import getFormattedTime from '@/src/util/time/getFormattedTime';
import Image from 'next/image';
import { Dispatch, SetStateAction, useLayoutEffect, useState } from 'react';

type Props = {
  section: Section;
  use_schedule: boolean;
  course_title: string;
  currentPlayingVideo: LastViewVideo;
  setCurrentPlayingVideo: Dispatch<SetStateAction<LastViewVideo>>;
};

export default function SectionAccordion({
  section,
  use_schedule,
  course_title,
  currentPlayingVideo,
  setCurrentPlayingVideo
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

  const videoClickHandler = (video: Video) => {
    const clickedVideo: LastViewVideo = {
      video_code: video.video_code,
      video_id: video.video_id,
      last_view_duration: video.last_view_duration,
      channel: video.channel,
      video_title: video.video_title
    };

    setCurrentPlayingVideo(() => clickedVideo);
  };

  useLayoutEffect(() => {
    section.videos.map((video) => {
      if (video.video_id === currentPlayingVideo.video_id) {
        setIsOpen(true);
      }
    });
  }, [currentPlayingVideo, section]);

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
              {`${getFormattedTime(
                convertSecondsToMinutes(current_week_duration)
              )} / ${getFormattedTime(
                convertSecondsToMinutes(week_duration)
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
      <div className='px-2 collapse-content'>
        {isOpen === true && (
          <div className='flex flex-col gap-1 py-6'>
            {videos.map((video) => (
              <button
                type='button'
                onClick={() => videoClickHandler(video)}
                key={video.video_id}
                className='flex items-center justify-between h-[17px] px-3 py-3 hover:bg-zinc-100 hover:opacity-90 rounded-sm'
              >
                <p
                  className={`w-5/6 text-start text-xs font-semibold whitespace-normal line-clamp-1 before:w-[2px] before:h-[2px]  before:mr-1 before:inline-block before:align-middle ${
                    currentPlayingVideo.video_id === video.video_id
                      ? 'text-orange-500 before:bg-orange-500'
                      : 'text-zinc-500 before:bg-zinc-500'
                  } `}
                >
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
