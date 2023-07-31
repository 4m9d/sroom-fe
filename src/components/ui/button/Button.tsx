type Props = {
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
};

export default function Button({ className, children, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className={`${className} py-1 px-4 flex hover:opacity-90 active:focus:scale-95 transition-all items-center justify-center rounded-none`}
    >
      {children}
    </button>
  );
}
