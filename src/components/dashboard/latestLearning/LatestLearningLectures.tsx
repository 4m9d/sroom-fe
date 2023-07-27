import SectionHeading from '../../ui/SectionHeading';
import LatestLearningLectureCard from './LatestLearningLectureCard';

type Props = {
  latestLearningLectures: LatestLearningLecture[];
};

export default function LatestLearningLectures({
  latestLearningLectures
}: Props) {
  return (
    <div className='bg-zinc-100'>
      <section className='px-20 py-20 mx-auto my-20 max-w-screen-2xl'>
        <SectionHeading title='시작해 볼까요?' />
        <ul className='flex flex-wrap gap-8 shrink-0'>
          {latestLearningLectures.map((lecture) => (
            <li key={lecture.course_id}>
              <LatestLearningLectureCard lecture={lecture} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
