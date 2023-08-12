import { Dispatch, SetStateAction } from 'react';
import SectionAccordion from './SectionAccordion';

type Props = {
  sections: Section[];
  use_schedule: boolean;
  course_title: string;
  currentPlayingVideo: LastViewVideo;
  setCurrentPlayingVideo: Dispatch<SetStateAction<LastViewVideo>>;
};

export default function SectionList({
  sections,
  use_schedule,
  course_title,
  currentPlayingVideo,
  setCurrentPlayingVideo
}: Props) {
  return (
    <section>
      <h2 className='px-5 mb-4 text-sm font-semibold'>강의 목차</h2>
      <div className='overflow-y-auto max-h-[25.9rem]'>
        {sections.map((section) => {
          return (
            <SectionAccordion
              key={section.section}
              section={section}
              use_schedule={use_schedule}
              course_title={course_title}
              currentPlayingVideo={currentPlayingVideo}
              setCurrentPlayingVideo={setCurrentPlayingVideo}
            />
          );
        })}
      </div>
    </section>
  );
}
