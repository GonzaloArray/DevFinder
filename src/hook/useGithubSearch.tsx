import React, { useState, useEffect } from 'react'

import { UserData } from '../types'
import { getUserGithub } from '../api/get'

export const useGithubSearch = () => {
  const [user, setUser] = useState<UserData>({}as UserData)
  const [searchUser, setUserSearch] = useState<UserData['login']>('')
  const [history, setHistory] = useState<UserData[]>([])
  const [isLoading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>()
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [fav, setFav] = useState<{ [key: number]: boolean }>({})

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    try {
      const userData = await getUserGithub(searchUser)

      if (userData.message === 'Not Found') {
        setError('Not Found')
      } else {
        const history = localStorage.getItem('searchHistory')
        const searchHistory = history ? JSON.parse(history) : []
        const isDuplicated = searchHistory.some((item:UserData) => item.id === userData.id)

        setHistory(searchHistory)

        if (!isDuplicated) {
          searchHistory.push(userData)
          localStorage.setItem('searchHistory', JSON.stringify(searchHistory))
        }
        setTimeout(() => {
          setUser(userData)
        }, 1000)
        setError(null)
      }
    } catch (err) {
      console.log(err)
    } finally {
      setTimeout(() => {
        setLoading(false)
      }, 1000)
    }
    setUserSearch('')
  }

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setUserSearch(e.target.value)
  }

  const handleToggleModal = () => {
    setOpenModal(!openModal)
  }

  const handleFav = (userId: number) => {
    setFav((prevFav) => {
      return {
        ...prevFav,
        [userId]: !prevFav[userId]
      }
    })
  }

  const deleteHistory = () => {
    localStorage.clear()
    setHistory([])
    setUser({} as UserData)
    handleToggleModal()
  }

  useEffect(() => {
    const storedHistory = localStorage.getItem('searchHistory')

    if (storedHistory) {
      setHistory(JSON.parse(storedHistory))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('searchHistory', JSON.stringify(history))
  }, [history])

  return {
    user,
    searchUser,
    history,
    isLoading,
    error,
    openModal,
    fav,
    handleSubmit,
    handleOnChange,
    handleFav,
    handleToggleModal,
    deleteHistory
  }
}
