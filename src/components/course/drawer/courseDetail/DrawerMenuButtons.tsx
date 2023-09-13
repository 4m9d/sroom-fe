import Button from '@/src/components/ui/button/Button';
import setUndevelopedAlertToast from '@/src/util/toast/setUndevelopedAlertToast';

type Props = {};

export default function DrawerMenuButtons({}: Props) {

  return (
    <div className='flex justify-between h-12 gap-2 px-2 my-5'>
      <Button onClick={setUndevelopedAlertToast} className='w-1/2 bg-sroom-brand text-sroom-white'>
        오답 노트
      </Button>
      <Button onClick={setUndevelopedAlertToast} className='w-1/2 bg-sroom-black-400 text-sroom-white'>
        강의 편집
      </Button>
    </div>
  );
}
