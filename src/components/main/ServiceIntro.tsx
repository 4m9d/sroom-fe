import CourseMaterialIntro from './courseMaterial/CourseMaterialIntro';
import EnrollmentIntro from './enrollment/EnrollmentIntro';
import SchedulingIntro from './scheduling/SchedulingIntro';
import EmojiIntro from './ui/emoji/EmojiIntro';
import TextLoopIntro from './ui/textLoop/TextLoopIntro';

type Props = {};

export default function ServiceIntro({}: Props) {
  return (
    <div className='relative pb-[51.75%] w-full text-sroom-white text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-bold'>
      <div className='absolute w-full h-full'>
        <div className='grid grid-cols-[repeat(3,_minmax(0,3fr))] grid-rows-[0.6fr_repeat(4,_minmax(0,1fr))] gap-x-2 gap-y-1 lg:gap-x-4 lg:gap-y-3 w-full h-full'>
          <EnrollmentIntro />
          <TextLoopIntro />
          <SchedulingIntro />
          <CourseMaterialIntro />
          <EmojiIntro />
        </div>
      </div>
    </div>
  );
}
