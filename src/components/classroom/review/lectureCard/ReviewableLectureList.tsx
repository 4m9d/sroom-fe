import CourseReviewTopNav from '../CourseReviewTopNav';
import ReviewDoneLectureCard from './ReviewDoneLectureCard';
import ReviewableLectureCard from './ReviewableLectureCard';

type Props = {
  activeTab: 'require' | 'done';
  requireReviewList: ReviewableLecture[];
  doneReviewList: ReviewableLecture[];
  setActiveTab: React.Dispatch<React.SetStateAction<'require' | 'done'>>;
  setEditingLectureId: React.Dispatch<React.SetStateAction<number | null>>;
};

export default function ReviewableLectureList({
  activeTab,
  requireReviewList,
  doneReviewList,
  setActiveTab,
  setEditingLectureId
}: Props) {
  return (
    <>
      <div className='flex flex-col items-center justify-center w-full h-full gap-5'>
        <CourseReviewTopNav
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          requireReviewCount={requireReviewList.length}
          doneReviewCount={doneReviewList.length}
        />
        {activeTab === 'require' ? (
          requireReviewList.length > 0 ? (
            requireReviewList.map((reviewableLecture) => (
              <div className='w-full h-full' key={reviewableLecture.lecture_id}>
                {reviewableLecture.is_review_allowed === false &&
                  reviewableLecture.submitted_at === null && (
                    <p className='w-full px-1 mb-2 text-xs text-left text-sroom-brand'>
                      {'강의를 50% 이상 수강하면 후기를 작성할 수 있어요!'}
                    </p>
                  )}
                <ReviewableLectureCard
                  reviewableLecture={reviewableLecture}
                  setEditingLectureId={setEditingLectureId}
                  mode='require'
                />
              </div>
            ))
          ) : (
            <div className='flex items-center justify-center w-full pb-6 border-b h-36 border-b-sroom-gray-500'>
              <p className='text-base font-normal text-sroom-black-200'>
                후기를 등록할 강의가 없어요
              </p>
            </div>
          )
        ) : (
          <></>
        )}
        {activeTab === 'done' ? (
          doneReviewList.length > 0 ? (
            doneReviewList.map((reviewableLecture) => (
              <ReviewDoneLectureCard
                key={reviewableLecture.lecture_id}
                reviewableLecture={reviewableLecture}
              />
            ))
          ) : (
            <div className='flex items-center justify-center w-full pb-6 border-b h-36 border-b-sroom-gray-500'>
              <p className='text-base font-normal text-sroom-black-200'>
                아직 등록된 후기가 없어요
              </p>
            </div>
          )
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
