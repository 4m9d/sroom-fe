import DashboardHeader from '@/src/components/dashboard/header/DashboardHeader';
import MainDashboard from '@/src/components/dashboard/main/MainDashboard';

export default function Dashboard() {
  return (
    <div>
      <DashboardHeader isEnrolled={false} />
      <MainDashboard />
    </div>
  );
}
