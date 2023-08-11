'use client';
import YouTube from 'react-youtube';
import { Options } from 'youtube-player/dist/types';

type Props = {
  width: number | string;
  height: number | string;
  video_code: string;
  start: number;
  onEnd: () => void;
  end?: number;
};

export default function YoutubePlayer({
  width,
  height,
  video_code: videoId,
  start,
  end,
  onEnd
}: Props) {
  const opts: Options = {
    width,
    height,
    playerVars: {
      start,
      end
    }
  };

  return (
    <div className='mx-auto mb-10 px-[10%]'>
      <YouTube
        opts={opts}
        videoId={videoId}
        className='text-center relative pb-[56.25%] pt-0 h-0 w-full overflow-hidden'
        iframeClassName='absolute top-0 left-0 w-full h-full'
        onEnd={onEnd}
      />
    </div>
  );
}
