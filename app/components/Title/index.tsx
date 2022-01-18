import type { NextPage } from 'next'

const Title: NextPage = ({ children }) => {
  return (
    <h1 className="font-light text-4xl">{children}</h1>
  )
}

export default Title
