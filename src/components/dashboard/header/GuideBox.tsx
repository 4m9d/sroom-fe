import ArrowRightSVG from '@/public/icon/ArrowRight';

export default function GuideBox({
  title,
  description,
  onClick,
  children
}: {
  title: string;
  description: string;
  onClick?: () => void;
  children?: React.ReactNode;
}) {
  return (
    <button
      type='button'
      onClick={onClick}
      className='flex flex-col relative flex-1 h-[9.5rem] lg:h-40 hover:cursor-pointer lg:hover:h-[17rem] p-4 lg:p-7 transition-all duration-300 bg-white hover:bg-gradient-to-b from-[#222222] to-sroom-black-300 hover:text-white shadow-[0_-2px_5px_1px_rgba(173,173,173,0.3)] text-sroom-black-400 group'
    >
      <p className='mb-1 text-xs font-normal lg:text-lg'>{title}</p>
      <div className='flex justify-between gap-2 h-11'>
        <p className='text-sm font-bold text-left lg:text-xl'>{description}</p>
        <div className='flex pt-1 h-11'>
          <span className='w-3 h-3 shrink-0 lg:w-4 lg:h-4 xl:w-5 xl:h-5 stroke-sroom-black-400 group-hover:stroke-sroom-white'>
            <ArrowRightSVG />
          </span>
        </div>
      </div>
      <div>{children}</div>
    </button>
  );
}
