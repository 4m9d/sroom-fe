type Props = {
  className?: string;
  navigation: 'prev' | 'next';
  disabled: boolean;
  onClick: () => void;
};

export default function SwiperNavigationButton({
  className,
  navigation,
  disabled,
  onClick
}: Props) {
  return (
    <button
      type='button'
      onClick={onClick}
      disabled={disabled}
      className={`${className} flex justify-center items-center w-8 h-8 md:w-12 md:h-12 text-sm md:text-xl font-bold text-sroom-black-300 btn-ghost ${disabled ? 'btn-disabled' : 'btn'} hover:opacity-50`}
    >
      {navigation === 'prev' ? '〈' : '〉'}
    </button>
  );
}