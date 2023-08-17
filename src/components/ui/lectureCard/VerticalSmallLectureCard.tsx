import Image from 'next/image';

type Props = {
  src: string;
  alt: string;
  children: React.ReactNode;
};

export default function VerticalSmallLectureCard({
  src,
  alt,
  children
}: Props) {
  return (
    <div className='relative w-[20.5rem] h-[23rem] flex flex-col gap-4'>
      <div className='flex items-center w-full '>
        <div className='relative w-full h-0 pb-[56.25%]'>
          <div className='absolute top-0 left-0 object-cover w-full h-full'>
            <Image fill={true} src={src} alt={alt} />
          </div>
        </div>
      </div>
      <div className='w-full h-full'>{children}</div>
    </div>
  );
}
