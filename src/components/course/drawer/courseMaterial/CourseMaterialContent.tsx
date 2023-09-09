'use client';
import { useState } from 'react';
import CourseMaterialTopNav from './CourseMaterialTopNav';
import CloseButton from '@/src/components/ui/button/CloseButton';

type Props = {
  drawerHandler: () => void;
};

export default function CourseMaterialContent({ drawerHandler }: Props) {
  const [activeTab, setActiveTab] =
    useState<CourseMaterialType>('lecture-notes');
  return (
    <div className='w-full h-full p-3'>
      <CourseMaterialTopNav activeTab={activeTab} setActiveTab={setActiveTab} />
      <CloseButton onClick={drawerHandler} />
    </div>
  );
}
