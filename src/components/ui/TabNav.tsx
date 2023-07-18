type Props = {
  className?: string;
  children?: React.ReactNode;
};

export default function TabNav({ className, children }: Props) {
  return <ul className={`tabs ${className}`}>{children}</ul>;
}
