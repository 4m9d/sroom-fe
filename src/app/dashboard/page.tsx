import { NotionAPI } from 'notion-client';
import { ExtendedRecordMap } from 'notion-types';
import { fetchDashboardInfo } from '@/src/api/dashboards/dashboards';
import DashboardHeader from '@/src/components/dashboard/header/DashboardHeader';
import LatestLearningCoursesList from '@/src/components/dashboard/latestLearning/LatestLearningCoursesList';
import MainDashboard from '@/src/components/dashboard/main/MainDashboard';
import MainSearchInput from '@/src/components/dashboard/searchInput/MainSearchInput';
import LectureRecommendationsList from '@/src/components/recommendations/LectureRecommendationsList';
import { SERVICE_GUIDE } from '@/src/constants/serviceGuides/serviceGuides';

export const metadata = {
  title: '대시보드'
};

export default async function Dashboard() {
  const notion = new NotionAPI();
  
  const dashboardInfo = await fetchDashboardInfo().catch((error) => {
    return null;
  }
  );
  const recordMapList: ExtendedRecordMap[] = await Promise.all(
    SERVICE_GUIDE.map((service) => notion.getPage(service.key))
  );
  
  const latestLearningCourses = dashboardInfo?.latest_lectures;
  const isExistingUser =
    (latestLearningCourses && latestLearningCourses.length > 0) ?? false;

  return (
    <div className='w-full'>
      <DashboardHeader
        isExistingUser={isExistingUser}
        recordMapList={recordMapList}
      />
      {dashboardInfo && <MainDashboard dashboardInfo={dashboardInfo} />}
      <MainSearchInput/>
      {isExistingUser && latestLearningCourses && (
        <LatestLearningCoursesList
          latestLearningCourses={latestLearningCourses}
        />
      )}
      <LectureRecommendationsList />
    </div>
  );
}
