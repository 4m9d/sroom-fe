import toast from 'react-hot-toast';
import Toast from '../../components/ui/Toast';
import { TOAST_TIMEOUT } from '../../constants/ui/toast';

export default function setLectureEnrollToast() {
  const lectureEnrollToast: CustomToast = {
    type: 'lecture_enrollment',
    title: '강의가 등록됐어요!',
    description: '지금 바로 수강을 시작해보세요',
    buttonLabel: '수강하러 가기',
    buttonOnClick: () => {}
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
