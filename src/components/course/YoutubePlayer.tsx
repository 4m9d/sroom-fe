'use client';
import { updateViewDuration } from '@/src/api/lectures/time';
import { QueryKeys } from '@/src/api/queryKeys';
import { ONE_SECOND_IN_MS } from '@/src/constants/time/time';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { memo, useCallback, useEffect } from 'react';
import YouTube, { YouTubeEvent } from 'react-youtube';
import PlayerStates from 'youtube-player/dist/constants/PlayerStates';
import { Options } from 'youtube-player/dist/types';

type Props = {
  width: number | string;
  height: number | string;
  course_video_id: number;
  course_id: number;
  video_code: string;
  start: number;
  end?: number;
  viewDuration: React.MutableRefObject<number>;
  is_completed: boolean;
  currentIntervalID: React.MutableRefObject<NodeJS.Timer | null>;
};

const UPDATE_INTERVAL = 10;
const UPDATE_INTERVAL_IN_MS = UPDATE_INTERVAL * ONE_SECOND_IN_MS;
let isCompleted = false;

const YoutubePlayer = ({
  width,
  height,
  course_video_id,
  course_id,
  video_code: videoId,
  start,
  end,
  viewDuration,
  is_completed,
  currentIntervalID
}: Props) => {
  const queryClient = useQueryClient();
  isCompleted = is_completed;

  const silentUpdateViewDuration = async () => {
    const response = await updateViewDuration({
      course_video_id,
      view_duration: viewDuration.current
    });

    return response;
  };

  const revalidateCourseDetail = () => {
    queryClient.invalidateQueries([
      QueryKeys.COURSE_DETAIL,
      course_id.toString()
    ]);
  };

  const { mutate } = useMutation(
    [QueryKeys.COURSE_TAKING],
    silentUpdateViewDuration,
    {
      onSuccess: (data) => {
        if (data.is_completed === true && isCompleted === false) {
          isCompleted = true;
          revalidateCourseDetail();
        }
      }
    }
  );

  const clearIntervalID = useCallback(() => {
    if (currentIntervalID.current !== null) {
      clearInterval(currentIntervalID.current);
      currentIntervalID.current = null;
    }
  }, [currentIntervalID]);

  function updateViewDurationOnlyOnce(currentTime: number) {
    viewDuration.current = currentTime;
    silentUpdateViewDuration();
  }

  async function onPlayerStateChange(event: YouTubeEvent<number>) {
    const currentTime = Math.floor(await event.target.getCurrentTime());
    viewDuration.current = currentTime;

    if (event.data === PlayerStates.PLAYING) {
      clearIntervalID();

      const intervalID = setInterval(() => {
        viewDuration.current += UPDATE_INTERVAL;
        mutate();
      }, UPDATE_INTERVAL_IN_MS);
      currentIntervalID.current = intervalID;
    } else if (event.data === PlayerStates.PAUSED) {
      clearIntervalID();
    } else if (event.data === PlayerStates.ENDED) {
      updateViewDurationOnlyOnce(currentTime);
      clearIntervalID();
      revalidateCourseDetail();
    }
  }

  useEffect(() => {
    return () => {
      clearIntervalID();
    };
  }, [clearIntervalID]);

  const opts: Options = {
    width,
    height,
    playerVars: {
      start,
      end,
      modestbranding: 1
    }
  };

  return (
    <div className='max-w-screen-lg px-5 mx-auto mb-5 lg:mb-10'>
      <YouTube
        opts={opts}
        key={videoId}
        videoId={videoId}
        className='relative pb-[56.25%] pt-0 h-0 w-full'
        iframeClassName='absolute top-0 left-0 w-full h-full'
        onStateChange={async (event) => {
          onPlayerStateChange(event);
        }}
      />
    </div>
  );
};

export default memo(YoutubePlayer, areEqual);

function areEqual(prevProps: Props, nextProps: Props) {
  return prevProps.course_video_id === nextProps.course_video_id;
}
