import ProgressBar from "../../ui/ProgressBar";

type Props = {
  value: number;
}

export default function CorrectnessRate({value}: Props) {
  return (
    <div className='flex flex-col items-center justify-center col-start-2 col-end-3 row-start-2 row-end-3 gap-5 rounded-t-full bg-zinc-100'>
      <p className='text-sm leading-8'>
        퀴즈 총 정답율 <span className='text-2xl font-bold'>{value}</span>%
      </p>
      <ProgressBar className='w-4/5 h-2' value={80} />
    </div>
  );
}