import React from 'react';
import Button from './Button';

type Props = {
  onClick: () => any;
};

export default function LoadMoreButton({ onClick }: Props) {
  return (
    <Button onClick={onClick} className='mx-auto btn-md btn-wide'>
      {'더보기'}
    </Button>
  );
}
