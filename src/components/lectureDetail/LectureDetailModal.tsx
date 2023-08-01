'use client';
import { useRouter } from 'next/navigation';
import Modal from '../ui/Modal';
import LectureDetailTabNav from './LectureDetailTabNav';
import { Suspense, useRef } from 'react';
import LectureDetailIndexList from './index/LectureDetailIndexList';
import LectureDetailReviewList from './review/LectureDetailReviewList';
import LectureDetailCard from './LectureDetailCard';
import LectureDetailIndexSkeleton from './index/LectureDetailIndexSkeleton';
import {
  INDEX_SKELETON_LIMIT,
  REVIEW_LIMIT
} from '@/src/constants/lectureDetail/lectureDetail';
import LectureDetailHeading from './LectureDetailHeading';
import LectureDetailReviewSkeleton from './review/LectureDetailReviewSkeleton';

type Props = {
  lectureDetail: LectureDetail;
  navigationType: 'soft' | 'hard';
};

export default function LectureDetailModal({
  lectureDetail,
  navigationType
}: Props) {
  const { is_playlist, lecture_code } = lectureDetail;
  const router = useRouter();
  const onCloseHandler =
    navigationType === 'soft' ? router.back : () => router.replace('/');
  const indexPageRef = useRef<number>(0);
  const reviewPageRef = useRef<number>(0);

  return (
    <Modal
      id='modal'
      className='relative h-full rounded-none scroll-smooth'
      onClose={onCloseHandler}
    >
      <LectureDetailCard lectureDetail={lectureDetail} />
      <LectureDetailTabNav is_playlist={is_playlist} />
      <section id='indexes'>
        {is_playlist && (
          <>
            <LectureDetailHeading title={'목차'} />
            <Suspense
              fallback={
                <LectureDetailIndexSkeleton
                  indexPageRef={indexPageRef}
                  limit={INDEX_SKELETON_LIMIT}
                />
              }
            >
              <LectureDetailIndexList
                indexPageRef={indexPageRef}
                lectureCode={lecture_code}
              />
            </Suspense>
          </>
        )}
      </section>
      <section id='reviews'>
        <LectureDetailHeading title={'후기'} />
        <Suspense
          fallback={
            <LectureDetailReviewSkeleton
              reviewPageRef={reviewPageRef}
              limit={REVIEW_LIMIT}
            />
          }
        >
          <LectureDetailReviewList
            reviewPageRef={reviewPageRef}
            lectureCode={lecture_code}
          />
        </Suspense>
      </section>
    </Modal>
  );
}
