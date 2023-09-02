type Props = {
  title: string;
  children?: React.ReactNode;
};

export default function SectionHeading({ title, children }: Props) {
  return (
    <div className='flex items-center justify-between mb-5 text-2xl font-bold bg-transparent md:mb-10 md:text-3xl text-sroom-black-400'>
      <h2>{title}</h2>
      {children}
    </div>
  );
}
