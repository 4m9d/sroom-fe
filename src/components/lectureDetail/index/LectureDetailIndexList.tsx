'use client';
import { useQuery } from '@tanstack/react-query';
import LectureDetailIndexCard from './LectureDetailIndexCard';
import { QueryKeys } from '@/src/api/queryKeys';
import { fetchLectureDetailIndex } from '@/src/api/lectures/search';
import { ErrorMessage } from '@/src/api/ErrorMessage';
import {
  CACHE_TIME,
  STALE_TIME
} from '@/src/constants/query/query';
import LoadMoreButton from '../../ui/button/LoadMoreButton';
import setErrorToast from '@/src/util/toast/setErrorToast';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import LectureIndexNotice from './LectureIndexNotice';
import LectureDetailIndexSkeleton from './LectureDetailIndexSkeleton';

export default async function LectureDetailIndexList({
  lectureCode,
  setIsFetched
}: {
  lectureCode: string;
  setIsFetched: Dispatch<SetStateAction<boolean>>;
}) {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);
  const [hasMembersOnly, setHasMembersOnly] = useState<boolean>(false);

  const fetchLectureIndexList = async () => {
    const params: LectureDeatilParams = {
      index_only: true
    };

    return await fetchLectureDetailIndex(lectureCode, params)
      .then((res) => {
        return res;
      })
      .catch(() => {
        setErrorToast(new Error(ErrorMessage.DETAIL_INDEX));
        return null;
      });
  };
  const { data, isFetched } = useQuery(
    [QueryKeys.LECTURE_INDEX, lectureCode],
    fetchLectureIndexList,
    {
      refetchOnWindowFocus: false,
      suspense: true,
      staleTime: STALE_TIME,
      cacheTime: CACHE_TIME
    }
  );

  useEffect(() => {
    if (isFetched) {
      setIsFetched(true);
      setHasMembersOnly(() => {
        if (!data) return false;
        return data.index_list.some((index) => index.is_members_only === true);
      });
    }
  }, [isFetched, setIsFetched, data]);

  if (isFetched === false) {
    return <LectureDetailIndexSkeleton limit={5} />;
  }

  return (
    <>
      {data?.index_list && (
        <>
          <LectureIndexNotice
            duration={data.duration as number}
            lecture_count={data.lecture_count as number}
            hasMembersOnly={hasMembersOnly}
          />

          <ul className='grid grid-cols-1 gap-4'>
            {data.index_list.slice(0, 5).map((lectureIndex, idx) => (
              <LectureDetailIndexCard
                key={lectureIndex.index}
                lectureIndex={lectureIndex}
                indexNum={idx + 1}
              />
            ))}
            {isCollapsed === false &&
              data.index_list
                .slice(5)
                .map((lectureIndex, idx) => (
                  <LectureDetailIndexCard
                    key={lectureIndex.index}
                    lectureIndex={lectureIndex}
                    indexNum={idx + 1}
                  />
                ))}
          </ul>
          {data.index_list.length > 5 && isCollapsed ? (
            <div className='flex justify-center my-10'>
              <LoadMoreButton
                title='목차 펼치기'
                onClick={() => {
                  setIsCollapsed(() => false);
                }}
              />
            </div>
          ) : null}
        </>
      )}
    </>
  );
}
