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
    <div className='relative flex flex-col w-full gap-5 p-3 whitespace-normal bg-sroom-white text-sroom-black-400 lg:gap-10 lg:flex-row'>
      <div className='w-full max-w-[38rem] lg:max-w-[27.5rem] flex items-center'>
        <div className='relative w-full h-0 pb-[56.25%]'>
          <div className='absolute top-0 left-0 object-cover w-full h-full'>
            <Image fill={true} sizes='100%' src={src} alt={alt} />
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}
