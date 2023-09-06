export default function LearningHistoryItem({
  title,
  value
}: {
  title: string;
  value: string;
}) {
  return (
    <div className='flex items-center justify-center w-full'>
      <p className='w-1/2 text-[0.5rem] md:text-xs xl:text-base text-left sm:pl-[10%]'>
        {title}
      </p>
      <p className='w-1/2 text-[0.5rem] md:text-xs xl:text-base font-semibold text-left sm:pl-[10%]'>
        {value}
      </p>
    </div>
  );
}
