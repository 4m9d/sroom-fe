type Props = {
  keyword: string;
};

export default function SearchResultsHeading({ keyword }: Props) {
  return (
    <h2 className='flex justify-center mb-12 text-3xl font-bold md:text-4xl'>
      <span>{"'"}</span>
      <div className="max-w-[50%]">
        <p className='whitespace-normal line-clamp-1'>{keyword}</p>
      </div>
      <span>{"' "}</span>
      <p className='ml-2 whitespace-pre-wrap'>강의 검색 결과입니다.</p>
    </h2>
  );
}
