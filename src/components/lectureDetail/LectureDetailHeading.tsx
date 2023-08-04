type Props = {
  title: string;
  children?: React.ReactNode;
};

export default function LectureDetailHeading({ title, children }: Props) {
  return (
    <div className='flex my-10 text-xl font-bold border-b-2 border-black border-solid'>
      <h3>
      {title}
      </h3>
      {children}
    </div>
  );
}
