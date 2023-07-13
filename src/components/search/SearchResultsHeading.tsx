import React from 'react';

type Props = {
  keyword: string;
};

export default function SearchResultsHeading({ keyword }: Props) {
  return (
    <h2 className='mt-10 mb-20 ml-10 text-4xl'>
      <span className='h-16'>{"'"}</span>
      <span className='inline-block truncate max-w-1/2'>{keyword}</span>
      <span>{"'"}</span>
      <span> 강의 검색 결과</span>
    </h2>
  );
}
