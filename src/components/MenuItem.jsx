import Link from "next/link";


export default function MenuItem({title, address, Icon}) {
  return (
    <Link href={address} className="flex items-center gap-2 hover:text-red-800 font-bold">
        <Icon className="text-4xl text-red-300"/>
        <p className="hidden sm:inline text-xl">{title}</p>
    </Link>
  )
}
