'use client';
import { useCallback, useEffect, useState } from 'react';
import CourseHeader from './CourseHeader';
import YoutubePlayer from './YoutubePlayer';
import CourseDetailDrawer from './drawer/courseDetail/CourseDetailDrawer';
import CourseMaterialDrawer from './drawer/courseMaterial/CourseMaterialDrawer';
import PrevNextController from './PrevNextController';
import { useRouter } from 'next/navigation';

type Props = {
  courseDetail: CourseDetail;
  currentCourseVideoId: number;
};

export default function CourseTaking({
  courseDetail,
  currentCourseVideoId
}: Props) {
  const last_view_video = findVideoById() as LastViewVideo;
  const router = useRouter();
  const currentPlayingVideo = last_view_video;
  
  const [prevPlayingVideo, setPrevPlayingVideo] =
    useState<LastViewVideo | null>(last_view_video);
  const [nextPlayingVideo, setNextPlayingVideo] =
    useState<LastViewVideo | null>(last_view_video);

  function findVideoById() {
    const videos = courseDetail.sections.flatMap((section) => section.videos);
    const video = videos.find(
      (video) => video.course_video_id === currentCourseVideoId
    );
    if (video === undefined) {
      return null;
    }
    const last_view_video: LastViewVideo = {
      video_code: video.video_code,
      course_video_id: video.course_video_id,
      video_id: video.video_id,
      last_view_duration: video.last_view_duration,
      channel: video.channel,
      video_title: video.video_title
    };
    return last_view_video;
  }

  const searchPrevVideo = useCallback(() => {
    const videos = courseDetail.sections.flatMap((section) => section.videos);
    const currentPlayingVideoIdx = videos.findIndex((video) => {
      return video.course_video_id === currentCourseVideoId;
    });

    if (currentPlayingVideoIdx === 0) {
      setPrevPlayingVideo(() => null);
      return;
    } else {
      const prevVideo = videos[currentPlayingVideoIdx - 1];
      const video: LastViewVideo = {
        video_code: prevVideo.video_code,
        course_video_id: prevVideo.course_video_id,
        video_id: prevVideo.video_id,
        last_view_duration: prevVideo.last_view_duration,
        channel: prevVideo.channel,
        video_title: prevVideo.video_title
      };

      setPrevPlayingVideo(() => video);
    }
  }, [courseDetail.sections, currentCourseVideoId]);

  const searchNextVideo = useCallback(() => {
    const videos = courseDetail.sections.flatMap((section) => section.videos);
    const currentPlayingVideoIdx = videos.findIndex((video) => {
      return video.course_video_id === currentCourseVideoId;
    });

    if (currentPlayingVideoIdx === videos.length - 1) {
      setNextPlayingVideo(() => null);
      return;
    } else {
      const nextVideo = videos[currentPlayingVideoIdx + 1];
      const video: LastViewVideo = {
        video_code: nextVideo.video_code,
        course_video_id: nextVideo.course_video_id,
        video_id: nextVideo.video_id,
        last_view_duration: nextVideo.last_view_duration,
        channel: nextVideo.channel,
        video_title: nextVideo.video_title
      };

      setNextPlayingVideo(() => video);
    }
  }, [courseDetail.sections, currentCourseVideoId]);

  const onVideoEnd = useCallback(() => {
    searchNextVideo();
    if (nextPlayingVideo === null) return;
    router.push(
      `/course/${courseDetail.course_id}?course_video_id=${nextPlayingVideo.course_video_id}`
    );
  }, [searchNextVideo, nextPlayingVideo, router, courseDetail.course_id]);

  useEffect(() => {
    searchPrevVideo();
    searchNextVideo();
  }, [searchPrevVideo, searchNextVideo]);

  return (
    <div className='flex items-stretch flex-1 h-full bg-sroom-gray-200'>
      <CourseDetailDrawer
        courseDetail={courseDetail}
        currentPlayingVideo={currentPlayingVideo}
      />
      <div id='background' className='flex-1 overflow-scroll'>
        <CourseHeader
          title={currentPlayingVideo.video_title}
          channel={currentPlayingVideo.channel}
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
            course_id={courseDetail.course_id}
            prevPlayingVideo={prevPlayingVideo}
            nextPlayingVideo={nextPlayingVideo}
          />
        </div>
      </div>
      <CourseMaterialDrawer />
    </div>
  );
}
