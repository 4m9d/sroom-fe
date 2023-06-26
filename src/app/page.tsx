import Link from "next/link";

const STYLE_DESCRIPTION = 'mt-5 ml-16 text-3xl font-semibold';

export default function Main() {
  return (
    <>
      <h2 className='mt-24 ml-16 text-5xl font-bold mb-14'>
        유튜브 강의를 쉽고 편하게.
      </h2>
      <h3 className={STYLE_DESCRIPTION}>나만을 위한 유튜브 강의</h3>
      <h3 className={STYLE_DESCRIPTION}>
        관리 플랫폼 스룸
        <Link href={'/'} className='inline-block px-2 py-1 ml-6 text-lg text-white align-middle bg-black rounded-xl'>
          구글 로그인
        </Link>
      </h3>
    </>
  );
}
