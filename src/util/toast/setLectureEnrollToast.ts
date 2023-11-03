import toast from 'react-hot-toast';
import Toast from '../../components/ui/Toast';
import { TOAST_TIMEOUT } from '.';

export default function setLectureEnrollToast(buttonOnClick: () => void) {
  const lectureEnrollToast: CustomToast = {
    type: 'lecture_enrollment',
    title: '강의가 등록됐어요!',
    description: '5초 후에 수강 페이지로 이동해요!',
    buttonLabel: '좀 더 둘러볼래요',
    buttonOnClick
  };
  const param = {
    toast: lectureEnrollToast
  };

  toast.custom(() => Toast(param), {
    id: 'lecture_enrollment',
    duration: TOAST_TIMEOUT,
    position: 'bottom-center',
    ariaProps: {
      role: 'status',
      'aria-live': 'polite'
    }
  });
}
