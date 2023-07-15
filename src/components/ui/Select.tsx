import { ChangeEvent } from "react";

type Props = {
  className?: string;
  children?: React.ReactNode;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
};

export default function Select({
  className,
  children,
  value,
  onChange
}: Props) {
  return (
    <select
      onChange={onChange}
      value={value}
      className={`${className} select `}
    >
      {children}
    </select>
  );
}
