type Props = {
  className?: string;
  innerTextClassName?: string;
  value: number;
  size?: string;
};

export default function RadialProgress({ className,innerTextClassName, value, size }: Props) {
  const style = { '--value': 49, '--size': size } as React.CSSProperties;
  return (
    <div className={`${className} radial-progress radial-square`} style={style}>
      <p className={`${innerTextClassName}`}>
      {value}%
      </p>
    </div>
  );
}
