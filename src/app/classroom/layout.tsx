type Props = {
  children: React.ReactNode;
}

export default function layout({children}: Props) {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-sroom-gray-200">{children}</div>
  )
}