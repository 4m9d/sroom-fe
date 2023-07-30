import SectionHeading from '../ui/SectionHeading';
import LectureRecommendationsCard from './LectureRecommendationsCard';

type Props = {
  recommendations: PersonalizedLecture[];
};

export default function LectureRecommendationsList({ recommendations }: Props) {
  return (
    <section className='relative px-20 py-20 mx-auto my-20 max-w-screen-2xl'>
      <SectionHeading title='이런 강의는 어때요?' />
      <ul className='flex gap-8 overflow-x-scroll overflow-y-hidden overscroll-x-contain scrollbar-hide'>
        {recommendations.map((lecture) => (
          <li key={lecture.lecture_code}>
            <LectureRecommendationsCard lecture={lecture} />
          </li>
        ))}
      </ul>
    </section>
  );
}
