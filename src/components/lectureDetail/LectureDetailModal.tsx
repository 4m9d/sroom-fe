'use client';
import { usePathname, useRouter } from 'next/navigation';
import { Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { ModalIDs } from '@/src/constants/modal/modal';
import { INDEX_LIMIT, REVIEW_LIMIT } from '@/src/constants/skeleton/skeleton';
import { closeModalHandler } from '@/src/util/modal/modalHandler';
import LectureEnrollmentModal from '../lectureEnrollment/LectureEnrollmentModal';
import SchedulingModal from '../lectureEnrollment/SchedulingModal';
import Modal from '../ui/Modal';
import OneStar from '../ui/rating/OneStar';
import LectureDetailCard from './LectureDetailCard';
import LectureDetailHeading from './LectureDetailHeading';
import LectureDetailTabNav from './LectureDetailTabNav';
import LectureDetailIndexCard from './index/LectureDetailIndexCard';
import LectureDetailIndexList from './index/LectureDetailIndexList';
import LectureDetailIndexSkeleton from './index/LectureDetailIndexSkeleton';
import LectureIndexNotice from './index/LectureIndexNotice';
import LectureDetailReviewList from './review/LectureDetailReviewList';
import LectureDetailReviewSkeleton from './review/LectureDetailReviewSkeleton';

type Props = {
  lectureDetail: LectureDetail;
  navigationType: 'soft' | 'hard';
};

export default function LectureDetailModal({
  lectureDetail,
  navigationType
}: Props) {
  const { is_playlist, lecture_code, rating, indexes } = lectureDetail;
  const router = useRouter();
  const pathname = usePathname();
  const reviewPageRef = useRef<number>(0);
  const [isIndexListFetched, setIsIndexListFetched] = useState<boolean>(false);

  const onCloseHandler = useCallback(() => {
    if (navigationType === 'soft') {
      if (pathname.includes('search')) {
        return closeModalHandler('LECTURE_DETAIL', router.back);
      } else {
        return closeModalHandler('LECTURE_DETAIL');
      }
    } else {
      return closeModalHandler('LECTURE_DETAIL', () => {
        router.replace('/dashboard');
        router.refresh();
      });
    }
  }, [navigationType, router, pathname]);

  const isTheOnlyModalInPage = () => {
    return document.querySelectorAll('dialog[open]').length === 1;
  };

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isTheOnlyModalInPage()) {
        onCloseHandler();
      }
    },
    [onCloseHandler]
  );

  useEffect(() => {
    const modal = document.getElementById(
      ModalIDs.LECTURE_DETAIL
    ) as HTMLDialogElement;

    modal.showModal();
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onCloseHandler, handleKeyDown]);

  return (
    <>
      <Modal
        id={ModalIDs.LECTURE_DETAIL}
        className='relative h-full pt-14 p-5 lg:p-14 rounded-none scroll-smooth w-[85vw] md:w-[70vw] lg:w-[65vw] max-w-screen-xl'
        onClose={onCloseHandler}
      >
        <LectureDetailCard
          lectureDetail={lectureDetail}
          onClose={onCloseHandler}
          isIndexListFetched={isIndexListFetched}
        />
        <LectureDetailTabNav is_playlist={is_playlist} />
        <div id='lecture-detail-conatiner'>
          <section id='indexes'>
            <LectureDetailHeading title={'목차'} />
            {is_playlist ? (
              <>
                <Suspense
                  fallback={<LectureDetailIndexSkeleton limit={INDEX_LIMIT} />}
                >
                  <LectureDetailIndexList
                    lectureCode={lecture_code}
                    setIsFetched={setIsIndexListFetched}
                  />
                </Suspense>
              </>
            ) : (
              indexes && (
                <>
                  <LectureIndexNotice
                    duration={lectureDetail.duration as number}
                    lecture_count={1}
                    hasMembersOnly={lectureDetail.is_members_only as boolean}
                  />
                  <LectureDetailIndexCard
                    lectureIndex={indexes.index_list[0]}
                    indexNum={1}
                  />
                </>
              )
            )}
          </section>
          <section id='reviews'>
            <LectureDetailHeading title={'후기'}>
              <div className='flex items-center justify-center gap-1 ml-1'>
                <p>{`(${lectureDetail.review_count})`}</p>
                {lectureDetail.review_count > 0 && (
                  <>
                    <OneStar className='w-5 h-5' />
                    <p className='text-base font-medium text-sroom-brand'>
                      {rating}
                    </p>
                  </>
                )}
              </div>
            </LectureDetailHeading>
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
        </div>
      </Modal>
      {is_playlist && isIndexListFetched === true && (
        <>
          <LectureEnrollmentModal
            lectureDetail={lectureDetail}
            onClose={() => closeModalHandler('LECTURE_ENROLLMENT')}
            onEnrollSuccess={onCloseHandler}
          />
          <SchedulingModal
            lectureDetail={lectureDetail}
            onClose={() => closeModalHandler('SCHEDULING')}
            onEnrollSuccess={onCloseHandler}
          />
        </>
      )}
    </>
  );
}
