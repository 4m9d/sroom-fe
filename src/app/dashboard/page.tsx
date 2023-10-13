import { fetchDashboardInfo } from '@/src/api/dashboards/dashboards';
import DashboardHeader from '@/src/components/dashboard/header/DashboardHeader';
import ServiceGuideModal from '@/src/components/dashboard/header/ServiceGuideModal';
import LatestLearningCoursesList from '@/src/components/dashboard/latestLearning/LatestLearningCoursesList';
import MainDashboard from '@/src/components/dashboard/main/MainDashboard';
import LectureRecommendationsList from '@/src/components/recommendations/LectureRecommendationsList';
import { SERVICE_GUIDE } from '@/src/constants/serviceGuides/serviceGuides';
import { NotionAPI } from 'notion-client';
import { ExtendedRecordMap } from 'notion-types';

export const metadata = {
  title: '대시보드'
};

export default async function Dashboard() {
  const notion = new NotionAPI();
  const recordMapList: ExtendedRecordMap[] = await Promise.all(
    SERVICE_GUIDE.map((service) => notion.getPage(service.key))
  );
  const dashboardInfo = await fetchDashboardInfo();
  const latestLearningCourses = dashboardInfo.latest_lectures;
  const isExistingUser = latestLearningCourses.length > 0;

  return (
    <div className='w-full'>
      <DashboardHeader
        isExistingUser={isExistingUser}
        recordMapList={recordMapList}
      />
      <MainDashboard dashboardInfo={dashboardInfo} />
      {isExistingUser && (
        <LatestLearningCoursesList
          latestLearningCourses={latestLearningCourses}
        />
      )}
      <LectureRecommendationsList />
    </div>
  );
}
