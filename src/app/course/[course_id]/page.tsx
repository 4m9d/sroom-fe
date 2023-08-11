import { fetchCourseDetail } from '@/src/api/courses/courses';
import CourseTaking from '@/src/components/course/CourseTaking';

export default async function CourseTakingPage({
  params: { course_id }
}: CourseTakingPageParams) {
  const courseDetail = await fetchCourseDetail(parseInt(course_id));

  return (
    <div className='h-screen bg-zinc-50'>
      <CourseTaking courseDetail={courseDetail} />
    </div>
  );
}
