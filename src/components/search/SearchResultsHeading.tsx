type Props = {
  keyword: string;
};

export default function SearchResultsHeading({ keyword }: Props) {
  return (
    <h2 className='flex flex-wrap justify-center mb-12 text-3xl font-bold md:text-4xl'>
      <span>{"'"}</span>
      <p className='max-w-[50%] break-all whitespace-normal line-clamp-1'>{keyword}</p>
      <span className='mr-2'>{"'"}</span>
      <p>강의 검색 결과입니다.</p>
    </h2>
  );
}
