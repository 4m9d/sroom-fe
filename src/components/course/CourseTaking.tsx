'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import CourseHeader from './CourseHeader';
import YoutubePlayer from './YoutubePlayer';
import CourseDetailDrawer from './drawer/courseDetail/CourseDetailDrawer';
import CourseMaterialDrawer from './drawer/courseMaterial/CourseMaterialDrawer';
import CourseVideoController from './CourseVideoController';

type Props = {
  courseDetail: CourseDetail;
  currentCourseVideoId: number;
};

export default function CourseTaking({
  courseDetail,
  currentCourseVideoId
}: Props) {
  const last_view_video = findVideoById() as LastViewVideo;
  const currentPlayingVideo = last_view_video;

  const [prevPlayingVideo, setPrevPlayingVideo] =
    useState<LastViewVideo | null>(last_view_video);
  const [nextPlayingVideo, setNextPlayingVideo] =
    useState<LastViewVideo | null>(last_view_video);
  const viewDuration = useRef<number>(0);
  const currentIntervalID=
    useRef<NodeJS.Timer | null>(null);

  function findVideoById() {
    const videos = courseDetail.sections.flatMap((section) => section.videos);
    const video = videos.find(
      (video) => video.course_video_id === currentCourseVideoId
    );
    if (video === undefined) {
      return null;
    }
    const last_view_video: LastViewVideo = {
      video_id: video.video_id,
      video_code: video.video_code,
      course_video_id: video.course_video_id,
      video_title: video.video_title,
      channel: video.channel,
      last_view_duration: video.last_view_duration,
      is_completed: video.is_completed
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
        video_id: prevVideo.video_id,
        video_code: prevVideo.video_code,
        course_video_id: prevVideo.course_video_id,
        video_title: prevVideo.video_title,
        channel: prevVideo.channel,
        last_view_duration: prevVideo.last_view_duration,
        is_completed: prevVideo.is_completed
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
        video_id: nextVideo.video_id,
        video_code: nextVideo.video_code,
        course_video_id: nextVideo.course_video_id,
        video_title: nextVideo.video_title,
        last_view_duration: nextVideo.last_view_duration,
        channel: nextVideo.channel,
        is_completed: nextVideo.is_completed
      };

      setNextPlayingVideo(() => video);
    }
  }, [courseDetail.sections, currentCourseVideoId]);

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
          is_completed={currentPlayingVideo.is_completed}
        />
        <YoutubePlayer
          width={'100%'}
          height={'100%'}
          video_code={currentPlayingVideo.video_code}
          course_video_id={currentPlayingVideo.course_video_id}
          course_id={courseDetail.course_id}
          start={currentPlayingVideo.last_view_duration}
          viewDuration={viewDuration}
          is_completed={currentPlayingVideo.is_completed}
          currentIntervalID={currentIntervalID}
        />
        <div id='controller'>
          <CourseVideoController
            course_id={courseDetail.course_id}
            course_video_id={currentCourseVideoId}
            is_completed={currentPlayingVideo.is_completed}
            prevPlayingVideo={prevPlayingVideo}
            nextPlayingVideo={nextPlayingVideo}
            viewDuration={viewDuration}
            currentIntervalID={currentIntervalID}
          />
        </div>
      </div>
      <CourseMaterialDrawer />
    </div>
  );
}
