'use client';
import YouTube from 'react-youtube';
import { Options } from 'youtube-player/dist/types';

type Props = {
  width: number;
  height: number;
  video_code: string;
  start: number;
  end?: number;
  className?: string;
  iframeClassName?: string;
};

export default function YoutubePlayer({
  width,
  height,
  video_code: videoId,
  start,
  end,
  className,
  iframeClassName
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
    <YouTube
      opts={opts}
      videoId={videoId}
      className={className}
      iframeClassName={iframeClassName}
    />
  );
}
