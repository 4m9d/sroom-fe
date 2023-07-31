import SectionHeading from '../../ui/SectionHeading';
import LatestLearningLectureCard from './LatestLearningCourseCard';

type Props = {
  latestLearningCourses: Course[];
};

export default function LatestLearningCoursesList({
  latestLearningCourses
}: Props) {
  return (
    <div className='bg-zinc-100'>
      <section className='px-20 py-20 mx-auto my-20 max-w-screen-2xl'>
        <SectionHeading title='시작해 볼까요?' />
        <ul className='flex flex-wrap gap-8 shrink-0'>
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
