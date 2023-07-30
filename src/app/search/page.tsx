'use client';
import { fetchLectureRecommendations } from '@/src/api/lectures/search';
import { QueryKeys } from '@/src/api/queryKeys';
import LectureRecommendationsList from '@/src/components/recommendations/LectureRecommendationsList';
import SearchResultsHeading from '@/src/components/search/SearchResultsHeading';
import SearchResultsList from '@/src/components/search/SearchResultsList';
import SearchResultsSkeleton from '@/src/components/search/SearchResultsSkeleton';
import { LIMIT_PER_FETCH } from '@/src/constants/search/search';
import { useQuery } from '@tanstack/react-query';
import { Suspense, useRef } from 'react';

type Props = {
  searchParams: SearchLectureParams;
};

export default async function SearchResults({ searchParams }: Props) {
  const requestParam: SearchLectureParams = {
    keyword:
      searchParams.keyword === undefined
        ? ''
        : decodeURIComponent(searchParams.keyword),
    limit: searchParams.limit ? Number(searchParams.limit) : LIMIT_PER_FETCH,
    next_page_token: '',
    filter: searchParams.filter ? searchParams.filter : 'all'
  };

  const { data } = useQuery(
    [QueryKeys.RECCOMENDATION],
    fetchLectureRecommendations
  );

  const searchResultPageRef = useRef<number>(0);

  return (
    <>
      <div className='py-20 bg-zinc-100'>
        <section className='px-20 py-20 mx-auto max-w-screen-2xl'>
          <SearchResultsHeading keyword={requestParam.keyword} />
          <Suspense
            fallback={
              <SearchResultsSkeleton
                searchResultPageRef={searchResultPageRef}
                limit={requestParam.limit}
              />
            }
          >
            <SearchResultsList
              requestParam={requestParam}
              searchResultPageRef={searchResultPageRef}
            />
          </Suspense>
        </section>
      </div>
      {data?.recommendations && (
        <LectureRecommendationsList recommendations={data?.recommendations} />
      )}
    </>
  );
}
