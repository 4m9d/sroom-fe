import Image from 'next/image';

type Props = {
  src: string;
  alt: string;
  children: React.ReactNode;
};

export default function HorizontalSmallLectureCard({
  src,
  alt,
  children
}: Props) {
  return (
    <div className='border-zinc-200 border relative w-full h-[11rem] bg-white flex p-3 gap-4 overflow-hidden whitespace-normal'>
      <div className=' w-full max-w-[15rem] flex items-center'>
        <div className='relative w-full h-0 pb-[56.25%]'>
          <div className='absolute top-0 left-0 object-cover w-full h-full'>
            <Image fill={true} src={src} alt={alt} />
          </div>
        </div>
      </div>
      <div className='w-full h-full overflow-hidden whitespace-normal'>
        {children}
      </div>
    </div>
  );
}
