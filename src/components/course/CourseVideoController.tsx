'use client';
import { useRouter } from 'next/navigation';
import Button from '../ui/button/Button';
import ArrowRightSVG from '@/public/icon/ArrowRight';
import { useCallback, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QueryKeys } from '@/src/api/queryKeys';
import { updateViewDuration } from '@/src/api/lectures/time';

type Props = {
  course_id: number;
  course_video_id: number;
  is_completed: boolean;
  viewDuration: React.MutableRefObject<number>;
  prevPlayingVideo: LastViewVideo | null;
  nextPlayingVideo: LastViewVideo | null;
  currentIntervalID: NodeJS.Timer | null;
  setCurrentIntervalID: React.Dispatch<
    React.SetStateAction<NodeJS.Timer | null>
  >;
};
let isCompleted = false;

export default function CourseVideoController({
  course_id,
  course_video_id,
  is_completed,
  viewDuration,
  prevPlayingVideo,
  nextPlayingVideo,
  currentIntervalID,
  setCurrentIntervalID
}: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();

  isCompleted = is_completed;

  const updateIsCompletedManually = async () => {
    isCompleted = true;
    const response = await updateViewDuration(
      {
        course_video_id,
        view_duration: viewDuration.current
      },
      true
    );

    return response;
  };

  const { mutate, status } = useMutation(
    [QueryKeys.COURSE_TAKING],
    updateIsCompletedManually,
    {
      onSuccess: (data) => {
        isCompleted = data.is_completed;
        if (currentIntervalID !== null) {
          clearInterval(currentIntervalID);
          setCurrentIntervalID(null);
        }
        queryClient.invalidateQueries([
          QueryKeys.COURSE_DETAIL,
          course_id.toString()
        ]);
      }
    }
  );

  const prevVideoRoute = `/course/${course_id}?courseVideoId=${prevPlayingVideo?.course_video_id}`;
  const nextVideoRoute = `/course/${course_id}?courseVideoId=${nextPlayingVideo?.course_video_id}`;

  const controllerClickHandler = (type: 'prev' | 'next') => {
    if (type === 'prev' && prevPlayingVideo !== null) {
      router.push(prevVideoRoute);
    }
    if (type === 'next' && nextPlayingVideo !== null) {
      router.push(nextVideoRoute);
    }
  };

  const prefetchPrevAndNextVideo = useCallback(() => {
    if (prevPlayingVideo !== null) {
      router.prefetch(prevVideoRoute);
    }
    if (nextPlayingVideo !== null) {
      router.prefetch(nextVideoRoute);
    }
  }, [
    prevVideoRoute,
    nextVideoRoute,
    prevPlayingVideo,
    nextPlayingVideo,
    router
  ]);

  useEffect(() => {
    prefetchPrevAndNextVideo();
  }, [prefetchPrevAndNextVideo]);

  return (
    <div className='flex flex-wrap justify-center max-w-screen-lg gap-1 mx-auto my-2 md:gap-3 lg:my-5 lg:px-28 shrink-0'>
      <Button
        hoverEffect={true}
        onClick={() => controllerClickHandler('prev')}
        disabled={prevPlayingVideo === null}
        id='prev-controller'
        className={`w-28 md:w-32 lg:w-36 flex justify-between items-center font-bold text-lg lg:text-xl ${
          prevPlayingVideo === null ? 'opacity-50 hover:opacity-50' : ''
        }`}
      >
        <span className='w-3 rotate-180 lg:w-4 fill-sroom-black-400 stroke-sroom-black-400'>
          <ArrowRightSVG />
        </span>
        <div className='whitespace-nowrap'>이전 강의</div>
      </Button>
      <Button
        hoverEffect={true}
        onClick={mutate}
        disabled={isCompleted === true || status === 'loading'}
        id='completion-controller'
        className={`w-28 md:w-32 lg:w-36 flex justify-center items-center font-bold text-lg lg:text-xl ${
          isCompleted === true ? 'opacity-50 hover:opacity-50' : ''
        }`}
      >
        <div className='whitespace-nowrap'>봤어요</div>
      </Button>
      <Button
        hoverEffect={true}
        onClick={() => controllerClickHandler('next')}
        disabled={nextPlayingVideo === null}
        id='next-controller'
        className={`w-28 md:w-32 lg:w-36 flex justify-between items-center font-bold text-lg lg:text-xl ${
          nextPlayingVideo === null ? 'opacity-50 hover:opacity-50' : ''
        }`}
      >
        <div className='whitespace-nowrap'>다음 강의</div>
        <span className='w-3 lg:w-4 fill-sroom-black-400 stroke-sroom-black-400'>
          <ArrowRightSVG />
        </span>
      </Button>
    </div>
  );
}
