type Props = {
  className?: string;
}

export default function LoadingSpinner({
  className
}: Props) {
  return <span className={`${className} loading loading-spinner`}></span>;
}