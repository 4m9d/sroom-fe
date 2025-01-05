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
  border?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  onMouseOver?: () => void;
};

export default function HorizontalSmallLectureCard({
  src,
  alt,
  children,
  isPlaylist = false,
  isEnrolled = false,
  isMembersOnly = false,
  border = true,
  disabled = false,
  onClick,
  onMouseOver
}: Props) {
  return (
    <div
      className={`relative flex w-full gap-4 p-3 whitespace-normal min-h-[9.5rem] text-sroom-black-400 ${
        disabled ? 'bg-sroom-gray-400 opacity-60' : 'bg-sroom-white'
      } ${border ? 'border border-sroom-gray-400' : ''}`}
    >
      <div className='w-full max-w-[12.5rem] flex items-center'>
        <div className='relative w-full h-0 pb-[56.25%]'>
          <div className='absolute top-0 left-0 object-cover w-full h-full overflow-hidden'>
            <Image
              className={`${onClick ? 'cursor-pointer' : ''} ${
                onMouseOver ? 'hover:scale-105' : ''
              } transition-all duration-500`}
              onClick={onClick}
              onMouseOver={onMouseOver}
              fill={true}
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
      <div className='w-full h-full overflow-hidden whitespace-normal'>
        {children}
      </div>
    </div>
  );
}
