import { fetchDashboardInfo } from '@/src/api/dashboards/dashboards';
import { fetchLectureRecommendations } from '@/src/api/lectures/search';
import DashboardHeader from '@/src/components/dashboard/header/DashboardHeader';
import LatestLearningLecturesList from '@/src/components/dashboard/latestLearning/LatestLearningLecturesList';
import MainDashboard from '@/src/components/dashboard/main/MainDashboard';
import LectureRecommendationsList from '@/src/components/recommendations/LectureRecommendationsList';

export default async function Dashboard() {
  const dashboardInfo = await fetchDashboardInfo();
  const recommendations = await fetchLectureRecommendations();

  const latestLearningLectures = dashboardInfo.latest_lectures;
  const recommendedLectures = recommendations.recommendations;
  const isEnrolled = latestLearningLectures.length > 0;

  return (
    <div>
      <DashboardHeader isEnrolled={isEnrolled} />
      <MainDashboard dashboardInfo={dashboardInfo} />
      {isEnrolled && (
        <LatestLearningLecturesList
          latestLearningLectures={latestLearningLectures}
        />
      )}
      <LectureRecommendationsList recommendations={recommendedLectures} />
    </div>
  );
}
