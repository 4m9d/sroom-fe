'use client';
import { showModalHandler } from '@/src/util/modal/modalHandler';
import Modal from '../ui/Modal';
import Button from '../ui/button/Button';
import { ModalIDs } from '@/src/constants/modal/modal';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { enrollLectureInNewCourse } from '@/src/api/courses/courses';
import setErrorToast from '@/src/util/toast/setErrorToast';
import { ErrorMessage } from '@/src/api/ErrorMessage';
import LoadingSpinner from '../ui/LoadingSpinner';
import setLectureEnrollToast from '@/src/util/toast/setLectureEnrollToast';
import { useRouter } from 'next/navigation';
import { QueryKeys } from '@/src/api/queryKeys';

type Props = {
  lectureDetail: LectureDetail;
  onClose: () => void;
  onEnrollSuccess: () => void;
};

export default function LectureEnrollmentModal({
  lectureDetail,
  onClose,
  onEnrollSuccess
}: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { lecture_code } = lectureDetail;

  const enrollLecture = async () => {
    const enrollLectureInNewCourseParams: EnrollLectureInNewCourseParams = {
      query: {
        use_schedule: false
      },
      body: {
        lecture_code
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
    onSuccess: (response) => {
      onEnrollSuccess();
      response &&
        setLectureEnrollToast(() =>
          router.push(`/course/${response.course_id}`)
        );
      queryClient.invalidateQueries([QueryKeys.DETAIL, lecture_code]);
    }
  });

  return (
    <Modal
      id={ModalIDs.LECTURE_ENROLLMENT}
      className='rounded-none w-[80%] min-w-[15rem] max-w-[35rem] h-64 px-12 py-12 lg:px-16'
      onClose={onClose}
    >
      <div className='flex flex-col justify-between w-full h-full'>
        <div className='flex flex-col items-center justify-center h-16 gap-5'>
          <p className='text-lg font-bold md:text-xl'>
            학습 일정을 관리해드릴까요?
          </p>
          <p className='text-sm md:text-base text-sroom-black-200'>
            예상 수강 종료일을 바탕으로 강의 분량을 조절해드릴게요
          </p>
        </div>
        <div className='flex justify-between gap-5 text-xs font-bold md:text-base text-sroom-white'>
          <Button
            onClick={() => mutate()}
            className='w-1/2 bg-sroom-black-400'
            disabled={isLoading}
          >
            {isLoading ? (
              <LoadingSpinner className='text-sroom-brand loading-sm' />
            ) : (
              '괜찮아요'
            )}
          </Button>
          <Button
            onClick={() => showModalHandler('SCHEDULING', onClose)}
            className='w-1/2 bg-sroom-brand'
            disabled={isLoading}
          >
            {'네, 좋아요'}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
