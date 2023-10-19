'use client';
import LectureRecommendationsList from '@/src/components/recommendations/LectureRecommendationsList';
import SearchResultsHeading from '@/src/components/search/SearchResultsHeading';
import SearchResultsList from '@/src/components/search/SearchResultsList';
import SearchResultsSkeleton from '@/src/components/search/SearchResultsSkeleton';
import getPageTitle from '@/src/util/metadata/getPageTitle';
import { Suspense, useLayoutEffect, useRef } from 'react';

type Props = {
  searchParams: SearchLectureParams;
};
const LIMIT_PER_FETCH = 20;

export default function SearchResults({ searchParams }: Props) {
  const searchResultPageRef = useRef<number>(0);

  const requestParam: SearchLectureParams = {
    keyword:
      searchParams.keyword === undefined
        ? ''
        : decodeURIComponent(searchParams.keyword),
    limit: searchParams.limit ? Number(searchParams.limit) : LIMIT_PER_FETCH,
    next_page_token: '',
    filter: searchParams.filter ? searchParams.filter : 'all'
  };

  useLayoutEffect(() => {
    window.scrollTo({ top: 0 });
  },[])

  return (
    <>
    <title>{getPageTitle(`'${searchParams.keyword}' 검색 결과`)}</title>
      <div className='py-20 bg-sroom-gray-200'>
        <section className='max-w-screen-xl px-4 mx-auto lg:px-24'>
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
      <LectureRecommendationsList />
    </>
  );
}
