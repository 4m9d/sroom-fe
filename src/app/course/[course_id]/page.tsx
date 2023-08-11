import { fetchCourseDetail } from '@/src/api/courses/courses';
import CourseTaking from '@/src/components/course/CourseTaking';

export default async function CourseTakingPage({
  params: { course_id }
}: CourseTakingPageParams) {
  const courseDetail = await fetchCourseDetail(parseInt(course_id));

  return (
    <div className='min-h-[calc(100vh-4rem)] max-h-[calc(100vh-4rem)] bg-zinc-50'>
      <CourseTaking courseDetail={courseDetail} />
    </div>
  );
}
