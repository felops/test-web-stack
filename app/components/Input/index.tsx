import type { NextPage } from 'next'

const Input: NextPage = () => {
  return (
    <input
      className="border-2 rounded-[8px] border-gray-100 p-4 w-full box-border basis-1/3"
      placeholder="Search..."
      type="text"
    />
  )
}

export default Input
