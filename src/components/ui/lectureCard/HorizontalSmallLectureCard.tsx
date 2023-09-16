import Image from 'next/image';

type Props = {
  src: string;
  alt: string;
  children: React.ReactNode;
  border?: boolean;
  onClick?: () => void;
  onMouseOver?: () => void;
};

export default function HorizontalSmallLectureCard({
  src,
  alt,
  children,
  border = true,
  onClick,
  onMouseOver
}: Props) {
  return (
    <div
      className={`relative flex w-full gap-4 p-3 whitespace-normal h-min-[11rem] bg-sroom-white text-sroom-black-400 ${
        border ? 'border border-sroom-gray-400' : ''
      }`}
    >
      <div className='w-full max-w-[15rem] flex items-center'>
        <div className='relative w-full h-0 pb-[56.25%]'>
          <div className='absolute top-0 left-0 object-cover w-full h-full overflow-hidden'>
            <Image
              className={`${onClick ? 'cursor-pointer' : ''} ${
                onMouseOver ? 'hover:scale-105' : ''
              } transition-all duration-500`}
              onClick={onClick}
              onMouseOver={onMouseOver}
              fill={true}
              src={src}
              alt={alt}
            />
          </div>
        </div>
      </div>
      <div className='w-full h-full overflow-hidden whitespace-normal'>
        {children}
      </div>
    </div>
  );
}
