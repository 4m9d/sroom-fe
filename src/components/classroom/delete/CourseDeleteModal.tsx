'use client';
import { ModalIDs } from '@/src/constants/modal/modal';
import Modal from '../../ui/Modal';
import { closeModalHandler } from '@/src/util/modal/modalHandler';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QueryKeys } from '@/src/api/queryKeys';
import LoadingSpinner from '../../ui/LoadingSpinner';
import Button from '../../ui/button/Button';
import { deleteCourse } from '@/src/api/courses/courses';

type Props = {
  courseId: number | null;
  courseTitle: string | undefined;
};

export default function CourseDeleteModal({ courseId, courseTitle }: Props) {
  const queryClient = useQueryClient();

  const { mutate, status } = useMutation(() => deleteCourse(courseId!), {
    onSuccess: (data) => {
      queryClient.setQueryData([QueryKeys.CLASSROOM], () => data);
      closeModalHandler('COURSE_DELETE');
    }
  });

  const isDisabled = status === 'loading';

  return (
    <Modal
      id={ModalIDs.COURSE_DELETE}
      className='w-[75vw] max-w-2xl px-12 py-16 rounded-none'
      onClose={() => closeModalHandler('COURSE_DELETE')}
    >
      <div className='flex flex-col items-center justify-between w-full h-full gap-10'>
        <div className='flex flex-col items-center justify-center h-16 gap-4'>
          <p className='text-xl font-bold'>강의 삭제</p>
          <p className='text-base font-medium'>
            그동안의 강의 자료와 수강 이력이 사라지게 돼요. 정말로 강의를 삭제할까요?
          </p>
        </div>
        <div className='flex items-center justify-center w-full h-12 p-3 bg-sroom-gray-200'>
          <p className='text-sm font-medium whitespace-normal text-sroom-black-300 line-clamp-1'>
            {courseTitle}
          </p>
        </div>
        <div className='flex items-center justify-between w-full gap-5 mt-8'>
          <Button
            onClick={() => closeModalHandler('COURSE_DELETE')}
            className='w-1/2 text-sroom-white bg-sroom-black-400'
          >
            뒤로가기
          </Button>
          <Button
            disabled={isDisabled}
            onClick={mutate}
            className='w-1/2 text-sroom-white bg-sroom-brand'
          >
            {isDisabled ? (
              <LoadingSpinner className='text-sroom-white loading-sm' />
            ) : (
              '삭제하기'
            )}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
