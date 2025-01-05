import Image from 'next/image';
import { BadgeType } from '@/src/constants/badge/badge';
import { getThumbnailSrc } from '@/src/util/thumbnail/getThumbnailSrc';
import ThumbnailBadge from '../badge/ThumbnailBadge';

type Props = {
  src: string;
  alt: string;
  children: React.ReactNode;
  isPlaylist?: boolean;
  isEnrolled?: boolean;
  isMembersOnly?: boolean;
};

export default function VerticalSmallLectureCard({
  src,
  alt,
  children,
  isPlaylist = false,
  isEnrolled = false,
  isMembersOnly = false
}: Props) {
  return (
    <div className='relative flex flex-col gap-4 text-sroom-black-400 w-80'>
      <div className='flex items-center w-full '>
        <div className='relative w-full h-0 pb-[56.25%]'>
          <div className='absolute top-0 left-0 object-cover w-full h-full'>
            <Image fill={true} src={getThumbnailSrc(src)} alt={alt} />
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
      <div className='w-full h-full'>{children}</div>
    </div>
  );
}
