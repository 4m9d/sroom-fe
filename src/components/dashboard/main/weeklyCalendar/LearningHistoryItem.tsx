export default function LearningHistoryItem({
  title,
  value
}: {
  title: string;
  value: string;
}) {
  return (
    <div className='flex items-center justify-center w-full'>
      <p className='w-1/2 text-[0.5rem] md:text-xs xl:text-base text-left pl-[5%] lg:pl-[15%] 2xl:pl-[20%]'>
        {title}
      </p>
      <p className='w-1/2 text-[0.5rem] md:text-xs xl:text-base font-semibold text-left pl-1 pr-[5%] lg:pr-[15%] 2xl:pr-[20%]'>
        {value}
      </p>
    </div>
  );
}
