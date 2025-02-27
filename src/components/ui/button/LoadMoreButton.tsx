import { ArrowRightSVG } from '@/public/icons/icons';
import Button from './Button';

type Props = {
  title: string;
  onClick: () => any;
};

export default function LoadMoreButton({ title, onClick }: Props) {
  return (
    <Button
      onClick={onClick}
      className='gap-2 mx-auto font-semibold btn-md btn-wide text-sroom-black-200'
    >
      {title}
      <span className='w-3 rotate-90 md:w-4 stroke-sroom-black-200'>
        <ArrowRightSVG />
      </span>
    </Button>
  );
}
