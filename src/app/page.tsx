import GoogleOneTapPortal from '../components/login/GoogleOneTapPortal';
import LoginButton from '../components/login/LoginButton';

export default async function Main() {
  return (
    <div className='px-4 lg:px-24 max-w-screen-2xl pt-[7.5rem] pb-20 mx-auto'>
      <GoogleOneTapPortal />
      <h2 className='mb-5 text-5xl font-bold text-sroom-black-400'>
        유튜브 강의를 쉽고 편하게.
      </h2>
      <h3 className=''>나만을 위한 유튜브 강의</h3>
      <h3 className=''>
        관리 플랫폼 스룸
        <LoginButton />
      </h3>
    </div>
  );
}
