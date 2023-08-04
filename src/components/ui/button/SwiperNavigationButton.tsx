type Props = {
  className?: string;
  navigation: 'prev' | 'next';
  onClick: () => void;
};

export default function SwiperNavigationButton({
  className,
  navigation,
  onClick
}: Props) {
  return (
    <button
      type='button'
      onClick={onClick}
      className={`${className} flex justify-center items-center w-12 h-12 text-2xl font-bold text-white btn btn-ghost bg-zinc-300 opacity-70 rounded-full`}
    >
      {navigation === 'prev' ? '〈' : '〉'}
    </button>
  );
}