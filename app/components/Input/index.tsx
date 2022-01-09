import type { NextPage } from 'next'

const Input: NextPage = () => {
  return (
    <input
      className="border-2 rounded-md border-gray-100 p-2 w-full box-border basis-1/3"
      type="text"
      placeholder="Search..."
    />
  )
}

export default Input
