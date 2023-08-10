import { fetchCourseDetail } from '@/src/api/courses/courses';

export default async function CourseTakingPage({
  params: { course_id }
}: CourseTakingPageParams) {
  const courseDetail = await fetchCourseDetail(parseInt(course_id));

  return <>{courseDetail.course_title}</>;
}
