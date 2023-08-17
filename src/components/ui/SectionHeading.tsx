type Props = {
  title: string
}

export default function SectionHeading({title}: Props) {
  return (
    <h3 className="mb-10 text-3xl font-bold bg-transparent text-sroom-black-400">{title}</h3>
  )
}