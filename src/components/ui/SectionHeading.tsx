import ArrowRightSVG from '@/public/icon/ArrowRight';

type Props = {
  title: string;
  children?: React.ReactNode;
  onClick?: () => void;
};

export default function SectionHeading({ title, children, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className={`${onClick ? 'hover:cursor-pointer' : ''} flex items-center mb-5 text-2xl font-bold bg-transparent md:mb-10 md:text-3xl text-sroom-black-400`}
    >
      <h2>{title}</h2>
      {onClick && (
        <span className='w-5 h-5 md:w-6 md:h-6 stroke-sroom-black-400'>
          <ArrowRightSVG />
        </span>
      )}
      {children}
    </div>
  );
}
