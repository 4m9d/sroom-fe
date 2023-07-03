'use client';
import useAlert from '@/src/hook/useAlert';

const SVG = {
  success: (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='w-6 h-6 stroke-current shrink-0'
      fill='none'
      viewBox='0 0 24 24'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
        d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
      />
    </svg>
  ),
  error: (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='w-6 h-6 stroke-current shrink-0'
      fill='none'
      viewBox='0 0 24 24'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
        d='M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
      />
    </svg>
  )
};

export default function Alert() {
  const { alert, show } = useAlert();

  if (!alert) return <></>;

  const { type, title, description, buttonLabel, buttonOnClick } = alert;

  if (show) {
    return (
      <div
        className={`alert ${
          type === 'error' ? 'alert-error' : 'alert-success'
        } absolute z-10 bottom-16 w-1/2 left-1/4`}
      >
        <span className='inline-block mr-2 align-middle'>{SVG[type]}</span>
        <div>
          <h3 className='font-bold'>{title}</h3>
          <p className='text-xs'>{description}</p>
        </div>
        {buttonLabel && buttonOnClick && (
          <button onClick={buttonOnClick} className='btn btn-sm btn-ghost'>
            {buttonLabel}
          </button>
        )}
      </div>
    );
  } else return <></>;
}
