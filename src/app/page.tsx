import Image from 'next/image';
import GoogleOneTapPortal from '../components/login/GoogleOneTapPortal';
import LoginButton from '../components/login/LoginButton';
import {
  MOTIVATION_GENERAL,
  MOTIVATION_SPECIFIC
} from '../constants/main/main';

export default async function Main() {
  return (
    <div className='px-4 pt-16 pb-20 mx-auto lg:px-24 max-w-screen-2xl'>
      <GoogleOneTapPortal />
      <h2 className='mb-2 text-3xl font-bold md:mb-5 md:text-4xl xl:text-5xl text-sroom-black-400'>
        유튜브 강의를 쉽고 편하게.
      </h2>
      <div className='text-lg md:text-2xl xl:text-3xl text-sroom-black-300'>
        <h3 className='font-normal'>나만을 위한 유튜브 강의</h3>
        <h3 className='font-bold'>
          관리 플랫폼
          <span className='text-sroom-brand'> 스룸</span>
        </h3>
        <LoginButton />
      </div>
      <div className='relative pb-[51.75%] w-full text-sroom-white text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-bold'>
        <div className='absolute w-full h-full'>
          <div className='grid grid-cols-[repeat(3,_minmax(0,3fr))] grid-rows-[0.6fr_repeat(4,_minmax(0,1fr))] gap-x-2 gap-y-1 lg:gap-x-4 lg:gap-y-3 w-full h-full'>
            <div className='relative col-start-1 col-end-2 row-start-2 row-end-5 bg-sroom-black-300'>
              <div className='p-3 md:p-5 xl:p-7'>
                <p>유튜브 강의 등록</p>
              </div>
              <div className='absolute bottom-0 right-0 w-[82%]'>
                <div className='pb-[91.15%] relative object-cover'>
                  <Image
                    src={'/image/main/enrollment.webp'}
                    alt='강의 등록'
                    fill={true}
                    quality={80}
                  />
                </div>
              </div>
            </div>
            <div className='flex flex-col justify-center col-start-1 col-end-2 row-start-5 row-end-6 overflow-hidden bg-sroom-black-300 flex-[0_0_auto] flex-nowrap p-3 md:p-5 xl:p-7'>
              <div className='flex gap-2 flex-nowrap whitespace-nowrap flex-[0_0_auto] animate-flow-medium'>
                {MOTIVATION_GENERAL.map((item, index) => (
                  <p key={index}>{item}</p>
                ))}
              </div>
              <div className='flex gap-2 flex-nowrap whitespace-nowrap flex-[0_0_auto] animate-flow-slow'>
                {MOTIVATION_SPECIFIC.map((item, index) => (
                  <p key={index}>{item}</p>
                ))}
              </div>
            </div>
            <div className='col-start-2 col-end-3 row-start-2 row-end-3 p-3 bg-sroom-brand md:p-5 xl:p-7'>
              <p>강의 일정 관리</p>
            </div>
            <div className='relative col-start-2 col-end-3 row-start-3 row-end-6 bg-sroom-brand'>
              <div className='absolute top-0 left-0 w-full'>
                <div className='pb-[54.35%] relative object-cover'>
                  <Image
                    src={'/image/main/scheduling.webp'}
                    alt='일정 관리'
                    fill={true}
                    quality={80}
                  />
                </div>
              </div>
              <div className='absolute bottom-0 right-0 w-[79%]'>
                <div className='pb-[56.5%] relative object-cover'>
                  <Image
                    src={'/image/main/calendar.webp'}
                    alt='달력'
                    fill={true}
                    quality={80}
                  />
                </div>
              </div>
            </div>
            <div className='flex items-center col-start-3 col-end-4 row-start-1 row-end-2 pl-3 md:pl-5 xl:pl-7 bg-sroom-black-300'>
              <p>퀴즈 강의노트</p>
            </div>
            <div className='relative col-start-3 col-end-4 row-start-2 row-end-5 bg-sroom-black-300'>
              <div className='absolute bottom-0 right-0 w-[94%]'>
                <div className='pb-[96.2%] relative object-cover'>
                  <Image
                    src={'/image/main/quiz.webp'}
                    alt='퀴즈 강의노트'
                    fill={true}
                    quality={80}
                  />
                </div>
              </div>
            </div>
            <div className='flex items-center col-start-3 col-end-4 row-start-5 row-end-6 text-base justify-evenly bg-sroom-black-300 sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl'>
              <p className='animate-bounce'>🤯 🤬 🚫</p>
              <p className='animate-[bounce_1s_infinite_0.5s]'>💻 👀 💯</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
