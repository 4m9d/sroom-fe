import {
  MOTIVATION_GENERAL,
  MOTIVATION_SPECIFIC
} from '@/src/constants/main/main';

export default function TextLoopIntro({}) {
  return (
    <div className='flex flex-col justify-center col-start-1 col-end-2 row-start-5 row-end-6 overflow-hidden bg-sroom-black-300 flex-[0_0_auto] flex-nowrap p-3 md:p-5 xl:p-7'>
      <div className='flex gap-2 flex-nowrap whitespace-nowrap flex-[0_0_auto] animate-flow-medium'>
        {MOTIVATION_GENERAL.map((item, index) => (
          <p key={index}>{item}</p>
        ))}
      </div>
      <div className='flex gap-2 flex-nowrap whitespace-nowrap flex-[0_0_auto] animate-flow-slow'>
        {MOTIVATION_SPECIFIC.map((item, index) => (
          <p key={index}>{item}</p>
        ))}
      </div>
    </div>
  );
}
