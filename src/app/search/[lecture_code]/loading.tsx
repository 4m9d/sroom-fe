type Props = {};

export default function Loading({}: Props) {
  return (
    <div className='fixed top-0 left-0 items-center justify-center w-full h-full bg-black opacity-30'>
      <div className='absolute z-20 top-1/2 left-1/2 loading loading-spinner loading-lg text-sroom-brand' />
    </div>
  );
}