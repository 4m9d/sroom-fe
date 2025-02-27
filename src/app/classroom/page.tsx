'use client';
import { useQuery } from '@tanstack/react-query';
import { fetchClassroom } from '@/src/api/courses/courses';
import { QueryKeys } from '@/src/api/queryKeys';
import ClassroomCourseList from '@/src/components/classroom/ClassroomCourseList';
import ClassroomCourseSkeleton from '@/src/components/classroom/ClassroomCourseSkeleton';
import ClassroomHeader from '@/src/components/classroom/ClassroomHeader';
import SectionHeading from '@/src/components/ui/SectionHeading';
import { CACHE_TIME, STALE_TIME } from '@/src/constants/query/query';
import { CLASSROOM_LIMIT } from '@/src/constants/skeleton/skeleton';

export default function Classroom({}) {
  const { data, status } = useQuery([QueryKeys.CLASSROOM], fetchClassroom, {
    staleTime: STALE_TIME,
    cacheTime: CACHE_TIME,
    refetchOnMount: 'always'
  });

  return (
    <section className='max-w-screen-xl px-4 py-20 mx-auto lg:px-24 pt-14 text-sroom-black-400'>
      <SectionHeading title='내 강의실' />
      {status === 'loading' && (
        <ClassroomCourseSkeleton limit={CLASSROOM_LIMIT} />
      )}
      {data && (
        <>
          <ClassroomHeader
            completion_rate={data.completion_rate}
            unfinished_course={data.unfinished_course}
          />
          <ClassroomCourseList courses={data.courses} />
        </>
      )}
    </section>
  );
}
