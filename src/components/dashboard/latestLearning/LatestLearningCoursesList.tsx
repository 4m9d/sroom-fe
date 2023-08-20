import SectionHeading from '../../ui/SectionHeading';
import LatestLearningLectureCard from './LatestLearningCourseCard';

type Props = {
  latestLearningCourses: Course[];
};

export default function LatestLearningCoursesList({
  latestLearningCourses
}: Props) {
  return (
    <div className='bg-sroom-gray-200'>
      <section className='px-4 py-20 mx-auto mt-20 lg:px-24 max-w-screen-2xl'>
        <SectionHeading title='시작해 볼까요?' />
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
