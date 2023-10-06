import Image from 'next/image';

export default function SchedulingIntro({}) {
  return (
    <>
      <div className='col-start-2 col-end-3 row-start-2 row-end-3 p-2 sm:p-3 bg-sroom-brand md:p-5 xl:p-7'>
        <p className='text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl'>강의 일정 관리</p>
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
        <div className='absolute bottom-0 -right-[0.3px] w-[79%]'>
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
    </>
  );
}
