import Button from '@/src/components/ui/button/Button';
import setUndevelopedAlertToast from '@/src/util/toast/setUndevelopedAlertToast';

type Props = {};

export default function DrawerMenuButtons({}: Props) {

  return (
    <div className='flex justify-between h-10 gap-5 px-3 my-3'>
      <Button
        onClick={() => setUndevelopedAlertToast('scrap')}
        className='w-1/2 bg-sroom-brand text-sroom-white'
      >
        오답 노트
      </Button>
      <Button
        onClick={() => setUndevelopedAlertToast('course-modification')}
        className='w-1/2 bg-sroom-black-400 text-sroom-white'
      >
        강의 편집
      </Button>
    </div>
  );
}
