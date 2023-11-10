'use client';
import { updateViewDuration } from '@/src/api/lectures/time';
import { QueryKeys } from '@/src/api/queryKeys';
import { SessionStorageKeys } from '@/src/constants/courseTaking/courseTaking';
import { ONE_MINUTE_IN_MS, ONE_SECOND_IN_MS } from '@/src/constants/time/time';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { memo, useCallback, useEffect, useRef } from 'react';
import YouTube, { YouTubeEvent } from 'react-youtube';
import PlayerStates from 'youtube-player/dist/constants/PlayerStates';
import { Options, YouTubePlayer } from 'youtube-player/dist/types';

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
  playerRef: React.MutableRefObject<YouTubePlayer | null>;
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
  currentIntervalID,
  playerRef
}: Props) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  isCompleted = is_completed;
  const currentRevalidateID = useRef<NodeJS.Timer | null>(null);

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
        if (data) {
          sessionStorage.setItem(
            `${SessionStorageKeys.VIEW_DURATION}-${course_video_id}`,
            `${data.view_duration}`
          );
          if (data.is_completed === true && isCompleted === false) {
            isCompleted = true;
            revalidateCourseDetail();
          }
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

  const clearRevalidateID = useCallback(() => {
    if (currentRevalidateID.current !== null) {
      clearInterval(currentRevalidateID.current);
      currentRevalidateID.current = null;
    }
  }, [currentRevalidateID]);

  function updateViewDurationOnlyOnce(currentTime: number) {
    viewDuration.current = currentTime;
    silentUpdateViewDuration();
  }

  async function onPlayerStateChange(event: YouTubeEvent<number>) {
    const currentTime = Math.floor(await event.target.getCurrentTime());
    viewDuration.current = currentTime;
    const playbackRate = await event.target.getPlaybackRate();

    if (event.data === PlayerStates.PLAYING) {
      clearIntervalID();

      const intervalID = setInterval(() => {
        viewDuration.current += UPDATE_INTERVAL * playbackRate;
        mutate();
      }, UPDATE_INTERVAL_IN_MS);

      const revalidateID = setInterval(() => {
        revalidateCourseDetail();
      }, 2 * ONE_MINUTE_IN_MS);

      currentIntervalID.current = intervalID;
      currentRevalidateID.current = revalidateID;
    } else if (event.data === PlayerStates.PAUSED) {
      clearIntervalID();
      clearRevalidateID();
    } else if (event.data === PlayerStates.ENDED) {
      updateViewDurationOnlyOnce(currentTime);
      clearIntervalID();
      clearRevalidateID();
      revalidateCourseDetail();
    }
  }

  async function onPlaybackRateChange(event: YouTubeEvent<number>) {
    clearIntervalID();
    const currentTime = Math.floor(await event.target.getCurrentTime());
    viewDuration.current = currentTime;
    const playbackRate = await event.target.getPlaybackRate();

    const intervalID = setInterval(() => {
      viewDuration.current += UPDATE_INTERVAL * playbackRate;
      mutate();
    }, UPDATE_INTERVAL_IN_MS);
    currentIntervalID.current = intervalID;
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
    <div className='max-w-screen-xl px-5 mx-auto mb-5 lg:mb-10'>
      <YouTube
        id='youtube-player'
        opts={opts}
        key={videoId}
        videoId={videoId}
        className='relative pb-[56.25%] pt-0 h-0 w-full'
        iframeClassName='absolute top-0 left-0 w-full h-full'
        onReady={(event) => {
          playerRef.current = event.target;
        }}
        onStateChange={async (event) => {
          onPlayerStateChange(event);
        }}
        onPlaybackRateChange={async (event) => {
          onPlaybackRateChange(event);
        }}
      />
    </div>
  );
};

export default memo(YoutubePlayer, areEqual);

function areEqual(prevProps: Props, nextProps: Props) {
  return prevProps.course_video_id === nextProps.course_video_id;
}
