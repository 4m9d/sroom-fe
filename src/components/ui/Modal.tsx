'use client';
import CloseButton from "./button/CloseButton";

type Props = {
  id: string;
  className?: string;
  children?: React.ReactNode;
  onClose: () => void;
};

export default function Modal({ id, className, children, onClose }: Props) {
  return (
    <dialog
      id={id}
      className={
        'modal overflow-x-hidden overflow-y-scroll text-sroom-black-400'
      }
    >
      <div className={`modal-box ${className}`}>
        <form method='dialog'>
          <CloseButton onClick={onClose}/>
        </form>
        {children}
      </div>
      <form
        method='dialog'
        className='modal-backdrop'
        onSubmit={onClose}
      >
        <button>close</button>
      </form>
    </dialog>
  );
}
