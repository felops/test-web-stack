import React from 'react'
import { useMutation, } from '@apollo/client'

import { Profile } from '../context/modal'

import { UPDATE_USER } from '../graphql/mutations/updateUser'

export const useModal = () => {
  const [showModal, setShowModal] = React.useState(false)
  const [profile, setProfile] = React.useState<Profile>({
    id: '0',
    name: '',
    address: '',
    description: '',
  })
  const [mutateUser, { data, loading, error }] = useMutation(UPDATE_USER)

  const closeModal = () => {
    setShowModal(false)
  }

  const openModal = (currentProfile: Profile) => {
    setProfile(currentProfile)
    setShowModal(true)
  }

  const updateUser = (updatedProfile: Profile) => {
    if (!profile) return

    mutateUser({
      variables: {
        id: updatedProfile.id,
        address: updatedProfile.address,
        name: updatedProfile.name,
        description: updatedProfile.description,
        updatedAt: new Date().toISOString(),
      },
    })
  }

  return {
    closeModal,
    isModalLoading: loading,
    modalError: error,
    openModal,
    showModal,
    profile,
    updateUser,
  }
}
