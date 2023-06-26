import MainDescription from '../components/heading/MainDescription';
import MainHeading from '../components/heading/MainHeading';

export default function Main() {
  return (
    <>
      <MainHeading content={'유튜브 강의를 쉽고 편하게.'} />
      <MainDescription content={'나만을 위한 유튜브 강의'} />
      <MainDescription content={' 관리 플랫폼 스룸'} />
    </>
  );
}
