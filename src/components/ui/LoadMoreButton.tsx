import React from 'react';
import Button from './Button';

type Props = {
  title: string;
  onClick: () => any;
};

export default function LoadMoreButton({ title, onClick }: Props) {
  return (
    <Button onClick={onClick} className='mx-auto text-base btn-md btn-wide text-zinc-500'>
      {title}
    </Button>
  );
}
