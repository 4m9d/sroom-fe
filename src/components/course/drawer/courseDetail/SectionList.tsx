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
      <h2 className='px-5 py-2 font-semibold border-b-2 border-sroom-gray-200'>강의 목차</h2>
      <div className='overflow-y-auto max-h-[22rem]'>
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
