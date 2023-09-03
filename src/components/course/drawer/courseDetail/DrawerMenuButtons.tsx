import Button from '@/src/components/ui/button/Button';

type Props = {};

export default function DrawerMenuButtons({}: Props) {
  return (
    <div className='flex justify-between h-12 gap-2 px-2 my-5'>
      <Button className='w-1/2 bg-sroom-brand text-sroom-white'>
        강의 자료
      </Button>
      <Button className='w-1/2 bg-sroom-black-400 text-sroom-white'>
        강의 편집
      </Button>
    </div>
  );
}
