type Props = {
  text: string;
}

export default function Motivation({text}: Props) {
  return (
    <div className='flex items-center justify-center col-start-1 col-end-3 row-start-1 row-end-2 bg-orange-500 rounded-full'>
      <p className='text-lg font-semibold text-white'>
        {text}
      </p>
    </div>
  );
}