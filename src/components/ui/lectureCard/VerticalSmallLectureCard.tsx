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
    <div className='relative w-[24rem] h-[23rem] flex flex-col gap-4'>
      <div className='relative object-cover min-h-[calc(24rem/1.78)]'>
        <Image fill={true} sizes='100%' src={src} alt={alt} />
      </div>
      <div className='w-full h-full'>{children}</div>
    </div>
  );
}
