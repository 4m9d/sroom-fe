'use client';
import useToast from '@/src/hooks/useToast';
import { fetchLectureDetailReview } from '@/src/api/lectures/search';
import { ErrorMessage } from '@/src/api/ErrorMessage';
import LoadMoreButton from '../../ui/LoadMoreButton';
import { useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { QueryKeys } from '@/src/api/queryKeys';
import {
  STALE_TIME,
  CACHE_TIME,
  REVIEW_LIMIT
} from '@/src/constants/detail/detail';
import LectureDetailReviewCard from './LectureDetailReviewCard';

type Props = {
  lectureCode: string;
};

export default async function LectureDetailReviewList({ lectureCode }: Props) {
  const { setErrorToast } = useToast();
  const [offset, setOffset] = useState(0);

  const fetchLectureReviewList = async () => {
    const params: LectureDeatilParams = {
      review_only: true,
      review_offset: offset,
      review_limit: REVIEW_LIMIT
    };
    return await fetchLectureDetailReview(lectureCode, params)
      .then((res) => {
        setOffset((prev) => prev + (res.length ? res.length : 0));
        return res;
      })
      .catch(() => {
        setErrorToast(new Error(ErrorMessage.DETAIL_REVIEW));
        return null;
      });
  };

  const { data, fetchNextPage } = useInfiniteQuery(
    [QueryKeys.LECTURE_REVIEW, lectureCode],
    fetchLectureReviewList,
    {
      refetchOnWindowFocus: false,
      suspense: true,
      staleTime: STALE_TIME,
      cacheTime: CACHE_TIME,
      getNextPageParam: (lastPage) => true
    }
  );

  return (
    <>
      <ul className='grid grid-cols-1'>
        {data?.pages.map((page) =>
          page?.map((lectureReview) => (
            <LectureDetailReviewCard
              key={lectureReview.index}
              lectureReview={lectureReview}
            />
          ))
        )}
      </ul>
      <div className='flex justify-center my-10 mb-20'>
        <LoadMoreButton onClick={fetchNextPage} />
      </div>
    </>
  );
}
