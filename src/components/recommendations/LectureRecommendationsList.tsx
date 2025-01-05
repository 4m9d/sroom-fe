'use client';
import { useQuery } from '@tanstack/react-query';
import { fetchLectureRecommendations } from '@/src/api/lectures/search';
import { QueryKeys } from '@/src/api/queryKeys';
import { CACHE_TIME, STALE_TIME } from '@/src/constants/query/query';
import { RecommendationSectionHeading } from '@/src/constants/recommendation/recommendation';
import LectureRecommendationsSection from './LectureRecommendationsSection';

export default function LectureRecommendationsList() {
  const { data } = useQuery(
    [QueryKeys.RECOMMENDATION],
    fetchLectureRecommendations,
    {
      cacheTime: CACHE_TIME,
      staleTime: STALE_TIME,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false
    }
  );

  const general_recommendations = data?.general_recommendations ?? [];
  const channel_recommendations = data?.channel_recommendations ?? [];
  const society_recommendations = data?.society_recommendations ?? [];
  const economic_recommendations = data?.economic_recommendations ?? [];
  const science_recommendations = data?.science_recommendations ?? [];
  const tech_recommendations = data?.tech_recommendations ?? [];

  return (
    <>
      <LectureRecommendationsSection
        recommendations={channel_recommendations}
        heading={RecommendationSectionHeading.CHANNEL}
      />
      <LectureRecommendationsSection
        recommendations={general_recommendations}
        heading={RecommendationSectionHeading.GENERAL}
      />
      <LectureRecommendationsSection
        recommendations={society_recommendations}
        heading={RecommendationSectionHeading.SOCIETY}
      />
      <LectureRecommendationsSection
        recommendations={economic_recommendations}
        heading={RecommendationSectionHeading.ECONOMIC}
      />
      <LectureRecommendationsSection
        recommendations={tech_recommendations}
        heading={RecommendationSectionHeading.TECH}
      />
      <LectureRecommendationsSection
        recommendations={science_recommendations}
        heading={RecommendationSectionHeading.SCIENCE}
      />
    </>
  );
}
