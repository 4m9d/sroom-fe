import { fetchCourseDetail } from '@/src/api/courses/courses';
import CourseTaking from '@/src/components/course/CourseTaking';

export default async function CourseTakingPage({
  params,
  searchParams
}: CourseTakingPageParams) {
  const courseDetail = await fetchCourseDetail(parseInt(params.course_id));

  return (
    <div className='min-h-[calc(100vh-4rem)] max-h-[calc(100vh-4rem)] bg-zinc-50 flex items-stretch'>
      <CourseTaking
        courseDetail={courseDetail}
        currentCourseVideoId={
          searchParams.course_video_id
            ? parseInt(searchParams.course_video_id)
            : courseDetail.last_view_video.course_video_id
        }
      />
    </div>
  );
}
