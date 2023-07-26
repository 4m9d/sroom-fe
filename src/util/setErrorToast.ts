import toast from 'react-hot-toast';
import ErrorToast from '../components/ui/Toast';
import { TOAST_TIMEOUT } from '../constants/ui/toast';

export default function setErrorToast(error : Error) {
  const errorToast: CustomToast = {
    type: 'error',
    title: '에러 발생',
    description: error.message
  };
  const param = {
    toast: errorToast
  };

  toast.custom(() => ErrorToast(param), {
    duration: TOAST_TIMEOUT,
    position: 'bottom-center'
  });
}
