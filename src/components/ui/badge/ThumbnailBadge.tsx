type Props = {
  title: string;
  className?: string;
}

export default function ThumbnailBadge({title, className}: Props) {
  return (
    <div className={`${className} h-[1.5rem] w-[3.7rem] text-xs text-sroom-white flex justify-center items-center`}>{title}</div>
  )
}