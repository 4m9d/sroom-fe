type Props = {
  id?: string;
  className?: string;
  children?: React.ReactNode;
  onClose?: () => void;
};

export default function Modal({ id, className, children, onClose }: Props) {
  return (
    <div className={'modal modal-open'}>
      <div id={id} className={`px-12 py-7 modal-box min-w-[70vw] ${className}`}>
        <button
          onClick={onClose}
          className='absolute btn btn-sm btn-circle btn-ghost right-2 top-2'
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}
