type Props = {
  id: string;
  className?: string;
  children?: React.ReactNode;
  onClose: () => void;
};

export default function Modal({ id, className, children, onClose }: Props) {
  return (
    <dialog id={id} className={'modal overflow-x-hidden'}>
      <form
        method='dialog'
        className={`px-12 py-7 modal-box min-w-[70vw] max-w-[70vw] ${className}`}
      >
        <button
          type='button'
          autoFocus
          onClick={onClose}
          className='absolute btn btn-sm btn-circle btn-ghost right-2 top-2'
        >
          ✕
        </button>
        {children}
      </form>
      <form method='dialog' className='modal-backdrop' onClick={onClose}>
        <button>close</button>
      </form>
    </dialog>
  );
}
