type Props = {
  title: string
}

export default function SectionHeading({title}: Props) {
  return (
    <h3 className="mb-5 text-2xl font-bold bg-transparent md:mb-10 lg:text-3xl text-sroom-black-400">{title}</h3>
  )
}