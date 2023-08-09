'use client';
import { showModalHandler } from '@/src/util/modal/modalHandler';
import Modal from '../ui/Modal';
import Button from '../ui/button/Button';
import { ModalIDs } from '@/src/constants/modal/modal';
import { useMutation } from '@tanstack/react-query';
import { enrollLectureInNewCourse } from '@/src/api/courses/courses';
import setErrorToast from '@/src/util/toast/setErrorToast';
import { ErrorMessage } from '@/src/api/ErrorMessage';
import LoadingSpinner from '../ui/LoadingSpinner';
import setLectureEnrollToast from '@/src/util/toast/setLectureEnrollToast';

type Props = {
  onClose: () => void;
  onEnrollSuccess: () => void;
};

export default function LectureEnrollmentModal({
  onClose,
  onEnrollSuccess
}: Props) {
  const enrollLecture = async () => {
    const enrollLectureInNewCourseParams: EnrollLectureInNewCourseParams = {
      query: {
        use_schedule: false
      }
    };
    return await enrollLectureInNewCourse(enrollLectureInNewCourseParams).catch(
      () => {
        setErrorToast(new Error(ErrorMessage.SEARCH));
        return null;
      }
    );
  };

  const { mutate, isLoading } = useMutation(enrollLecture, {
    onSuccess: () => {
      onEnrollSuccess();
      setLectureEnrollToast();
    }
  });

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
          <Button
            onClick={() => mutate()}
            className='w-1/2 font-semibold text-white bg-zinc-800'
            disabled={isLoading}
          >
            {isLoading ? (
              <LoadingSpinner className='text-orange-500 loading-sm' />
            ) : (
              '괜찮아요'
            )}
          </Button>
          <Button
            onClick={() => showModalHandler('SCHEDULING', onClose)}
            className='w-1/2 font-semibold text-white bg-orange-500'
            disabled={isLoading}
          >
            네, 좋아요
          </Button>
        </div>
      </div>
    </Modal>
  );
}
