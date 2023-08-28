import ArrowRightSVG from '@/public/icon/ArrowRight';
import Button from './Button';

type Props = {
  title: string;
  onClick: () => any;
};

export default function LoadMoreButton({ title, onClick }: Props) {
  return (
    <Button
      onClick={onClick}
      className='gap-2 mx-auto !text-lg font-semibold btn-md btn-wide text-sroom-black-200'
    >
      {title}
      <span className='w-5 rotate-90 stroke-2 stroke-sroom-black-200'>
        <ArrowRightSVG />
      </span>
    </Button>
  );
}
