import Image from 'next/image';

type Props = {
  src: string;
  alt: string;
  children: React.ReactNode;
};

export default function HorizontalBigLectureCard({
  src,
  alt,
  children
}: Props) {
  return (
    <div className='relative flex w-full gap-5 p-3 whitespace-normal bg-white lg:gap-8'>
      <div className='relative object-cover min-w-[calc(7rem*1.78)] lg:min-w-[calc(12rem*1.78)] xl:min-w-[calc(19rem*1.78)] min-h-[7rem] lg:min-h-[12rem] xl:min-h-[19rem]'>
        <Image fill={true} sizes='100%' src={src} alt={alt} />
      </div>
      <div className='w-auto min-h-full whitespace-normal'>
        {children}
      </div>
    </div>
  );
}
