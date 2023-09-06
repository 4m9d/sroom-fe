import Image from 'next/image';

export default function CourseMaterialIntro({}) {
  return (
    <>
      <div className='flex items-center col-start-3 col-end-4 row-start-1 row-end-2 pl-3 md:pl-5 xl:pl-7 bg-sroom-black-300'>
        <p className='text-[5px] sm:text-sm md:text-base lg:text-lg xl:text-xl'>
          퀴즈 강의노트
        </p>
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
    </>
  );
}
