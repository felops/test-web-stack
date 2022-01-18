import React from 'react'
import Head from 'next/head'
import type { NextPage } from 'next'

import { useUserList } from '../hooks/useUserList'
import { useModal } from '../hooks/useModal'

import Button from '../components/Button'
import Input from '../components/Input'
import Modal from '../components/Modal'
import Title from '../components/Title'
import UserCard from '../components/UserCard'

import { ModalContext, Profile } from '../context/modal'

const Home: NextPage = () => {
  const [input, setInput] = React.useState('')

  const {
    users,
    isLoading,
    showButton,
    loadMore,
    updateUserInfo,
  } = useUserList()

  const {
    closeModal,
    isModalLoading,
    openModal,
    showModal,
    modalError,
    profile,
    updateUser,
  } = useModal()

  const chandAndUpdateUser = (profile: Profile) => {
    try {
      updateUser({
        id: profile.id,
        address: profile.address,
        name: profile.name,
        description: profile.description,
      })
      updateUserInfo(profile)
    } catch (e) {
      alert('Ops, we got an error. Try again later.')
    }
  }

  React.useEffect(() => {
    if (modalError) {
      alert('Ops, we got an error. Try again later.')
    }
  }, [modalError])

  return (
    <div className="bg-gray-custom min-h-screen">
      <Head>
        <title>Users List - Superformula</title>
        <meta content="The awesome user list from Superformula" name="description" />
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <ModalContext.Provider value={{
        showModal,
        closeModal,
        openModal,
        profile,
      }}>
        <main className="container mx-auto">
          <div className="flex justify-between p-6 pt-32">
            <Title>Users list</Title>
            <div className="basis-1/3">
              <Input
                onChange={(e: { target: HTMLInputElement }) =>
                  setInput(e.target.value)
                }
                value={input}
              />
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
                onClick={() => openModal(item)}
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
        <Modal
          address={profile.address}
          description={profile.description}
          id={profile.id}
          isLoading={isModalLoading}
          name={profile.name}
          onSaveButtonClick={chandAndUpdateUser}
        />
      </ModalContext.Provider>
    </div>
  )
}

export default Home
