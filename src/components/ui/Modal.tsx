type Props = {
  id: string;
  className?: string;
  children?: React.ReactNode;
  onClose: () => void;
};

export default function Modal({
  id,
  className,
  children,
  onClose
}: Props) {
  return (
    <dialog id={id} className={'modal overflow-x-hidden'}>
      <div
        className={`modal-box ${className}`}
      >
        <form method='dialog'>
          <button
            type='button'
            autoFocus
            onClick={onClose}
            className='absolute btn btn-sm btn-circle btn-ghost right-2 top-2'
          >
            ✕
          </button>
        </form>
        {children}
      </div>
      <form method='dialog' className='modal-backdrop' onClick={onClose}>
        <button>close</button>
      </form>
    </dialog>
  );
}
