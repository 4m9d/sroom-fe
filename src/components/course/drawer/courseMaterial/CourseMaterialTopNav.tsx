import TabNav from '@/src/components/ui/TabNav';
import { MouseEvent } from 'react';

type Props = {
  activeTab: CourseMaterialType;
  setActiveTab: React.Dispatch<React.SetStateAction<CourseMaterialType>>;
};
export default function CourseMaterialTopNav({
  activeTab,
  setActiveTab
}: Props) {
  const onTabClickHandler = (e: MouseEvent) => {
    const buttonID = e.currentTarget.id as CourseMaterialType;
    setActiveTab(buttonID);
  };
  return (
    <TabNav className='sticky z-10 flex justify-center h-16 border-b tab-bordered -top-14 bg-sroom-white text-sroom-black-400 border-b-sroom-gray-500'>
      <li
        id='lecture-notes'
        className={`flex items-center justify-center flex-1 ${
          activeTab === 'lecture-notes'
            ? 'border-b-sroom-black-400 border-b-2'
            : 'border-none'
        }`}
      >
        <button
          type='button'
          id='lecture-notes'
          onClick={onTabClickHandler}
          className={`tab tab-bordered text-lg transition-colors p-1 border-none w-full ${
            activeTab === 'lecture-notes'
              ? 'tab-active font-bold'
              : 'text-sroom-black-100 font-medium'
          }`}
        >
          강의 노트
        </button>
      </li>
      <li
        id='quizzes'
        className={`flex items-center justify-center flex-1 ${
          activeTab === 'quizzes'
            ? 'border-b-sroom-black-400 border-b-2'
            : 'border-none'
        }`}
      >
        <button
          type='button'
          id='quizzes'
          onClick={onTabClickHandler}
          className={`tab tab-bordered text-lg transition-colors p-1 border-none w-full ${
            activeTab === 'quizzes'
              ? 'tab-active font-bold'
              : 'text-sroom-black-100 font-medium'
          }`}
        >
          퀴즈
        </button>
      </li>
    </TabNav>
  );
}
