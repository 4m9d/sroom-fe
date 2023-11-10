'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import CourseHeader from './CourseHeader';
import YoutubePlayer from './YoutubePlayer';
import CourseDetailDrawer from './drawer/courseDetail/CourseDetailDrawer';
import CourseMaterialDrawer from './drawer/courseMaterial/CourseMaterialDrawer';
import CourseVideoController from './CourseVideoController';
import { SessionStorageKeys } from '@/src/constants/courseTaking/courseTaking';
import CourseReviewModal from '../classroom/review/CourseReviewModal';
import { showModalHandler } from '@/src/util/modal/modalHandler';
import { useQueryClient } from '@tanstack/react-query';
import { QueryKeys } from '@/src/api/queryKeys';
import { ONE_SECOND_IN_MS } from '@/src/constants/time/time';
import convertCompactFormattedTimeToSeconds from '@/src/util/time/convertCompactFormattedTimeToSeconds';
import { YouTubePlayer } from 'react-youtube';

type Props = {
  courseDetail: CourseDetail;
  currentCourseVideoId: number;
};

export default function CourseTaking({
  courseDetail,
  currentCourseVideoId
}: Props) {
  const queryClient = useQueryClient();

  const last_view_video = findVideoById() as LastViewVideo;
  const currentPlayingVideo = last_view_video;

  const [prevPlayingVideo, setPrevPlayingVideo] =
    useState<LastViewVideo | null>(last_view_video);
  const [nextPlayingVideo, setNextPlayingVideo] =
    useState<LastViewVideo | null>(last_view_video);

  const viewDuration = useRef<number>(
    parseInt(
      sessionStorage.getItem(
        `${SessionStorageKeys.VIEW_DURATION}-${currentPlayingVideo.course_video_id}`
      ) ?? '0'
    )
  );
  const currentIntervalID = useRef<NodeJS.Timer | null>(null);
  const playerRef = useRef<YouTubePlayer | null>(null);

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

  useEffect(() => {
    if (courseDetail.progress === 100) {
      queryClient.invalidateQueries([
        QueryKeys.LECTURE_REVIEW,
        courseDetail.course_id.toString()
      ]);
      setTimeout(() => {
        const reviewableList = queryClient.getQueryData([
          QueryKeys.LECTURE_REVIEW,
          courseDetail.course_id.toString()
        ]) as CourseReviewResponse;
        if (
          reviewableList.lectures.find(
            (lecture) => lecture.is_review_allowed === true
          )
        ) {
          showModalHandler('LECTURE_REVIEW');
        }
      }, 1 * ONE_SECOND_IN_MS);
    }
  }, [courseDetail.course_id, courseDetail.progress, queryClient]);
  
  const handleTimestampClick = (formattedTimestamp: string) => {
    const timestamp = convertCompactFormattedTimeToSeconds(formattedTimestamp);
    playerRef.current?.seekTo(timestamp, true);
  };

  return (
    <div className='flex items-stretch flex-1 h-[calc(100vh-4rem)] bg-sroom-gray-200'>
      <CourseDetailDrawer
        courseDetail={courseDetail}
        currentPlayingVideo={currentPlayingVideo}
      />
      <div id='background' className='flex-1 px-8 overflow-scroll'>
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
          playerRef={playerRef}
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
      <CourseMaterialDrawer courseVideoId={currentCourseVideoId} handleTimestampClick={handleTimestampClick} />
      <CourseReviewModal courseId={courseDetail.course_id} />
    </div>
  );
}
