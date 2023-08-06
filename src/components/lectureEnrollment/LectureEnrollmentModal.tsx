import {
  closeModalHandler,
  showModalHandler
} from '@/src/util/modal/modalHandler';
import Modal from '../ui/Modal';
import Button from '../ui/button/Button';
import { ModalIDs } from '@/src/constants/modal/modal';

type Props = {
  onClose: () => void;
};

export default function LectureEnrollmentModal({ onClose }: Props) {
  return (
    <Modal
      id={ModalIDs.LECTURE_ENROLLMENT}
      className='rounded-none min-w-[35rem] h-64 px-24 py-12'
      onClose={onClose}
    >
      <div className='flex flex-col justify-between w-full h-full'>
        <div className='flex flex-col items-center justify-center h-16 gap-5'>
          <p className='text-xl font-bold'>학습 일정을 관리해드릴까요?</p>
          <p className='text-base text-zinc-500'>
            예상 수강 종료일을 바탕으로 강의 분량을 조절해드릴게요
          </p>
        </div>
        <div className='flex justify-between gap-5'>
          <Button className='w-1/2 font-semibold text-white bg-zinc-800'>
            괜찮아요
          </Button>
          <Button
            onClick={() =>
              showModalHandler('SCHEDULING', () =>
                closeModalHandler('LECTURE_ENROLLMENT')
              )
            }
            className='w-1/2 font-semibold text-white bg-orange-500'
          >
            네, 좋아요
          </Button>
        </div>
      </div>
    </Modal>
  );
}
