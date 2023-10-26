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
      className={`${className} flex rounded-full justify-center w-8 h-8 md:w-12 md:h-12 items-center text-sm md:text-xl font-bold text-sroom-black-300 btn-ghost btn-sm md:btn-md ${disabled ? 'btn-disabled opacity-20' : 'btn'} hover:opacity-50`}
    >
      {navigation === 'prev' ? '〈' : '〉'}
    </button>
  );
}