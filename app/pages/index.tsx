import type { NextPage } from 'next'
import Head from 'next/head'

import Button from '../components/Button'
import Input from '../components/Input'
import UserCard from '../components/UserCard'

const Home: NextPage = () => {
  return (
    <div className="bg-gray-custom min-h-screen">
      <Head>
        <title>Users List - Superformula</title>
        <meta content="The awesome user list from Superformula" name="description" />
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <main className="container mx-auto">
        <div className="flex justify-between p-6 pt-32">
          <h1 className="font-light text-3xl">Users list</h1>
          <div className="basis-1/3">
            <Input />
          </div>
        </div>
        <div className="flex space-around">
          <UserCard />
          <UserCard />
          <UserCard />
        </div>
        <div className="flex justify-center p-6">
          <Button />
        </div>
      </main>
    </div>
  )
}

export default Home
