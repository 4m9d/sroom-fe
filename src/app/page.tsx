'use client';
import GoogleOneTapPortal from '../components/login/GoogleOneTapPortal';
import LoginButton from '../components/login/LoginButton';
import ServiceIntro from '../components/main/ServiceIntro';
import { BROWSER_MIN_WIDTH } from '../constants/window/window';
import useWindowSize from '../hooks/useWindowSize';

export default function Main() {
  const { width: windowWidth } = useWindowSize();

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
          <span className='ml-1 text-sroom-brand'>스룸</span>
        </h3>
        {windowWidth < BROWSER_MIN_WIDTH ? (
          <div className='mt-3 mb-5 text-sm font-medium opacity-80 text-sroom-brand'>
            <p>{'스룸은 태블릿과 PC에 최적화 되어있어요 :)'}</p>
            <p>{'더 쾌적한 환경에서 스룸을 만나보세요!'}</p>
          </div>
        ) : (
          <LoginButton />
        )}
      </div>
      <ServiceIntro />
    </div>
  );
}
