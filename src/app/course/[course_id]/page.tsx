import { fetchCourseDetail } from '@/src/api/courses/courses';
import CourseHeader from '@/src/components/course/CourseHeader';
import YoutubePlayer from '@/src/components/course/YoutubePlayer';

export default async function CourseTakingPage({
  params: { course_id }
}: CourseTakingPageParams) {
  const courseDetail = await fetchCourseDetail(parseInt(course_id));
  const { last_view_video } = courseDetail;

  return (
    <>
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
    </>
  );
}