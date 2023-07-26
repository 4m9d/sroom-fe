import RadialProgress from "../../ui/RadialProgress";

type Props = {
  value: number;
}

export default function CompletionRate({value}: Props) {
  return (
    <div className='flex items-center justify-center col-start-2 col-end-3 row-start-3 row-end-4 gap-5 bg-orange-500'>
      <p className='text-sm text-white'>등록한 강의 완강률</p>
      <RadialProgress
        className='text-white '
        innerTextClassName='text-black text-2xl font-bold'
        value={value}
      />
    </div>
  );
}