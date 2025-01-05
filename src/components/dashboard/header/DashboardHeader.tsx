'use client';
import Image from 'next/image';
import { ExtendedRecordMap } from 'notion-types';
import { useState } from 'react';
import {
  search,
  calendarDashboard,
  quizDashboard
} from '@/public/images/images';
import { SERVICE_GUIDE } from '@/src/constants/serviceGuides/serviceGuides';
import { showModalHandler } from '@/src/util/modal/modalHandler';
import GuideBox from './GuideBox';
import ServiceGuideModal from './ServiceGuideModal';

type Props = {
  isExistingUser: boolean;
  recordMapList: ExtendedRecordMap[];
};

export default function DashboardHeader({
  isExistingUser,
  recordMapList
}: Props) {
  const [selectedGuide, setSelectedGuide] = useState<number>(0);

  const boxClickHandler = (service: (typeof SERVICE_GUIDE)[number]['type']) => {
    const idx = SERVICE_GUIDE.findIndex((guide) => guide.type === service);
    setSelectedGuide(() => idx);
    showModalHandler('SERVICE_GUIDE');
  };

  return (
    <>
      <div className='bg-sroom-gray-200 h-[23rem] lg:h-[36rem] text-sroom-black-400'>
        <section className='flex flex-col justify-between h-full max-w-screen-xl px-4 pt-12 mx-auto lg:px-24 lg:pt-20'>
          <div className='flex flex-col items-center'>
            <h2 className='mb-3 text-2xl font-bold md:mb-5 lg:mb-10 md:text-3xl lg:text-4xl xl:text-5xl'>
              반가워요!
            </h2>
            <h3 className='flex flex-col items-center text-base font-normal md:text-lg text-sroom-black-200'>
              <p>유튜브에 저장만 해놨던 강의, 듣다가 중간에 포기해 버린 강의</p>
              <p>이젠 스룸과 함께 체계적으로 학습을 시작해 보세요</p>
              <p className='mt-3 text-xs md:mt-4 lg:mt-7 md:text-sm text-sroom-black-100'>
                아래 섹션을 클릭하면 스룸의 서비스 이용 가이드를 볼 수 있어요
              </p>
            </h3>
          </div>
          <div className='flex items-end justify-between w-full gap-7'>
            <GuideBox
              title='스마트한'
              description='유튜브 강의 검색 및 추천'
              onClick={() => boxClickHandler('SEARCH')}
            >
              <div className='absolute bottom-4 right-4 lg:bottom-7 lg:right-7 w-[47%]'>
                <div className='pb-[38.88%] relative object-cover'>
                  <Image
                    className='transition-all lg:opacity-0 group-hover:opacity-100 group-hover:-translate-y-2'
                    src={search.default.src}
                    alt='검색창'
                    fill={true}
                    quality={100}
                  />
                </div>
              </div>
            </GuideBox>
            <GuideBox
              title='체계적인'
              description='학습 일정 관리'
              onClick={() => boxClickHandler('SCHEDULING')}
            >
              <div className='absolute bottom-4 right-4 lg:bottom-7 lg:right-7 w-[43%]'>
                <div className='pb-[56.62%] relative object-cover'>
                  <Image
                    className='transition-all lg:opacity-0 group-hover:opacity-100 group-hover:-translate-y-2'
                    src={calendarDashboard.default.src}
                    alt='달력'
                    fill={true}
                    quality={100}
                  />
                </div>
              </div>
            </GuideBox>
            <GuideBox
              title='쪽집게 AI가 생성한'
              description='퀴즈･강의 노트'
              onClick={() => boxClickHandler('MATERIALS')}
            >
              <div className='absolute bottom-4 right-4 lg:bottom-7 lg:right-7 w-[42%]'>
                <div className='pb-[46.30%] relative object-cover'>
                  <Image
                    className='transition-all lg:opacity-0 group-hover:opacity-100 group-hover:-translate-y-2'
                    src={quizDashboard.default.src}
                    alt='퀴즈'
                    fill={true}
                    quality={100}
                  />
                </div>
              </div>
            </GuideBox>
          </div>
        </section>
      </div>
      <ServiceGuideModal recordMap={recordMapList[selectedGuide]} />
    </>
  );
}
