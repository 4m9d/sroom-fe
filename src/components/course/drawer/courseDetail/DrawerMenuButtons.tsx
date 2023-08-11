import Button from '@/src/components/ui/button/Button';

type Props = {};

export default function DrawerMenuButtons({}: Props) {
  return (
    <div className='flex justify-between px-5 my-5 shrink-0'>
      <Button className='w-[7.5rem] h-[3.75rem] bg-orange-500 text-white'>
        강의 자료
      </Button>
      <Button className='w-[7.5rem] h-[3.75rem] bg-zinc-900 text-white'>강의 편집</Button>
    </div>
  );
}
