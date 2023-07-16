type Props = {
  className?: string;
  children?: React.ReactNode;
  onClose?: () => void;
};

export default function Modal({ className, children, onClose }: Props) {
  return (
      <div className={'modal modal-open'}>
        <div className={`px-12 py-7 modal-box min-w-[70vw] ${className}`}>
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
