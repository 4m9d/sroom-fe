export default function MultipleChoiceSVG({
  selected,
  isAnswer
}: {
  selected: boolean;
  isAnswer: boolean;
}) {
  if (selected) {
    return (
      <svg
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <circle cx='12' cy='12' r='12' fill='#111111' />
        <path
          d='M7 12.4844L10.5355 16.0199L17.6066 8.94884'
          stroke='white'
          strokeWidth='1.5'
        />
      </svg>
    );
  } else {
    if (isAnswer) {
      return (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
        >
          <circle cx='12' cy='12' r='11.25' stroke='white' strokeWidth='1.5' />
          <path
            d='M7 12.4844L10.5355 16.0199L17.6066 8.94884'
            stroke='white'
            strokeWidth='1.5'
          />
        </svg>
      );
    } else {
      return (
        <svg
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <circle
            cx='12'
            cy='12'
            r='11.25'
            stroke='#DDDDDD'
            strokeWidth='1.5'
          />
          <path
            d='M7 12.4844L10.5355 16.0199L17.6066 8.94884'
            stroke='#DDDDDD'
            strokeWidth='1.5'
          />
        </svg>
      );
    }
  }
}
