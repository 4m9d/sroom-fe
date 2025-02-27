'use client';
import { useEffect, useRef, useState } from 'react';
import SwiperCore from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import SwiperNavigationButton from '@/src/components/ui/button/SwiperNavigationButton';
import WrongQuizReviewCard from './WrongQuizReviewCard';

type Props = {
  wrongQuizzes: WrongQuiz[];
};

export default function WrongQuizReviewSlider({ wrongQuizzes }: Props) {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  const [swiper, setSwiper] = useState<SwiperCore>();
  const [isFirstSlide, setIsFirstSlide] = useState<boolean>(true);
  const [isLastSlide, setIsLastSlide] = useState<boolean>(false);
  const [currPageIdx, setCurrPageIdx] = useState(1);
  const [mode, setMode] = useState<'question' | 'answer'>('question');

  const totalPage = wrongQuizzes.length;

  useEffect(() => {
    if (currPageIdx === totalPage) {
      setIsLastSlide(true);
    } else {
      setIsLastSlide(false);
    }
    if (currPageIdx === 1) {
      setIsFirstSlide(true);
    } else {
      setIsFirstSlide(false);
    }
  }, [totalPage, currPageIdx]);

  return (
    <div
      className={`flex items-center col-start-1 col-end-3 row-start-1 row-end-2 px-[5%] rounded-full relative ${
        mode === 'question'
          ? 'bg-sroom-brand'
          : 'answer'
          ? 'bg-sroom-black-200'
          : ''
      }`}
    >
      {wrongQuizzes.length > 0 && (
        <>
          <Swiper
            className='w-11/12'
            slidesPerView={1}
            preventClicks={false}
            preventClicksPropagation={false}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current
            }}
            onBeforeInit={(swiper) => {
              setSwiper(swiper);
            }}
            onSlideChange={(swiper) => {
              setCurrPageIdx(() => swiper.activeIndex + 1);
            }}
          >
            {wrongQuizzes.map((wrongQuiz, idx) => (
              <SwiperSlide
                key={idx}
                className='self-center h-full p-1 whitespace-normal'
              >
                <WrongQuizReviewCard
                  wrongQuiz={wrongQuiz}
                  mode={mode}
                  setMode={setMode}
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className='absolute left-0 flex items-center justify-between w-full -translate-y-1/2 md:px-2 top-1/2'>
            <SwiperNavigationButton
              className='rounded-full text-sroom-white'
              onClick={() => {
                swiper?.slidePrev();
                setMode('question');
              }}
              disabled={isFirstSlide}
              navigation='prev'
            />
            <SwiperNavigationButton
              className='rounded-full text-sroom-white'
              onClick={() => {
                swiper?.slideNext();
                setMode('question');
              }}
              disabled={isLastSlide}
              navigation='next'
            />
          </div>
        </>
      )}
      {wrongQuizzes.length === 0 && (
        <p className='flex items-center text-xs font-medium break-keep md:text-sm xl:text-base text-sroom-white animate-pulse'>
          {'틀린 퀴즈가 생기면, 여기서 복습할 수 있어요 :)'}
        </p>
      )}
    </div>
  );
}
