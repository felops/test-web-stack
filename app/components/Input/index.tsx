import React from 'react'
import type { NextPage } from 'next'

interface InputProps {
  onChange: (e: { target: HTMLInputElement }) => void
  value: string
}

const Input: NextPage<InputProps> = ({
  onChange,
  value,
}) => {
  return (
    <input
      className="border-2 rounded-[8px] border-gray-100 p-4 w-full box-border basis-1/3"
      onChange={onChange}
      placeholder="Search..."
      type="text"
      value={value}
    />
  )
}

export default Input
