import { fetchCourseDetail } from '@/src/api/courses/courses';
import CourseHeader from '@/src/components/course/CourseHeader';
import YoutubePlayer from '@/src/components/course/YoutubePlayer';
import CourseDetailDrawer from '@/src/components/course/drawer/courseDetail/CourseDetailDrawer';
import CourseMaterialDrawer from '@/src/components/course/drawer/courseMaterial/CourseMaterialDrawer';

export default async function CourseTakingPage({
  params: { course_id }
}: CourseTakingPageParams) {
  const courseDetail = await fetchCourseDetail(parseInt(course_id));
  const { last_view_video } = courseDetail;

  return (
    <div className='h-screen bg-zinc-50'>
      <div className='flex h-full flex-nowrap'>
        <CourseDetailDrawer courseDetail={courseDetail} />
        <div id='background' className='flex-grow'>
          <CourseHeader
            title={last_view_video.video_title}
            channel={last_view_video.channel}
          />
          <YoutubePlayer
            video_code={last_view_video.video_code}
            width={'100%'}
            height={'100%'}
            start={last_view_video.last_view_duration}
          />
        </div>
        <CourseMaterialDrawer />
      </div>
    </div>
  );
}
