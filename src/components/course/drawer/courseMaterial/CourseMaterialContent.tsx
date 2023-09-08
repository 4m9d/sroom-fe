'use client';
import { useState } from 'react';
import CourseMaterialTopNav from './CourseMaterialTopNav';

type Props = {
  drawerHandler: () => void;
};

export default function CourseMaterialContent({drawerHandler}: Props) {
  const [activeTab, setActiveTab] =
    useState<CourseMaterialType>('lecture-notes');
  return (
    <div className='w-full h-full p-3'>
      <CourseMaterialTopNav activeTab={activeTab} setActiveTab={setActiveTab} />
      <button
        type='button'
        onClick={drawerHandler}
        className='absolute z-50 shrink-0 btn btn-sm btn-circle btn-ghost right-3 top-3'
      >
        ✕
      </button>
    </div>
  );
}
