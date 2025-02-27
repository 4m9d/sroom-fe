'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { ArrowRightSVG } from '@/public/icons/icons';
import { updateViewDuration } from '@/src/api/lectures/time';
import { QueryKeys } from '@/src/api/queryKeys';
import setVideoCompleteToast from '@/src/util/toast/setVideoCompleteToast';
import Button from '../ui/button/Button';

type Props = {
  course_id: number;
  course_video_id: number;
  is_completed: boolean;
  viewDuration: React.MutableRefObject<number>;
  prevPlayingVideo: LastViewVideo | null;
  nextPlayingVideo: LastViewVideo | null;
  currentIntervalID: React.MutableRefObject<NodeJS.Timer | null>;
};

export default function CourseVideoController({
  course_id,
  course_video_id,
  is_completed,
  viewDuration,
  prevPlayingVideo,
  nextPlayingVideo,
  currentIntervalID
}: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isCompleted, setIsCompleted] = useState(is_completed);

  const updateIsCompletedManually = async () => {
    setIsCompleted(true);
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
        setVideoCompleteToast(course_video_id);
        data && setIsCompleted(data.is_completed);

        if (currentIntervalID.current !== null) {
          clearInterval(currentIntervalID.current);
          currentIntervalID.current = null;
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

  useLayoutEffect(() => {
    setIsCompleted(is_completed);
  }, [course_video_id, is_completed]);

  return (
    <div className='flex flex-col items-center justify-center max-w-screen-lg gap-1 mx-auto my-2 md:flex-row md:gap-3 lg:my-5 lg:px-10 shrink-0'>
      <Button
        hoverEffect={true}
        onClick={() => controllerClickHandler('prev')}
        disabled={prevPlayingVideo === null}
        id='prev-controller'
        className={`w-24 md:w-28 lg:w-32 xl:w-36 flex justify-between items-center font-bold text-base lg:text-lg ${
          prevPlayingVideo === null ? 'opacity-30' : ''
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
        className={`w-24 md:w-28 lg:w-32 xl:w-36 flex justify-center items-center font-bold text-base lg:text-lg ${
          isCompleted === true ? 'opacity-30' : ''
        }`}
      >
        <div className='whitespace-nowrap'>완료하기</div>
      </Button>
      <Button
        hoverEffect={true}
        onClick={() => controllerClickHandler('next')}
        disabled={nextPlayingVideo === null}
        id='next-controller'
        className={`w-24 md:w-28 lg:w-32 xl:w-36 flex justify-between items-center font-bold text-base lg:text-lg ${
          nextPlayingVideo === null ? 'opacity-30' : ''
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
