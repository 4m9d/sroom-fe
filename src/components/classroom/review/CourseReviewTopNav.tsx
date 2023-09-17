type Props = {
  activeTab: 'require' | 'done';
  setActiveTab: React.Dispatch<React.SetStateAction<'require' | 'done'>>;
  requireReviewCount: number;
  doneReviewCount: number;
};

export default function CourseReviewTopNav({
  activeTab,
  setActiveTab,
  requireReviewCount,
  doneReviewCount
}: Props) {
  return (
    <div className='w-full h-[41px] border-b border-b-sroom-gray-500'>
      <button
        onClick={() => setActiveTab('require')}
        className={`w-36 h-10 font-medium text-sm border-l border-t border-sroom-gray-50 ${
          activeTab === 'require'
            ? 'bg-sroom-black-400 text-sroom-white'
            : 'text-sroom-black-100'
        }`}
      >
        {`작성 가능한 리뷰 (${requireReviewCount})`}
      </button>
      <button
        onClick={() => setActiveTab('done')}
        className={`w-36 h-10 font-medium text-sm border-l border-t border-r border-sroom-gray-50 ${
          activeTab === 'done'
            ? 'bg-sroom-black-400 text-sroom-white'
            : 'text-sroom-black-100'
        }`}
      >
        {`등록된 리뷰 (${doneReviewCount})`}
      </button>
    </div>
  );
}
