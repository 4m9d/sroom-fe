'use client';
import YouTube from 'react-youtube';
import { Options } from 'youtube-player/dist/types';

type Props = {
  width: number | string;
  height: number | string;
  video_code: string;
  start: number;
  end?: number;
};

export default function YoutubePlayer({
  width,
  height,
  video_code: videoId,
  start,
  end
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
    <div className='px-20 mx-auto mb-20'>
      <YouTube
        opts={opts}
        videoId={videoId}
        className='text-center relative pb-[56.25%] pt-0 h-0 w-full overflow-hidden'
        iframeClassName='absolute top-0 left-0 w-full h-full'
      />
    </div>
  );
}
