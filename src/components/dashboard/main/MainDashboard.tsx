import SectionHeading from '../../ui/SectionHeading';
import CompletionRate from './completionRate/CompletionRate';
import CorrectnessRate from './correctnessRate/CorrectnessRate';
import WrongQuizReviewSlider from './wrongQuizReview/WrongQuizReviewSlider';
import TotalLearningTime from './totalLearningTime/TotalLearningTime';
import WeeklyCalendar from './weeklyCalendar/WeeklyCalendar';

type Props = {
  dashboardInfo: DashboardInfo;
};

export default async function MainDashboard({ dashboardInfo }: Props) {
  const {
    completion_rate,
    correctness_rate,
    motivation,
    wrong_quizzes,
    total_learning_time,
    learning_histories
  } = dashboardInfo;

  return (
    <section
      id='dashboard-section'
      className='px-4 lg:px-24 mx-auto mt-10 pt-10 max-w-screen-xl h-[32.90%]'
    >
      <SectionHeading title='대시보드' />
      <div className='w-full'>
        <div className='relative pb-[32.90%] w-full'>
          <div className='absolute w-full h-full'>
            <div className='grid gap-2 grid-cols-3 grid-rows-[1fr_repeat(2,_minmax(0,_1.5fr))] w-full h-full'>
              <WrongQuizReviewSlider wrongQuizzes={wrong_quizzes} />
              <TotalLearningTime time={total_learning_time} />
              <CorrectnessRate value={correctness_rate} />
              <CompletionRate value={completion_rate} />
              <WeeklyCalendar learning_histories={learning_histories} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
