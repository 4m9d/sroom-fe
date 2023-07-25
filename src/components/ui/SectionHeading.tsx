type Props = {
  title: string
}

export default function SectionHeading({title}: Props) {
  return (
    <h3 className="mb-10 text-2xl font-bold bg-transparent">{title}</h3>
  )
}