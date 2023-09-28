'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Footer({}) {
  const currentRoute = usePathname();

  if (currentRoute.startsWith('/course')) return null;
  return (
    <footer className='pt-5 pb-16 border px-11 bg-sroom-gray-300 border-t-sroom-gray-400'>
      <div
        className='mx-auto max-w-7xlname: Set up Docker Buildx
        uses: docker/setup-buildx-action@v1 # buildx 설정'
      >
        <ul className='flex flex-wrap justify-center w-full gap-4 mb-12 text-sm text-sroom-black-400'>
          <li>이용약관</li>
          <li className='font-bold'>개인정보처리방침</li>
          <li>문의하기</li>
          <li className='font-medium'>© 4M9D.</li>
        </ul>
        <div className='flex flex-col gap-3'>
          <Image
            src={'/logo/logo_en.svg'}
            alt='스룸 로고'
            className='grayscale'
            width={100}
            height={30}
          />
          <address className='flex flex-col gap-1 text-xs text-sroom-black-100'>
            <div>대표자 이종준</div>
            <div>
              서울특별시 강남구 테헤란로 311 아남타워빌딩 7층 (우편번호 : 06151)
            </div>
            <div>sroom0409@gmail.com</div>
          </address>
        </div>
      </div>
    </footer>
  );
}
