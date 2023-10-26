import Image from 'next/image';
import ThumbnailBadge from '../badge/ThumbnailBadge';
import { getThumbnailSrc } from '@/src/util/thumbnail/getThumbnailSrc';
import { BadgeType } from '@/src/constants/badge/badge';

type Props = {
  src: string;
  alt: string;
  children: React.ReactNode;
  isPlaylist?: boolean;
  isEnrolled?: boolean;
  isMembersOnly?: boolean;
};

export default function HorizontalBigLectureCard({
  src,
  alt,
  children,
  isPlaylist = false,
  isEnrolled = false,
  isMembersOnly = false
}: Props) {
  return (
    <div className='relative flex flex-col w-full gap-5 p-3 whitespace-normal bg-sroom-white text-sroom-black-400 lg:gap-10 lg:flex-row'>
      <div className='w-full max-w-[40rem] lg:max-w-[27.5rem] flex items-center'>
        <div className='relative w-full h-0 pb-[56.25%]'>
          <div className='absolute top-0 left-0 object-cover w-full h-full'>
            <Image
              fill={true}
              sizes='100%'
              src={getThumbnailSrc(src)}
              alt={alt}
            />
            {isEnrolled && (
              <div className='absolute top-0 left-0'>
                <ThumbnailBadge
                  title={BadgeType.ENROLLED}
                  className='bg-sroom-green'
                />
              </div>
            )}
            {isPlaylist && (
              <div
                className={`absolute top-0 ${
                  isEnrolled ? 'left-[4rem]' : 'left-0'
                }`}
              >
                <ThumbnailBadge
                  title={BadgeType.PLAYLIST}
                  className='bg-sroom-brand'
                />
              </div>
            )}
            {isPlaylist === false && isMembersOnly && (
              <div
                className={`absolute top-0 ${
                  isEnrolled ? 'left-[4rem]' : 'left-0'
                }`}
              >
                <ThumbnailBadge
                  title={BadgeType.MEMBERS_ONLY}
                  className='bg-sroom-black-400'
                />
              </div>
            )}
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}
