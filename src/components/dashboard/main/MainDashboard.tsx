import { fetchDashboardInfo } from '@/src/api/dashboards/dashboards';
import SectionHeading from '../../ui/SectionHeading';
import CompletionRate from './CompletionRate';
import CorrectnessRate from './CorrectnessRate';
import Motivation from './Motivation';
import TotalLearningTime from './TotalLearningTime';
import WeeklyCalendar from './WeeklyCalendar';

type Props = {};

export default async function MainDashboard({}: Props) {
  const dashboardInfo = await fetchDashboardInfo().then((res) => res);
  const {
    completion_rate,
    correctness_rate,
    latest,
    motivation,
    total_learning_time,
    learning_history
  } = dashboardInfo;

  return (
    <section className='px-20 my-20'>
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
