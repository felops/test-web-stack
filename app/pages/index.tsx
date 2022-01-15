import React from 'react'
import Head from 'next/head'
import type { NextPage } from 'next'

import { useUserList } from '../hooks/useUserList'

import Button from '../components/Button'
import Input from '../components/Input'
import UserCard from '../components/UserCard'

const Home: NextPage = () => {
  const {
    users,
    isLoading,
    showButton,
    loadMore,
  } = useUserList()

  return (
    <div className="bg-gray-custom min-h-screen">
      <Head>
        <title>Users List - Superformula</title>
        <meta content="The awesome user list from Superformula" name="description" />
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <main className="container mx-auto">
        <div className="flex justify-between p-6 pt-32">
          <h1 className="font-light text-4xl">Users list</h1>
          <div className="basis-1/3">
            <Input />
          </div>
        </div>
        <div className="flex flex-wrap space-around">
        {
          users.map(item => (
            <UserCard
              createdAt={item.createdAt}
              description={item.description}
              id={item.id}
              key={item.id}
              name={item.name}
            />
          ))
        }
        </div>
        {
          showButton && (
            <div className="flex justify-center p-6">
              <Button
                loading={isLoading}
                onClick={loadMore}
              >
                LOAD MORE
              </Button>
            </div>
          )
        }
      </main>
    </div>
  )
}

export default Home
