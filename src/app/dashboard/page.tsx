import { fetchDashboardInfo } from '@/src/api/dashboards/dashboards';
import { fetchLectureRecommendations } from '@/src/api/lectures/search';
import DashboardHeader from '@/src/components/dashboard/header/DashboardHeader';
import LatestLearningCoursesList from '@/src/components/dashboard/latestLearning/LatestLearningCoursesList';
import MainDashboard from '@/src/components/dashboard/main/MainDashboard';
import LectureRecommendationsList from '@/src/components/recommendations/LectureRecommendationsList';

export default async function Dashboard() {
  const dashboardInfo = await fetchDashboardInfo();
  const recommendations = await fetchLectureRecommendations();

  const latestLearningCourses = dashboardInfo.latest_lectures;
  const recommendedLectures = recommendations.recommendations;
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
      <LectureRecommendationsList recommendations={recommendedLectures} />
    </div>
  );
}
