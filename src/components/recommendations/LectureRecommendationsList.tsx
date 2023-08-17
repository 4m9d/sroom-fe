'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import 'swiper/css';
import 'swiper/css/mousewheel';
import SectionHeading from '../ui/SectionHeading';
import LectureRecommendationsCard from './LectureRecommendationsCard';
import useWindowSize from '@/src/hooks/useWindowSize';
import SwiperNavigationButton from '../ui/button/SwiperNavigationButton';
import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

type Props = {
  recommendations: PersonalizedLecture[];
};

export default function LectureRecommendationsList({ recommendations }: Props) {
  const windowSize = useWindowSize();
  const router = useRouter();
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const [swiper, setSwiper] = useState<SwiperCore>();
  const [isFirstSlide, setIsFirstSlide] = useState<boolean>(true);
  const [isLastSlide, setIsLastSlide] = useState<boolean>(false);

  return (
    <section className='px-20 mx-auto my-20 max-w-screen-2xl'>
      <SectionHeading title='이런 강의는 어때요?' />
      <div className='relative'>
        <Swiper
          className='!py-2'
          slidesPerView={
            windowSize.width < 1000 ? 1 : windowSize.width < 1400 ? 2 : 3
          }
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current
          }}
          onBeforeInit={(swiper) => {
            setSwiper(swiper);
          }}
          onSlideChange={(swiper) => {
            swiper.isEnd ? setIsLastSlide(true) : setIsLastSlide(false);
            swiper.isBeginning ? setIsFirstSlide(true) : setIsFirstSlide(false);
          }}
        >
          {recommendations.map((lecture) => (
            <SwiperSlide
              key={lecture.lecture_code}
              className='!flex justify-center'
            >
              <div
                onClick={() => {
                  router.refresh();
                  router.push(`/search/${lecture.lecture_code}`);
                }}
              >
                <LectureRecommendationsCard lecture={lecture} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        {!isFirstSlide && (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className='absolute z-10 top-1/3 -left-16'
            >
              <SwiperNavigationButton
                onClick={() => swiper?.slidePrev()}
                navigation='prev'
              />
            </motion.div>
          </AnimatePresence>
        )}
        {!isLastSlide && (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className='absolute z-10 top-1/3 -right-16'
            >
              <SwiperNavigationButton
                onClick={() => swiper?.slideNext()}
                navigation='next'
              />
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </section>
  );
}
