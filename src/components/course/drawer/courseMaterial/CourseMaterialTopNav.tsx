import { MouseEvent } from 'react';
import TabNav from '@/src/components/ui/TabNav';

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
    <TabNav className='flex justify-center h-20 border-b tab-bordered -top-14 bg-sroom-white text-sroom-black-400 border-b-sroom-gray-500'>
      <li
        id='summary'
        className={`flex items-center justify-center flex-1 cursor-pointer ${
          activeTab === 'summary'
            ? 'border-b-sroom-black-400 border-b-2'
            : 'border-none'
        }`}
      >
        <button
          type='button'
          id='summary'
          onClick={onTabClickHandler}
          className={`tab tab-bordered text-lg transition-colors p-1 border-none w-full ${
            activeTab === 'summary'
              ? 'tab-active font-bold'
              : 'text-sroom-black-100 font-medium'
          }`}
        >
          강의 노트
        </button>
      </li>
      <li
        id='quiz'
        className={`flex items-center justify-center flex-1 cursor-pointer ${
          activeTab === 'quiz'
            ? 'border-b-sroom-black-400 border-b-2'
            : 'border-none'
        }`}
      >
        <button
          type='button'
          id='quiz'
          onClick={onTabClickHandler}
          className={`tab tab-bordered text-lg transition-colors p-1 border-none w-full ${
            activeTab === 'quiz'
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
