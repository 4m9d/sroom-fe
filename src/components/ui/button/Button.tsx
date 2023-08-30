type Props = {
  className?: string;
  id?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
};

export default function Button({
  className,
  id,
  children,
  onClick,
  disabled
}: Props) {
  return (
    <button
      id={id}
      disabled={disabled}
      onClick={onClick}
      className={`${className} ${
        disabled ? '' : 'hover:opacity-90'
      } text-sm font-bold h-12 py-1 px-4 flex active:focus:scale-95 transition-all items-center justify-center rounded-none`}
    >
      {children}
    </button>
  );
}
