'use client';
import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '@/src/api/queryKeys';
import { fetchLectureRecommendations } from '@/src/api/lectures/search';
import { CACHE_TIME, STALE_TIME } from '@/src/constants/query/query';
import ChannelRecommendationsList from './channel/ChannelRecommendationsList';
import GeneralRecommendationsList from './general/GeneralRecommendationsList';

export default function LectureRecommendationsList() {
  const { data } = useQuery(
    [QueryKeys.RECCOMENDATION],
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

  return (
    <>
      <ChannelRecommendationsList recommendations={channel_recommendations} />
      <GeneralRecommendationsList recommendations={general_recommendations} />
    </>
  );
}
