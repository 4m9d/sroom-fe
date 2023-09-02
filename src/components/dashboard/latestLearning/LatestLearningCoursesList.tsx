import ArrowRightSVG from '@/public/icon/ArrowRight';
import SectionHeading from '../../ui/SectionHeading';
import Button from '../../ui/button/Button';
import LatestLearningLectureCard from './LatestLearningCourseCard';
import Link from 'next/link';

type Props = {
  latestLearningCourses: Course[];
};

export default function LatestLearningCoursesList({
  latestLearningCourses
}: Props) {
  return (
    <div className='bg-sroom-gray-200'>
      <section className='px-4 py-20 mx-auto mt-20 lg:px-24 max-w-screen-2xl'>
        <SectionHeading title='시작해 볼까요?'>
          <Link href={'/classroom'}>
            <Button hoverEffect={true} className='gap-2'>
              <p className='text-sm font-normal text-sroom-black-200 md:text-base'>
                내 강의실
              </p>
              <span className='w-3 stroke-sroom-black-200'>
                <ArrowRightSVG />
              </span>
            </Button>
          </Link>
        </SectionHeading>
        <ul className='grid grid-cols-1 gap-5 2xl:grid-cols-2 shrink-0'>
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
