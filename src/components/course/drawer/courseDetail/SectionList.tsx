import SectionAccordion from './SectionAccordion';

type Props = {
  sections: Section[];
  use_schedule: boolean;
  course_title: string;
};

export default function SectionList({
  sections,
  use_schedule,
  course_title
}: Props) {
  return (
    <section>
      <h2 className='px-5 mb-4 text-sm font-semibold'>강의 목차</h2>
      {sections.map((section) => {
        return (
          <SectionAccordion
            key={section.section}
            section={section}
            use_schedule={use_schedule}
            course_title={course_title}
          />
        );
      })}
    </section>
  );
}
