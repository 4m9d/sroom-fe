'use client';
import Link from 'next/link';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { PolygonSVG } from '@/public/icons/icons';
import VideoCompletionBadge from '@/src/components/ui/badge/VideoCompletionBadge';
import convertSecondsToMinutes from '@/src/util/time/convertSecondsToMinutes';
import getCompactFormattedDuration from '@/src/util/time/getCompactFormattedTime';
import getFormattedTime from '@/src/util/time/getFormattedTime';

type Props = {
  section: Section;
  use_schedule: boolean;
  course_id: number;
  course_title: string;
  currentPlayingVideo: LastViewVideo;
};

export default function SectionAccordion({
  section,
  use_schedule,
  course_id,
  course_title,
  currentPlayingVideo
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const currentPlayingVideoTabRef = useRef<HTMLAnchorElement>(null);

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

  useLayoutEffect(() => {
    section.videos.map((video) => {
      if (video.course_video_id === currentPlayingVideo.course_video_id) {
        setIsOpen(true);
      }
    });
  }, [currentPlayingVideo, section]);

  useEffect(() => {
    if (
      currentPlayingVideoTabRef.current &&
      currentPlayingVideo.course_video_id.toString() ===
        currentPlayingVideoTabRef.current.id
    ) {
      currentPlayingVideoTabRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }, [currentPlayingVideo.course_video_id]);

  return (
    <li
      className={`collapse ${
        isOpen === true ? 'collapse-open' : ''
      } cursor-pointer rounded-none text-sroom-black-400 bg-sroom-white`}
    >
      <div
        onClick={toggleAccordion}
        className={`flex justify-between px-5 py-4 collapse-title ${
          isOpen === true
            ? 'bg-sroom-gray-200 border-l-[3px] border-l-sroom-black-400'
            : ''
        }`}
      >
        <h3 className='flex flex-col pr-1'>
          <p className='text-sm font-bold break-all whitespace-normal line-clamp-1'>
            {use_schedule ? `${index}주차` : `${course_title}`}
          </p>
          <div className='flex h-[17px] items-center gap-2'>
            <p className='text-xs font-normal text-sroom-black-200'>
              {`${getFormattedTime(
                convertSecondsToMinutes(current_week_duration),
                true
              )} / ${getFormattedTime(
                convertSecondsToMinutes(week_duration),
                true
              )}`}{' '}
            </p>
            {is_completed && <VideoCompletionBadge />}
          </div>
        </h3>
        <span
          className={`${
            isOpen === true ? 'rotate-180' : 'rotate-0'
          } w-[10px] h-[10px] fill-sroom-black-400 mr-2 transition-all shrink-0 mt-1`}
        >
          <PolygonSVG />
        </span>
      </div>
      <div className='px-2 collapse-content'>
        {isOpen === true && (
          <div className='flex flex-col gap-1 py-6'>
            {videos.map((video) => (
              <Link
                id={video.course_video_id.toString()}
                ref={currentPlayingVideoTabRef}
                href={{
                  pathname: `/course/${course_id}/`,
                  query: { courseVideoId: video.course_video_id }
                }}
                key={video.course_video_id}
                className='flex items-center justify-between h-[17px] px-3 py-3 hover:bg-sroom-gray-200 hover:opacity-80 rounded-sm hover:scale-105 transition-all gap-1'
              >
                <div
                  className={`flex items-center justify-between w-full gap-1 ${
                    currentPlayingVideo.course_video_id ===
                    video.course_video_id
                      ? 'text-sroom-brand before:bg-sroom-brand font-medium'
                      : 'before:bg-sroom-black-200'
                  } ${
                    video.is_completed === true
                      ? 'text-sroom-black-200'
                      : 'text-sroom-black-400'
                  }`}
                >
                  <p
                    className={`w-5/6 text-start font-medium text-xs whitespace-normal line-clamp-1 break-all before:w-[2px] before:h-[2px] before:mr-1 before:inline-block before:align-middle`}
                  >
                    {video.video_title}
                  </p>
                  <p className='w-1/6 text-xs font-normal text-center shrink-0'>
                    {getCompactFormattedDuration(video.video_duration)}
                  </p>
                </div>
                {video.is_completed === true && <VideoCompletionBadge />}
              </Link>
            ))}
          </div>
        )}
      </div>
    </li>
  );
}
