import React from 'react'
import { useQuery } from '@apollo/client'

import { LIST_USERS } from '../graphql/queries/listUsers'
import { Query, User } from '../graphql/types'
import { Profile } from '../context/modal'

const LIMIT = 6

export const useUserList = () => {
  const [users, setUsers] = React.useState<User[]>([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [nextToken, setNextToken] = React.useState('')
  const [showButton, setShowButton] = React.useState(true)
  const { loading: isLoadingData, data, fetchMore } = useQuery<Query>(LIST_USERS, {
    variables: {
      limit: LIMIT,
      nextToken: '',
    },
  })

  const loadMore = async () => {
    setIsLoading(true)

    const { error, data: { listUser } } = await fetchMore({
      variables: {
        limit: LIMIT,
        nextToken,
      },
    })

    if (error) {
      alert('We were not able to load more data :(')
      return
    }

    setUsers([
      ...users,
      ...listUser.items,
    ])

    if (listUser?.nextToken === null || listUser?.items?.length === 0) {
      setShowButton(false)
      return
    }

    setNextToken(listUser?.nextToken)

    setIsLoading(false)
  }

  React.useEffect(() => {
    if (isLoadingData === false) {
      if (data?.listUser) {
        setUsers([
          ...users,
          ...data.listUser.items,
        ])
      }

      setIsLoading(isLoadingData)

      const token = data?.listUser?.nextToken
      if (token === null || token === undefined) {
        setShowButton(false)
        return
      }

      setNextToken(token)
    }
  }, [isLoadingData])

  const updateUserInfo = (profile: Profile) => {
    const filteredList = users.filter(user => user.id !== profile.id)
    const modifiedUser = users.find(user => user.id === profile.id) as User
    const updatedUser = {
      ...modifiedUser,
      ...profile,
    }

    filteredList.unshift(updatedUser)

    setUsers(filteredList)
  }

  return {
    users,
    isLoading,
    showButton,
    loadMore,
    updateUserInfo,
  }
}