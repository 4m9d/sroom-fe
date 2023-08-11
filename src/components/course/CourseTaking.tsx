'use client';
import { useState } from 'react';
import CourseHeader from './CourseHeader';
import YoutubePlayer from './YoutubePlayer';
import CourseDetailDrawer from './drawer/courseDetail/CourseDetailDrawer';
import CourseMaterialDrawer from './drawer/courseMaterial/CourseMaterialDrawer';

type Props = {
  courseDetail: CourseDetail;
};

export default function CourseTaking({ courseDetail }: Props) {
  const { last_view_video } = courseDetail;
  const [currentPlayingVideo, setCurrentPlayingVideo] = useState<CurrentPlayingVideo>({
    video_id: last_view_video.video_id,
    video_code: last_view_video.video_code,
    last_view_duration: last_view_video.last_view_duration
  });

  return (
    <div className='flex h-full flex-nowrap'>
      <CourseDetailDrawer
        courseDetail={courseDetail}
        currentPlayingVideo={currentPlayingVideo}
        setCurrentPlayingVideo={setCurrentPlayingVideo}
      />
      <div id='background' className='flex-grow'>
        <CourseHeader
          title={last_view_video.video_title}
          channel={last_view_video.channel}
        />
        <YoutubePlayer
          video_code={currentPlayingVideo.video_code}
          width={'100%'}
          height={'100%'}
          start={currentPlayingVideo.last_view_duration}
        />
      </div>
      <CourseMaterialDrawer />
    </div>
  );
}
