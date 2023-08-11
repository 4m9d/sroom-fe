'use client';
import { useCallback, useEffect, useState } from 'react';
import CourseHeader from './CourseHeader';
import YoutubePlayer from './YoutubePlayer';
import CourseDetailDrawer from './drawer/courseDetail/CourseDetailDrawer';
import CourseMaterialDrawer from './drawer/courseMaterial/CourseMaterialDrawer';
import PrevNextController from './PrevNextController';

type Props = {
  courseDetail: CourseDetail;
};

export default function CourseTaking({ courseDetail }: Props) {
  const { last_view_video } = courseDetail;
  const lastPlayingVideo: CurrentPlayingVideo = {
    video_id: last_view_video.video_id,
    video_code: last_view_video.video_code,
    last_view_duration: last_view_video.last_view_duration
  };
  const [currentPlayingVideo, setCurrentPlayingVideo] =
    useState<CurrentPlayingVideo>(lastPlayingVideo);
  const [prevPlayingVideo, setPrevPlayingVideo] =
    useState<CurrentPlayingVideo | null>(lastPlayingVideo);
  const [nextPlayingVideo, setNextPlayingVideo] =
    useState<CurrentPlayingVideo | null>(lastPlayingVideo);

  const searchPrevVideo = useCallback(() => {
    const videos = courseDetail.sections.flatMap((section) => section.videos);
    const currentPlayingVideoIdx = videos.findIndex((video) => {
      return video.video_id === currentPlayingVideo.video_id;
    });

    if (currentPlayingVideoIdx === 0) {
      setPrevPlayingVideo(null);
      return;
    } else {
      const prevVideo = videos[currentPlayingVideoIdx - 1];
      const video: CurrentPlayingVideo = {
        video_code: prevVideo.video_code,
        video_id: prevVideo.video_id,
        last_view_duration: prevVideo.last_view_duration
      };

      setPrevPlayingVideo(video);
    }
  }, [courseDetail.sections, currentPlayingVideo.video_id]);

  const searchNextVideo = useCallback(() => {
    const videos = courseDetail.sections.flatMap((section) => section.videos);
    const currentPlayingVideoIdx = videos.findIndex((video) => {
      return video.video_id === currentPlayingVideo.video_id;
    });

    if (currentPlayingVideoIdx === videos.length - 1) {
      setNextPlayingVideo(null);
      return;
    } else {
      const nextVideo = videos[currentPlayingVideoIdx + 1];
      const video: CurrentPlayingVideo = {
        video_code: nextVideo.video_code,
        video_id: nextVideo.video_id,
        last_view_duration: nextVideo.last_view_duration
      };

      setNextPlayingVideo(video);
    }
  }, [courseDetail.sections, currentPlayingVideo.video_id]);

  const onVideoEnd = useCallback(() => {
    searchNextVideo();
    if(nextPlayingVideo === null) return;
    setCurrentPlayingVideo(nextPlayingVideo);
  }, [searchNextVideo, nextPlayingVideo]);

  useEffect(() => {
    searchPrevVideo();
    searchNextVideo();
  }, [currentPlayingVideo, searchPrevVideo, searchNextVideo]);

  return (
    <div className='flex items-stretch flex-1 h-full bg-zinc-50'>
      <CourseDetailDrawer
        courseDetail={courseDetail}
        currentPlayingVideo={currentPlayingVideo}
        setCurrentPlayingVideo={setCurrentPlayingVideo}
      />
      <div id='background' className='flex-1 overflow-scroll'>
        <CourseHeader
          title={last_view_video.video_title}
          channel={last_view_video.channel}
        />
        <YoutubePlayer
          video_code={currentPlayingVideo.video_code}
          width={'100%'}
          height={'100%'}
          start={currentPlayingVideo.last_view_duration}
          onEnd={onVideoEnd}
        />
        <div id='controller'>
          <PrevNextController
            prevPlayingVideo={prevPlayingVideo}
            nextPlayingVideo={nextPlayingVideo}
            setCurrentPlayingVideo={setCurrentPlayingVideo}
          />
        </div>
      </div>
      <CourseMaterialDrawer />
    </div>
  );
}
