import ProgressBar from "../../../ui/ProgressBar";

type Props = {
  value: number;
}

export default function CorrectnessRate({value}: Props) {
  return (
    <div className='flex flex-col items-center justify-center col-start-2 col-end-3 row-start-2 row-end-3 gap-2 py-4 rounded-t-full sm:gap-3 md:gap-5 bg-sroom-gray-300 text-sroom-black-400'>
      <p className='text-xs font-semibold leading-8 sm:text-sm md:text-md: lg:text-lg xl:text-xl'>
        퀴즈 총 정답율 <span className='text-lg font-bold sm:text-2xl lg:text-3xl xl:text-4xl'>{value}</span>%
      </p>
      <ProgressBar className='!w-[78%] h-2 lg:h-[0.58rem]' value={80} />
    </div>
  );
}