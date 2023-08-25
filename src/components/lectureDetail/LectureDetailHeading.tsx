type Props = {
  title: string;
  children?: React.ReactNode;
};

export default function LectureDetailHeading({ title, children }: Props) {
  return (
    <div className='flex items-center my-10 text-xl font-bold border-b-2 border-solid h-9 border-sroom-black-400'>
      <h3>
      {title}
      </h3>
      {children}
    </div>
  );
}
