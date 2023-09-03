import SectionAccordion from './SectionAccordion';

type Props = {
  sections: Section[];
  use_schedule: boolean;
  course_id: number;
  course_title: string;
  currentPlayingVideo: LastViewVideo;
};

export default function SectionList({
  sections,
  use_schedule,
  course_id,
  course_title,
  currentPlayingVideo
}: Props) {
  return (
    <section>
      <h2 className='px-5 py-2 font-semibold border-b-2 border-sroom-gray-200'>
        강의 목차
      </h2>
      <ul className='pb-10'>
        {sections.map((section) => {
          return (
            <SectionAccordion
              key={section.section}
              section={section}
              use_schedule={use_schedule}
              course_id={course_id}
              course_title={course_title}
              currentPlayingVideo={currentPlayingVideo}
            />
          );
        })}
      </ul>
    </section>
  );
}
