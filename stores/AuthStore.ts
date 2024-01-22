import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
// import { useFetch } from '@vueuse/core'
import { User } from '@/types/User'

export const useAuthStore = defineStore('auth', () => {
  const { $api } = useNuxtApp()
  const user: User = ref({})
  const isLoggedIn = ref(false)
  const { get, post } = useApi()

  const login = async (email: string, password: string) => {
    try {
      const fetchResponse = useFetch($api('/login'), {
        credentials: 'include',
      }).post({
        email,
        password,
      })
      const { error, data } = await fetchResponse
      if (data.value) {
        const response = JSON.parse(data.value)
        if (response.user) {
          user.value = response.user
          return true
        }
      }
    } catch (error) {
      console.log('error :>> ', error)
    }
    return false
  }

  const checkIfLoggedIn = async (route: string) => {
    const fetchResponse = useFetch($api('/me'), {
      credentials: 'include',
    })

    const { error, data } = await fetchResponse

    if (data.value) {
      user.value = JSON.parse(data.value).user
      isLoggedIn.value = true
    } else {
      isLoggedIn.value = false
    }
    return isLoggedIn.value
  }

  return {
    login,
    isLoggedIn,
    user,
    checkIfLoggedIn,
  }
})
