import Image from 'next/image'
import { format } from 'date-fns'
import type { NextPage } from 'next'

interface UserProps {
  createdAt: string
  description: string
  id: string
  name: string
}

const UserCard: NextPage<UserProps> = ({
  createdAt,
  description,
  id,
  name,
}) => {
  return (
    <div className="basis-1/3 group">
      <div className="bg-white rounded-md cursor-pointer hover:shadow-md px-8 py-10 pt-6 m-6">
        <div className="flex justify-end ease-in duration-300 opacity-0 group-hover:opacity-100">
          <svg fill="none" height="19" viewBox="0 0 19 19" width="19" xmlns="http://www.w3.org/2000/svg">
            <path clipRule="evenodd" d="M2.59456 11.7577C2.42905 11.8604 2.29054 12.0137 2.20527 12.2127L0.0839478 17.1625C-0.271648 17.9922 0.56729 18.8311 1.39701 18.4755L6.34676 16.3542C6.54573 16.2689 6.69909 16.1304 6.8018 15.9649C6.87632 15.9136 6.94724 15.8549 7.0135 15.7886L14.7917 8.01043L16.2059 6.59622L17.9737 4.82845C18.7547 4.0474 18.7547 2.78107 17.9737 2.00002L16.5594 0.585809C15.7784 -0.195239 14.5121 -0.195239 13.731 0.585809L2.77086 11.546C2.7046 11.6122 2.64583 11.6831 2.59456 11.7577ZM4.53863 12.6066L5.95284 14.0208L13.3775 6.59622L11.9632 5.182L4.53863 12.6066ZM16.5594 3.41424L14.7917 5.182L13.3775 3.76779L15.1452 2.00002L16.5594 3.41424ZM3.46173 14.3582L2.90704 15.6524L4.20131 15.0977L3.46173 14.3582Z" fill="black" fillOpacity="0.4" fillRule="evenodd"/>
          </svg>
        </div>
        <div className="flex justify-center">
          <Image
            alt="Profile image"
            className="rounded-full min-h-[168px]"
            height="168"
            src={`https://source.unsplash.com/random/150x150?collection=3678902&${id}`}
            width="168"
          />
        </div>
        <div className="flex justify-between content-bottom pt-6">
          <h2 className="text-sm font-semibold uppercase">{name}</h2>
          {
            createdAt && (
              <p className="text-sm ease-in duration-300 opacity-0 group-hover:opacity-100">
                created <span className="text-red-900">{format(new Date(createdAt), 'd MMM yyyy')}</span>
              </p>
            )
          }
        </div>
        <p className="text-xs font-light text-zinc-600 pt-1 text-ellipsis overflow-hidden w-56 whitespace-nowrap">
          {description}
        </p>
      </div>
    </div>
  )
}

export default UserCard
