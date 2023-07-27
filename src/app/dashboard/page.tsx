import { fetchDashboardInfo } from '@/src/api/dashboards/dashboards';
import DashboardHeader from '@/src/components/dashboard/header/DashboardHeader';
import LatestLearningLectures from '@/src/components/dashboard/latestLearning/LatestLearningLectures';
import MainDashboard from '@/src/components/dashboard/main/MainDashboard';

export default async function Dashboard() {
  const dashboardInfo = await fetchDashboardInfo();
  const latestLearningLectures = dashboardInfo.latest;
  const isEnrolled = latestLearningLectures.length > 0;

  return (
    <div>
      <DashboardHeader isEnrolled={isEnrolled} />
      <MainDashboard dashboardInfo={dashboardInfo} />
      <LatestLearningLectures latestLearningLectures={latestLearningLectures}/>
    </div>
  );
}
