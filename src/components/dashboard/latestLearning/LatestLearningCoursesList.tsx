'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import SectionHeading from '../../ui/SectionHeading';
import LatestLearningLectureCard from './LatestLearningCourseCard';

type Props = {
  latestLearningCourses: Course[];
};

export default function LatestLearningCoursesList({
  latestLearningCourses
}: Props) {
  const router = useRouter();

  return (
    <div className='bg-sroom-gray-200'>
      <section className='max-w-screen-xl px-4 py-20 mx-auto mt-20 lg:px-24'>
        <SectionHeading
          title='시작해 볼까요?'
          onMouseOver={() => router.prefetch('/classroom')}
          onClick={() => router.push('/classroom')}
        >
          <Link href={'/classroom'}></Link>
        </SectionHeading>
        <ul className='grid grid-cols-1 gap-5 xl:grid-cols-2 shrink-0'>
          {latestLearningCourses.map((course) => (
            <li key={course.course_id}>
              <LatestLearningLectureCard course={course} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
