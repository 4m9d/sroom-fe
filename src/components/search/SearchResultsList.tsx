'use client';
import { fetchLecturesByKeyword } from '@/src/api/lectures/search';
import useToast from '@/src/hooks/useToast';
import { getAuthorizationHeaderFromClient } from '@/src/util/getAuthorizationHeader';
import { useCallback, useEffect, useState } from 'react';

export default async function SearchResultsList(
  requestParam: SearchLectureParams
) {
  //const [results, setResults] = useState<Lecture[]>([]);
  const { errorHandler } = useToast();
  const fetchSearchResults = useCallback(
    async (header: Headers) => {
      return await fetchLecturesByKeyword(requestParam, header)
        .then((res) => {
          return res as SearchResultsList;
        })
        .catch((err) => {
          errorHandler(err);
        });
    },
    [requestParam, errorHandler]
  );

  const header = await getAuthorizationHeaderFromClient();

  /*  useEffect(() => {
    fetchSearchResults().then((res) => {
      console.log(res)
      setResults((prev) => [...prev, res?.lectures] as Lecture[]);
    });
  }, []); */

  return <div>hihi</div>;
}
