'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import 'swiper/css';
import 'swiper/css/mousewheel';
import SectionHeading from '../ui/SectionHeading';
import LectureRecommendationsCard from './LectureRecommendationsCard';
import useWindowSize from '@/src/hooks/useWindowSize';
import SwiperNavigationButton from '../ui/button/SwiperNavigationButton';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '@/src/api/queryKeys';
import { fetchLectureRecommendations } from '@/src/api/lectures/search';
import { CACHE_TIME, STALE_TIME } from '@/src/constants/query/query';
import { RECOMMENDATION_BREAKPOINT_LG, RECOMMENDATION_BREAKPOINT_SM } from '@/src/constants/window/window';

export default function LectureRecommendationsList() {
  const windowSize = useWindowSize();
  const router = useRouter();
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const [swiper, setSwiper] = useState<SwiperCore>();
  const [currPageIdx, setCurrPageIdx] = useState(1);
  const [isFirstSlide, setIsFirstSlide] = useState<boolean>(true);
  const [isLastSlide, setIsLastSlide] = useState<boolean>(false);

  const { data } = useQuery(
    [QueryKeys.RECCOMENDATION],
    fetchLectureRecommendations,
    {
      cacheTime: CACHE_TIME,
      staleTime: STALE_TIME,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false
    }
  );

  const { recommendations } = data || { recommendations: [] };

  const slidesPerView =
    windowSize.width < RECOMMENDATION_BREAKPOINT_SM ? 1 : windowSize.width < RECOMMENDATION_BREAKPOINT_LG ? 2 : 3;
  const totalPage =
    recommendations.length - (slidesPerView - 1) > 0
      ? recommendations.length - (slidesPerView - 1)
      : 1;

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
    <>
      {recommendations.length > 0 && (
        <section className='px-4 mx-auto my-20 lg:px-24 max-w-screen-2xl min-h-12'>
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
                  {currPageIdx} / {totalPage}
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
      )}
    </>
  );
}
