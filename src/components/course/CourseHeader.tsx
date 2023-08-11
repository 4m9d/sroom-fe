import Button from '../ui/button/Button';

type Props = {
  title: string;
  channel: string;
};

export default function CourseHeader({ title, channel }: Props) {
  return (
    <div className='flex justify-between h-20 mx-auto mt-12 mb-5 px-[10%]'>
      <div className='flex flex-col justify-between'>
        <h2 className='text-3xl font-bold'>{title}</h2>
        <h3 className='text-base font-medium text-zinc-500'>{channel}</h3>
      </div>
      <div className='flex flex-col justify-end'>
        <Button id='course-material-drawer' className='!px-10 !py-3 text-sm font-medium text-white bg-zinc-900'>
          {'강의 노트 / 퀴즈 보기'}
        </Button>
      </div>
    </div>
  );
}
