import SectionHeading from '../../ui/SectionHeading';
import CompletionRate from './CompletionRate';
import CorrectnessRate from './CorrectnessRate';
import Motivation from './Motivation';
import TotalLearningTime from './TotalLearningTime';
import WeeklyCalendar from './WeeklyCalendar';

type Props = {
  dashboardInfo: DashboardInfo;
};

export default async function MainDashboard({dashboardInfo}: Props) {
  const {
    completion_rate,
    correctness_rate,
    motivation,
    total_learning_time,
    learning_history
  } = dashboardInfo;

  return (
    <section className='px-20 mx-auto my-20 max-w-screen-2xl'>
      <SectionHeading title='대시보드' />
      <div className='h-80 grid gap-2 grid-cols-3 grid-rows-[1fr_repeat(2,_minmax(0,_1.5fr))]'>
        <Motivation text={motivation} />
        <TotalLearningTime time={total_learning_time} />
        <CorrectnessRate value={correctness_rate} />
        <CompletionRate value={completion_rate} />
        <WeeklyCalendar learning_history={learning_history} />
      </div>
    </section>
  );
}