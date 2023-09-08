import React from 'react';

type Props = {
  onClick: () => void;
};

export default function CloseButton({ onClick }: Props) {
  return (
    <button
      type='button'
      onClick={onClick}
      className={`absolute z-50 shrink-0 btn btn-sm btn-circle btn-ghost right-3 top-3`}
    >
      ✕
    </button>
  );
}
