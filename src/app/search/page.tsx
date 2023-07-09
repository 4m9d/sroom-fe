import SearchResultsList from '@/src/components/search/SearchResultsList';

type Props = {
  params: { slug: string };
  searchParams: SearchLectureParams;
};
const LIMIT_PER_FETCH = 10;

export default async function SearchResults({ params, searchParams }: Props) {

  const requestParam: SearchLectureParams = {
    keyword: searchParams.keyword,
    limit: searchParams.limit ?? LIMIT_PER_FETCH
  };

  return (
    <h2 className='mt-20 ml-10 text-4xl'>
      <span className='h-16'>{"'"}</span>
      <span className='inline-block truncate max-w-1/2'>
        {searchParams.keyword}
      </span>
      <span>{"'"}</span>
      <span> 강의 검색 결과</span>
      <SearchResultsList
        keyword={requestParam.keyword}
        limit={requestParam.limit}
      />
    </h2>
  );
}
