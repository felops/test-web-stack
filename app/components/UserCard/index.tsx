import type { NextPage } from 'next'

const UserCard: NextPage = () => {
  return (
    <div className="basis-1/3 items-center bg-white rounded-md cursor-pointer shadow-sm hover:shadow-md p-6 m-6">
      <img
        className="rounded-full w-28 m-auto"
        src="https://conteudo.imguol.com.br/c/entretenimento/d5/2020/10/07/homem-com-vergonha-1602098705397_v2_450x450.jpg"
      />
      <h2 className="text-sm font-semibold uppercase pt-6">ANGELICA WASHINGTON</h2>
      <p className="text-xs font-light text-zinc-600 pt-1 text-ellipsis overflow-hidden w-56 whitespace-nowrap">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit
      </p>
    </div>
  )
}

export default UserCard
