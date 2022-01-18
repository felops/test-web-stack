import React from 'react'
import type { NextPage } from 'next'

import Button from '../Button'
import Input from '../Input'
import Title from '../Title'

import { ModalContext, Profile } from '../../context/modal'

interface ModalProps {
  id: string,
  name: string,
  address: string,
  description: string,
  isLoading: boolean,
  onSaveButtonClick: (profile: Profile) => void
}

const Modal: NextPage<ModalProps> = ({
  id,
  name,
  address,
  description,
  isLoading,
  onSaveButtonClick,
}) => {
  const {
    showModal,
    closeModal,
  } = React.useContext(ModalContext)

  const [addressInput, setAddressInput] = React.useState('')
  const [nameInput, setNameInput] = React.useState('')
  const [descriptionInput, setDescriptionInput] = React.useState('')

  React.useEffect(() => {
    setAddressInput(address)
    setNameInput(name)
    setDescriptionInput(description)
  }, [id, name, address, description])

  const onSave = () => {
    onSaveButtonClick({
      id,
      address: addressInput,
      name: nameInput,
      description: descriptionInput,
    })
  }

  if (!showModal) {
    return null
  }

  return (
    <>
      <div className="fixed top-0 bg-black opacity-30 min-h-full w-full"/>
      <div className="fixed top-0 min-h-full w-full">
        <div className="container mx-auto mt-36 p-12 bg-white opacity-100">
          <div className="flex flex-col justify-center justify-items-center">
            <Title>Edit User</Title>
            <form className="flex flex-row py-10">
              <div className="flex-1 bg-slate-400 mr-10" />
              <div className="flex-1">
                <div>
                  <p>Name</p>
                  <Input
                    onChange={(e: { target: HTMLInputElement }) =>
                      setNameInput(e.target.value)
                    }
                    value={nameInput}
                  />
                </div>
                <div>
                  <p>Address</p>
                  <Input
                    onChange={(e: { target: HTMLInputElement }) =>
                      setAddressInput(e.target.value)
                    }
                    value={addressInput}
                  />
                </div>
                <div>
                  <p>Description</p>
                  <Input
                    onChange={(e: { target: HTMLInputElement }) =>
                      setDescriptionInput(e.target.value)
                    }
                    value={descriptionInput}
                  />
                </div>
              </div>
            </form>
            <div className="flex flex-row">
              <div className="flex-1" />
              <span className="pr-8">
                <Button loading={isLoading} onClick={onSave}>
                  SAVE
                </Button>
              </span>
              <Button onClick={closeModal}>
                CANCEL
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Modal
