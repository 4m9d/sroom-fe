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
  const [currPageIdx, setCurrPageIdx] = useState(1);
  const [isFirstSlide, setIsFirstSlide] = useState<boolean>(true);
  const [isLastSlide, setIsLastSlide] = useState<boolean>(false);
  const slidesPerView =
    windowSize.width < 800 ? 1 : windowSize.width < 1400 ? 2 : 3;

  return (
    <section className='px-4 mx-auto my-20 lg:px-24 max-w-screen-2xl'>
      <SectionHeading title='이런 강의는 어때요?' />
      <div className='relative'>
        <Swiper
          className='!py-2'
          slidesPerView={slidesPerView}
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
            setCurrPageIdx(() => swiper.activeIndex + 1);
          }}
        >
          {recommendations.map((lecture) => (
            <SwiperSlide
              key={lecture.lecture_code}
              className='!flex justify-between'
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
        <div className='flex items-center justify-center gap-10 mt-3'>
          <SwiperNavigationButton
            onClick={() => swiper?.slidePrev()}
            disabled={isFirstSlide}
            navigation='prev'
          />
          <div>
            <span>
              {currPageIdx} / {recommendations.length - (slidesPerView - 1)}
            </span>
          </div>
          <SwiperNavigationButton
            disabled={isLastSlide}
            onClick={() => swiper?.slideNext()}
            navigation='next'
          />
        </div>
      </div>
    </section>
  );
}
