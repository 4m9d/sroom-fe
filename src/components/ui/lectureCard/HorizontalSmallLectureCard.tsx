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
    <div className='border-zinc-200 border relative w-[42rem] h-[11rem] bg-white flex p-3 gap-4 overflow-hidden'>
      <div className='relative object-cover md:min-w-[calc(9rem*1.78)] md:max-w-[calc(9rem*1.78)]'>
        <Image fill={true} sizes='100%' src={src} alt={alt} />
      </div>
      <div className='w-[calc(38.5rem-(9rem*1.78))] h-full'>{children}</div>
    </div>
  );
}
