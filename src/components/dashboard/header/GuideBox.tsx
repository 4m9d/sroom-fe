export default function GuideBox({
  title,
  description
}: {
  title: string;
  description: string;
}) {
  return (
    <div className='flex-1 h-24 hover:cursor-pointer hover:h-40 px-4 py-3 transition-all bg-white hover:bg-black hover:text-white shadow-[0_-2px_5px_1px_rgba(173,173,173,0.3)]'>
      <p className='mb-1 text-xs font-semibold'>{title}</p>
      <p className='text-base font-bold'>
        {description} <span className='ml-2'>〉</span>
      </p>
    </div>
  );
}
