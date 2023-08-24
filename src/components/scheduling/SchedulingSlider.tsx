import getFormattedTime from '@/src/util/time/getFormattedTime';

type Props = {
  min: number;
  max: number;
  step: number;
  value: number;
  className?: string;
  setValue: React.Dispatch<React.SetStateAction<number>>;
};

export default function SchedulingSlider({
  className,
  min,
  max,
  step,
  value,
  setValue
}: Props) {
  const level = Math.floor((max - min) / step);

  return (
    <div className='relative w-full'>
      <input
        onChange={(e) => setValue(Number(e.target.value))}
        type='range'
        min={min}
        max={max}
        value={value}
        className={`${className} appearance-none bg-transparent w-full [&::-webkit-slider-runnable-track]:h-[4px] [&::-webkit-slider-runnable-track]:bg-sroom-gray-500 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-[10px] [&::-webkit-slider-thumb]:w-[10px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:-mt-[3px] [&::-webkit-slider-thumb]:bg-transparent`}
        step={step}
      />
      <div className='absolute top-[10px] left-0 flex justify-between w-full pointer-events-none'>
        <div
          aria-hidden
          style={{
            width: `${((value - min) / (max - min)) * 100}%`,
            position: 'absolute',
            top: '4px',
            height: '4px',
            left: '0',
            zIndex: '10',
            backgroundColor: 'var(--primary-color)'
          }}
        />
        {new Array(level + 1).fill(0).map((_, index) => (
          <div
            aria-hidden
            data-tip={getFormattedTime(value)}
            key={index}
            className={`w-[12px] h-[12px] border-2 z-20
             ${
               min + step * index > value
                 ? 'bg-sroom-gray-500 border-sroom-gray-500'
                 : min + step * index === value
                 ? 'bg-sroom-white border-sroom-brand'
                 : min + step * index < value
                 ? 'bg-sroom-brand border-sroom-brand'
                 : ''
             } ${
              min + step * index === value
                ? 'tooltip tooltip-open tooltip-top'
                : ''
            } rounded-full`}
          />
        ))}
      </div>
      <div
        aria-hidden
        className='absolute top-[30px] flex justify-between w-full pointer-events-none'
      >
        {new Array(level + 1).fill(0).map((_, index) => (
          <span
            aria-hidden
            id={(min + step * index).toString()}
            className={`relative flex items-center text-xs px-1 ${
              min + step * index <= value
                ? 'after:text-sroom-brand'
                : 'after:text-sroom-gray-500'
            } after:content-[attr(id)] after:absolute after:top-0 after:-left-1/2`}
            key={index}
          />
        ))}
      </div>
    </div>
  );
}
