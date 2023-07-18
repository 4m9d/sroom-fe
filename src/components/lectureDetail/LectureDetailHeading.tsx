import React from 'react';

type Props = {
  title: string;
};

export default function LectureDetailHeading({ title }: Props) {
  return (
    <div className='my-10 text-xl border-b-2 border-black border-solid'>
      {title}
    </div>
  );
}
