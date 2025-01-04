import { ArrowRightSVG } from '@/public/icons/icons';

type Props = {
  title: string;
  children?: React.ReactNode;
  onClick?: () => void;
  onMouseOver?: () => void;
};

export default function SectionHeading({
  title,
  children,
  onClick,
  onMouseOver
}: Props) {
  return (
    <div
      className={`flex items-center mb-5 text-2xl font-bold bg-transparent md:mb-10 md:text-3xl text-sroom-black-400`}
    >
      <div
        className={`${onClick ? 'hover:cursor-pointer' : ''} flex items-center`}
        onMouseOver={onMouseOver}
        onClick={onClick}
      >
        <h2>{title}</h2>
        {onClick && (
          <span className='w-5 h-5 md:w-6 md:h-6 stroke-sroom-black-400'>
            <ArrowRightSVG />
          </span>
        )}
      </div>
      {children}
    </div>
  );
}
