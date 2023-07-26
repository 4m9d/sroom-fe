import { fetchDashboardInfo } from '@/src/api/dashboards/dashboards';
import DashboardHeader from '@/src/components/dashboard/header/DashboardHeader';
import MainDashboard from '@/src/components/dashboard/main/MainDashboard';

export default async function Dashboard() {
  const dashboardInfo = await fetchDashboardInfo().then((res) => res);
  const isEnrolled = dashboardInfo.latest.length > 0;

  return (
    <div>
      <DashboardHeader isEnrolled={isEnrolled} />
      <MainDashboard dashboardInfo={dashboardInfo} />
    </div>
  );
}
