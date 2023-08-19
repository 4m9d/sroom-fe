import {
  MOTIVATION_GENERAL,
  MOTIVATION_SPECIFIC
} from '@/src/constants/main/main';

const TextLoop = ({
  className,
  children
}: {
  className: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={`${className} absolute flex h-full min-w-full gap-3 whitespace-nowrap`}
    >
      {children}
    </div>
  );
};

export default function TextLoopIntro({}) {
  return (
    <div className='relative col-start-1 col-end-2 row-start-5 row-end-6 overflow-hidden bg-sroom-black-300'>
      <TextLoop className='top-[20%] sm:top-1/4 animate-flow'>
        {MOTIVATION_GENERAL.map((item, index) => (
          <p key={index}>{item}</p>
        ))}
      </TextLoop>
      <TextLoop className='top-[20%] sm:top-1/4 animate-flow-backup'>
        {MOTIVATION_GENERAL.map((item, index) => (
          <p key={index}>{item}</p>
        ))}
      </TextLoop>
      <TextLoop className='top-[60%] sm:top-2/4 animate-flow'>
        {MOTIVATION_SPECIFIC.map((item, index) => (
          <p key={index}>{item}</p>
        ))}
      </TextLoop>
      <TextLoop className='top-[60%] sm:top-2/4 animate-flow-backup'>
        {MOTIVATION_SPECIFIC.map((item, index) => (
          <p key={index}>{item}</p>
        ))}
      </TextLoop>
    </div>
  );
}
