import Image from 'next/image';
import GuideBox from './GuideBox';

type Props = {
  isEnrolled: boolean;
};

export default function DashboardHeader({ isEnrolled }: Props) {
  if (isEnrolled) {
    return (
      <section className='px-4 mx-auto lg:px-24 pt-14 text-sroom-black-400 max-w-screen-2xl'>
        <h2 className='text-3xl font-bold lg:text-4xl md:mb-2 lg:mb-3'>
          안녕하세요!
        </h2>
        <h3 className='text-2xl font-bold lg:text-3xl'>
          거 참 공부하기 딱 좋은 날씨네요 😉
        </h3>
      </section>
    );
  } else {
    return (
      <div className='bg-sroom-gray-200 h-[23rem] lg:h-[36rem] text-sroom-black-400'>
        <section className='flex flex-col justify-between h-full px-4 pt-12 mx-auto lg:px-24 lg:pt-20 max-w-screen-2xl'>
          <div className='flex flex-col items-center'>
            <h2 className='mb-5 text-4xl font-bold lg:text-5xl'>반가워요!</h2>
            <h3 className='flex flex-col items-center text-lg font-normal text-sroom-black-200'>
              <p>유튜브에 저장만 해놨던 강의, 듣다가 중간에 포기해버린 강의</p>
              <p>이젠 스룸과 함께 체계적으로 학습을 시작해 보세요!</p>
            </h3>
          </div>
          <div className='flex items-end justify-between w-full gap-7'>
            <GuideBox title='스마트한' description='유튜브 강의 검색･추천'>
              <div className='absolute bottom-4 right-4 lg:bottom-7 lg:right-7 w-20 lg:w-[11.25rem]'>
                <div className='pb-[38.88%] relative object-cover'>
                  <Image
                    className='transition-all lg:opacity-0 group-hover:opacity-100 group-hover:-translate-y-2'
                    src={'/image/main/search.webp'}
                    alt='검색창'
                    fill={true}
                    quality={100}
                  />
                </div>
              </div>
            </GuideBox>
            <GuideBox title='체계적인' description='학습 일정 관리'>
              <div className='absolute bottom-4 right-4 lg:bottom-7 lg:right-7 w-[5.78rem] lg:w-[10.37rem]'>
                <div className='pb-[56.62%] relative object-cover'>
                  <Image
                    className='transition-all lg:opacity-0 group-hover:opacity-100 group-hover:-translate-y-2'
                    src={'/image/main/calendar.webp'}
                    alt='달력'
                    fill={true}
                    quality={100}
                  />
                </div>
              </div>
            </GuideBox>
            <GuideBox title='쪽집게 AI가 생성한' description='퀴즈･요약본'>
              <div className='absolute bottom-4 right-4 lg:bottom-7 lg:right-7 w-[5.10rem] lg:w-[10.12rem]'>
                <div className='pb-[46.30%] relative object-cover'>
                  <Image
                    className='transition-all lg:opacity-0 group-hover:opacity-100 group-hover:-translate-y-2'
                    src={'/image/main/quiz.webp'}
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
    );
  }
}
