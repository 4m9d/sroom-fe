import SearchResultsHeading from '@/src/components/search/SearchResultsHeading';
import SearchResultsList from '@/src/components/search/SearchResultsList';
import SearchResultsSkeleton from '@/src/components/search/SearchResultsSkeleton';
import { LIMIT_PER_FETCH } from '@/src/constants/search/search';
import { Suspense } from 'react';

type Props = {
  searchParams: SearchLectureParams;
};

export default async function SearchResults({ searchParams }: Props) {
  const requestParam: SearchLectureParams = {
    keyword: searchParams.keyword === undefined ? '' : decodeURIComponent(searchParams.keyword),
    limit: searchParams.limit ? Number(searchParams.limit) : LIMIT_PER_FETCH,
    next_page_token: '',
    filter: searchParams.filter ? searchParams.filter : 'all'
  };

  return (
    <>
      <SearchResultsHeading keyword={requestParam.keyword} />
      <Suspense fallback={<SearchResultsSkeleton limit={requestParam.limit} />}>
        <SearchResultsList
          keyword={requestParam.keyword}
          limit={requestParam.limit}
          next_page_token=''
          filter={requestParam.filter}
        />
      </Suspense>
    </>
  );
}
