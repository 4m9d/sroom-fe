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
      className={`${className} flex justify-center items-center w-12 h-12 text-xl font-bold text-sroom-white btn btn-ghost bg-sroom-gray-500 opacity-80 rounded-full`}
    >
      {navigation === 'prev' ? '〈' : '〉'}
    </button>
  );
}