import { fetchDashboardInfo } from '@/src/api/dashboards/dashboards';
import DashboardHeader from '@/src/components/dashboard/header/DashboardHeader';
import LatestLearningCoursesList from '@/src/components/dashboard/latestLearning/LatestLearningCoursesList';
import MainDashboard from '@/src/components/dashboard/main/MainDashboard';
import LectureRecommendationsList from '@/src/components/recommendations/LectureRecommendationsList';

export const metadata = {
  title: '대시보드',
};

export default async function Dashboard() {
  const dashboardInfo = await fetchDashboardInfo();

  const latestLearningCourses = dashboardInfo.latest_lectures;
  const isEnrolled = latestLearningCourses.length > 0;

  return (
    <div>
      <DashboardHeader isEnrolled={isEnrolled} />
      <MainDashboard dashboardInfo={dashboardInfo} />
      {isEnrolled && (
        <LatestLearningCoursesList
          latestLearningCourses={latestLearningCourses}
        />
      )}
      <LectureRecommendationsList />
    </div>
  );
}
