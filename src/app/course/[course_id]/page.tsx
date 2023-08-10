import { fetchCourseDetail } from '@/src/api/courses/courses';
import YoutubePlayer from '@/src/components/course/YoutubePlayer';

export default async function CourseTakingPage({
  params: { course_id }
}: CourseTakingPageParams) {
  const courseDetail = await fetchCourseDetail(parseInt(course_id));
  const { last_view_video } = courseDetail;

  return (
    <>
      <YoutubePlayer
        video_code={last_view_video.video_code}
        width={300 * 1.78}
        height={300}
        start={last_view_video.last_view_duration}
      />
    </>
  );
}
