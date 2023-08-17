import SectionHeading from '../../ui/SectionHeading';
import CompletionRate from './CompletionRate';
import CorrectnessRate from './CorrectnessRate';
import Motivation from './Motivation';
import TotalLearningTime from './TotalLearningTime';
import WeeklyCalendar from './WeeklyCalendar';

type Props = {
  dashboardInfo: DashboardInfo;
};

export default async function MainDashboard({ dashboardInfo }: Props) {
  const {
    completion_rate,
    correctness_rate,
    motivation,
    total_learning_time,
    learning_histories
  } = dashboardInfo;

  return (
    <section className='px-20 mx-auto mt-20 max-w-screen-2xl h-[32.90%]'>
      <SectionHeading title='대시보드' />
      <div className='w-full'>
        <div className='relative pb-[32.90%] w-full'>
          <div className='absolute w-full h-full'>
            <div className='grid gap-2 grid-cols-3 grid-rows-[1fr_repeat(2,_minmax(0,_1.5fr))] w-full h-full'>
              <Motivation text={motivation} />
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
