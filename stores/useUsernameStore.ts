import { defineStore } from 'pinia'
import { userName } from '~/constants'

export const useUsernameStore = defineStore('username', () => {
  const username = ref('')

  const loadUsername = (): void => {
    if (typeof window !== 'undefined') {
      const storedUserName = window.localStorage.getItem(userName)
      if (storedUserName) {
        try {
          const parsedUsername = JSON.parse(storedUserName)
          username.value = parsedUsername
        } catch (error: unknown) {
          console.error('Erreur lors de la lecture du username depuis le localStorage:', error)
        }
      }
    }
  }

  const addUserName = (user: string) => {
    if (typeof window !== 'undefined') {
      const storedUserName = window.localStorage.getItem(userName)
      const existingUserName = storedUserName ? JSON.parse(storedUserName) : ''
      if (user === existingUserName) {
        username.value = existingUserName
        return
      }

      window.localStorage.setItem(userName, JSON.stringify(user))
    }
  }

  return { username, addUserName, loadUsername }
})
