import { createContext } from 'react'

export interface Profile {
  id: string
  name: string
  address: string
  description: string
}

type ContextProps = {
  showModal: boolean
  profile?: Profile
  closeModal: () => void
  openModal: (profile: Profile) => void
}

export const ModalContext = createContext<ContextProps>({
  showModal: false,
  openModal: (profile: Profile) => {},
  closeModal: () => {},
})
