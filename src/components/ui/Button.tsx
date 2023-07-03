type Props = {
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
};

export default function Button({ className, children, onClick }: Props) {
  return (
    <button onClick={onClick} className={`${className} btn btn-ghost`}>
      {children}
    </button>
  );
}
