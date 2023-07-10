'use client';
import { fetchLecturesByKeyword } from '@/src/api/lectures/search';
import { QueryKeys } from '@/src/api/queryKeys';
import useToast from '@/src/hooks/useToast';
import { useQuery } from '@tanstack/react-query';

export default async function SearchResultsList(
  requestParam: SearchLectureParams
) {
  const fetchSearchResults = async () => {
    console.log('hihi')
    return await fetchLecturesByKeyword(requestParam)
      .then((res) => {
        return res as SearchResultsList;
      })
      .catch((err) => {
        errorHandler(err);
        return null;
      });
  }
  const results = useQuery([QueryKeys.SEARCH], fetchSearchResults);
  const { errorHandler } = useToast();

  return <div>hihi</div>;
}
