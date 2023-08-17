type Props = {
  text: string;
};

export default function Motivation({ text }: Props) {
  return (
    <div className='flex items-center col-start-1 col-end-3 row-start-1 row-end-2 px-[5%] rounded-full bg-sroom-brand'>
      <p className='text-xs font-semibold whitespace-normal sm:text-sm md:text-base lg:text-lg xl:text-xl text-sroom-white line-clamp-2'>
        {text}
      </p>
    </div>
  );
}
