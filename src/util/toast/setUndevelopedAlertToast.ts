import toast from 'react-hot-toast';
import Toast from '../../components/ui/Toast';
import { TOAST_TIMEOUT } from '.';

export default function setUndevelopedAlertToast() {
  const undevelopedAlert: CustomToast = {
    type: 'undeveloped',
    title: '아직 개발 중이에요!',
    description: '열심히 작업 중이니 조금만 기다려 주세요 :)'
  };
  const param = {
    toast: undevelopedAlert
  };

  toast.custom(() => Toast(param), {
    id: 'undeveloped',
    duration: TOAST_TIMEOUT,
    position: 'bottom-center',
    ariaProps: {
      role: 'status',
      'aria-live': 'polite'
    }
  });
}
