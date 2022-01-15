import Image from 'next/image'
import type { NextPage } from 'next'

interface UserProps {
  name: string
  description: string
}

const UserCard: NextPage<UserProps> = ({ name, description }) => {
  return (
    <div className="basis-1/3">
      <div className="bg-white rounded-md cursor-pointer hover:shadow-md px-8 py-10 m-6">
        <div className="flex justify-center">
        <Image
          alt="Profile image"
          className="rounded-full min-h-[168px]"
          height="168"
          src={`https://source.unsplash.com/random/150x150?collection=3678902&${name}`}
          width="168"
        />
        </div>
        <h2 className="text-sm font-semibold uppercase pt-6">{name}</h2>
        <p className="text-xs font-light text-zinc-600 pt-1 text-ellipsis overflow-hidden w-56 whitespace-nowrap">
          {description}
        </p>
      </div>
    </div>
  )
}

export default UserCard
