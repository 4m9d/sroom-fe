import Button from '../ui/button/Button';

type Props = {
  title: string;
  channel: string;
};

export default function CourseHeader({ title, channel }: Props) {
  return (
    <div className='flex justify-between h-20 px-20 mx-auto mt-12 mb-5'>
      <div className='flex flex-col justify-between'>
        <h2 className='text-3xl font-bold'>{title}</h2>
        <h3 className='text-base font-medium text-zinc-500'>{channel}</h3>
      </div>
    </div>
  );
}
