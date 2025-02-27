'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { ErrorMessage } from '@/src/api/ErrorMessage';
import { enrollLectureInNewCourse } from '@/src/api/courses/courses';
import { QueryKeys } from '@/src/api/queryKeys';
import { ModalIDs } from '@/src/constants/modal/modal';
import { ONE_SECOND_IN_MS } from '@/src/constants/time/time';
import { showModalHandler } from '@/src/util/modal/modalHandler';
import setErrorToast from '@/src/util/toast/setErrorToast';
import setLectureEnrollToast from '@/src/util/toast/setLectureEnrollToast';
import LoadingSpinner from '../ui/LoadingSpinner';
import Modal from '../ui/Modal';
import Button from '../ui/button/Button';

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
      if (response) {
        const navigateToCourseTaking = setTimeout(() => {
          router.push(`/course/${response.course_id}`);
        }, 5 * ONE_SECOND_IN_MS);
        setLectureEnrollToast(lecture_code, () => {
          clearTimeout(navigateToCourseTaking);
          toast.remove(`lecture_enrollment_${lecture_code}`);
        });
      }
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
