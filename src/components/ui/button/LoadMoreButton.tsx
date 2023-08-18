import React from 'react';
import Button from './Button';

type Props = {
  title: string;
  onClick: () => any;
};

export default function LoadMoreButton({ title, onClick }: Props) {
  return (
    <Button
      onClick={onClick}
      className='gap-2 mx-auto text-lg font-bold btn-md btn-wide text-sroom-black-200'
    >
      {title}
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='20'
        height='20'
        viewBox='0 0 20 20'
        fill='none'
      >
        <path
          d='M2.92893 7.92893L10 15L17.0711 7.92893'
          stroke='#666666'
          stroke-width='2'
        />
      </svg>
    </Button>
  );
}
