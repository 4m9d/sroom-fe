import React from 'react';

type Props = {
  className?: string;
  onClick: () => void;
};

export default function CloseButton({ className, onClick }: Props) {
  return (
    <button
      type='button'
      onClick={onClick}
      className={`${className} absolute z-50 shrink-0 btn btn-sm btn-circle btn-ghost right-3 top-3 hover:bg-sroom-gray-200`}
    >
      ✕
    </button>
  );
}
