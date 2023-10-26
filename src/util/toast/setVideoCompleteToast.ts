import toast from 'react-hot-toast';
import Toast from '../../components/ui/Toast';
import { TOAST_TIMEOUT } from '.';

export default function setVideoCompleteToast() {
  const videoCompleteToast: CustomToast = {
    type: 'video_complete',
    title: '수강이 완료됐어요!',
    description: '다음 강의로 넘어가볼까요?',
  };
  const param = {
    toast: videoCompleteToast
  };

  toast.custom(() => Toast(param), {
    id: 'video_complete',
    duration: TOAST_TIMEOUT,
    position: 'bottom-center',
    ariaProps: {
      role: 'status',
      'aria-live': 'polite'
    }
  });
}
