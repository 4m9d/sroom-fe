'use client';
import { useQuery } from '@tanstack/react-query';
import LectureDetailIndexCard from './LectureDetailIndexCard';
import { QueryKeys } from '@/src/api/queryKeys';
import { fetchLectureDetailIndex } from '@/src/api/lectures/search';
import { ErrorMessage } from '@/src/api/ErrorMessage';
import { CACHE_TIME, STALE_TIME } from '@/src/constants/query/query';
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

  const PREVIEW_NUM = 5;

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
  const { data, status } = useQuery(
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
    if (status === 'success') {
      setIsFetched(() => true);
      setHasMembersOnly(() => {
        if (!data) return false;
        return data.index_list.some((index) => index.is_members_only === true);
      });
    }
  }, [status, setIsFetched, data]);

  if (status === 'loading') {
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
            {data.index_list.slice(0, PREVIEW_NUM).map((lectureIndex, idx) => (
              <LectureDetailIndexCard
                key={lectureIndex.index}
                lectureIndex={lectureIndex}
                indexNum={idx + 1}
              />
            ))}
            {isCollapsed === false &&
              data.index_list
                .slice(PREVIEW_NUM)
                .map((lectureIndex, idx) => (
                  <LectureDetailIndexCard
                    key={lectureIndex.index}
                    lectureIndex={lectureIndex}
                    indexNum={idx + PREVIEW_NUM + 1}
                  />
                ))}
          </ul>
          {data.index_list.length > PREVIEW_NUM && isCollapsed ? (
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
