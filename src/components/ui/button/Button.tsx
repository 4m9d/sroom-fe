type Props = {
  className?: string;
  id?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  hoverEffect?: boolean;
};

export default function Button({
  className,
  id,
  children,
  onClick,
  disabled,
  hoverEffect = false
}: Props) {
  return (
    <button
      id={id}
      disabled={disabled}
      onClick={onClick}
      className={`${className} ${disabled ? '' : 'hover:opacity-90'} ${
        hoverEffect ? 'hover:bg-sroom-gray-300' : ''
      } text-sm font-bold h-10 py-1 px-2 md:px-4 flex active:focus:scale-95 transition-all items-center justify-center rounded-none break-keep`}
    >
      {children}
    </button>
  );
}
