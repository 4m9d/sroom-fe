import Button from '../ui/button/Button';

type Props = {
  title: string;
  channel: string;
};

export default function CourseHeader({ title, channel }: Props) {
  return (
    <div className='flex justify-between max-w-screen-lg px-5 mx-auto mt-12 mb-5 h-14 md:h-16 lg:h-20 text-sroom-black-400'>
      <div className='flex flex-col justify-between'>
        <h2 className='text-xl font-bold whitespace-normal md:text-2xl lg:text-3xl line-clamp-1'>
          {title}
        </h2>
        <h3 className='text-sm font-medium whitespace-normal lg:text-base text-sroom-black-300 line-clamp-1'>
          {channel}
        </h3>
      </div>
      <div className='flex flex-col justify-end shrink-0'>
        <Button
          id='course-material-drawer'
          className='text-xs lg:text-sm lg:!px-10 font-bold text-sroom-white bg-sroom-black-400'
        >
          {'강의 노트 / 퀴즈 보기'}
        </Button>
      </div>
    </div>
  );
}
