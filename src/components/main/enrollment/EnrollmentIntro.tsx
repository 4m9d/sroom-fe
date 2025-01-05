import Image from 'next/image';
import { enrollment } from '@/public/images/images';

export default function EnrollmentIntro({}) {
  return (
    <div className='relative col-start-1 col-end-2 row-start-2 row-end-5 bg-sroom-black-300'>
      <div className='p-2 sm:p-3 md:p-5 xl:p-7'>
        <p className='text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl'>
          유튜브 강의 등록
        </p>
      </div>
      <div className='absolute bottom-0 right-0 w-[82%]'>
        <div className='pb-[91.08%] relative object-cover'>
          <Image
            src={enrollment.default.src}
            alt='강의 등록'
            fill={true}
            quality={80}
          />
        </div>
      </div>
    </div>
  );
}
