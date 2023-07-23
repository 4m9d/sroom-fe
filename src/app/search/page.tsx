'use client';
import SearchResultsHeading from '@/src/components/search/SearchResultsHeading';
import SearchResultsList from '@/src/components/search/SearchResultsList';
import SearchResultsSkeleton from '@/src/components/search/SearchResultsSkeleton';
import { LIMIT_PER_FETCH } from '@/src/constants/search/search';
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

  const searchResultPageRef = useRef<number>(0);

  return (
    <>
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
    </>
  );
}
