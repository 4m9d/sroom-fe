import GoogleOneTapPortal from '../components/login/GoogleOneTapPortal';
import LoginButton from '../components/login/LoginButton';
import ServiceIntro from '../components/main/ServiceIntro';

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
      <ServiceIntro />
    </div>
  );
}
