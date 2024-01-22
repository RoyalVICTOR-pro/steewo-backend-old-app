import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { User } from '@/types/User'

export const useAuthStore = defineStore('auth', () => {
  const { $api } = useNuxtApp()
  const user: User = ref({})
  const isLoggedIn = ref(false)

  const login = async (email: string, password: string) => {
    try {
      const data = await $fetch($api('/login'), {
        method: 'POST',
        credentials: 'include',
        body: {
          email,
          password,
        },
      })
      console.log('data :>> ', data.user)
      user.value = data.user
      return true
    } catch (error) {
      console.log('error :>> ', error)
    }
    return false
  }

  const checkIfLoggedIn = async (route: string) => {
    try {
      const data = await $fetch($api('/me'), {
        credentials: 'include',
      })

      user.value = data.user
      isLoggedIn.value = true
      return isLoggedIn.value
    } catch (error) {
      isLoggedIn.value = false
      console.log('error :>> ', error)
      return isLoggedIn.value
    }
  }

  return {
    login,
    isLoggedIn,
    user,
    checkIfLoggedIn,
  }
})
