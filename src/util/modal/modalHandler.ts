import { ModalIDs } from '@/src/constants/modal/modal';

export const showModalHandler = (
  modalIDKey: keyof typeof ModalIDs,
  callback?: () => void
) => {
  const modal = document.getElementById(
    ModalIDs[modalIDKey]
  ) as HTMLDialogElement;

  if (modal) {
    modal.showModal();
    callback && callback();
  }
};

export const closeModalHandler = (
  modalIDKey: keyof typeof ModalIDs,
  callback?: () => void
) => {
  const modal = document.getElementById(
    ModalIDs[modalIDKey]
  ) as HTMLDialogElement;

  if (modal) {
    modal.close();
    callback && callback();
  }
};
