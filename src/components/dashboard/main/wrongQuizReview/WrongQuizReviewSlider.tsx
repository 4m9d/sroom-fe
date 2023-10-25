'use client';
import { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
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
    <div className='flex items-center col-start-1 col-end-3 row-start-1 row-end-2 px-[5%] rounded-full bg-sroom-brand relative'>
      <Swiper
        className='!py-2 h-full'
        slidesPerView={1}
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
          <SwiperSlide key={idx} className='px-10'>
            <WrongQuizReviewCard wrongQuiz={wrongQuiz} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className='absolute left-0 z-20 flex items-center justify-between w-full px-5 -translate-y-1/2 top-1/2'>
        <SwiperNavigationButton
          className='rounded-full text-sroom-white'
          onClick={() => swiper?.slidePrev()}
          disabled={isFirstSlide}
          navigation='prev'
        />
        <SwiperNavigationButton
          className='rounded-full text-sroom-white'
          onClick={() => swiper?.slideNext()}
          disabled={isLastSlide}
          navigation='next'
        />
      </div>
    </div>
  );
}
