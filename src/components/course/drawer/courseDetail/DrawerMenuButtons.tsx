import Button from '@/src/components/ui/button/Button';

type Props = {};

export default function DrawerMenuButtons({}: Props) {
  return (
    <div className='flex justify-between gap-2 px-2 mb-5 md:px-5 md:gap-5 shrink-0'>
      <Button className='w-1/2 bg-sroom-brand text-sroom-white break-keep'>
        강의 자료
      </Button>
      <Button className='w-1/2 bg-sroom-black-400 text-sroom-white break-keep'>
        강의 편집
      </Button>
    </div>
  );
}
