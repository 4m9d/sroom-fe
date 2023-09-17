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
        {activeTab === 'require' &&
          requireReviewList.map((reviewableLecture) => (
            <ReviewableLectureCard
              key={reviewableLecture.lecture_id}
              reviewableLecture={reviewableLecture}
              setEditingLectureId={setEditingLectureId}
              mode='require'
            />
          ))}
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
              <p className='text-base font-normal text-sroom-black-400'>
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