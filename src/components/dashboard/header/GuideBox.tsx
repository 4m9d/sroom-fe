export default function GuideBox({
  title,
  description,
  children
}: {
  title: string;
  description: string;
  children?: React.ReactNode;
}) {
  return (
    <div className='relative flex-1 h-[9.5rem] lg:h-40 hover:cursor-pointer lg:hover:h-[17rem] p-4 lg:p-7 transition-all bg-white hover:bg-gradient-to-b from-[#222222] to-sroom-black-300 hover:text-white shadow-[0_-2px_5px_1px_rgba(173,173,173,0.3)] text-sroom-black-400 group'>
      <p className='mb-1 text-xs font-normal lg:text-lg'>{title}</p>
      <div className='flex items-center gap-2'>
        <p className='text-base font-bold lg:text-2xl'>{description}</p>
        <p className='text-sm font-bold lg:text-base'>〉</p>
      </div>
      <div>
        {children}
      </div>
    </div>
  );
}
