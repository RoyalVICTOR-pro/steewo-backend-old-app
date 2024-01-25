import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { User } from '@/types/User'

export const useAuthStore = defineStore('auth', () => {
  const user: User = ref({})
  const isLoggedIn = ref(false)
  const { get, post } = useApi()
  const toast = useToast()

  const login = async (email: string, password: string) => {
    try {
      const response = await post('/login', {
        email,
        password,
      })
      if (response.user) {
        user.value = response.user
        return true
      }
    } catch (error) {
      toast.add({
        title: error.message,
        icon: 'i-heroicons-x-circle',
        color: 'red',
      })
      return false
    }
  }

  const checkIfLoggedIn = async (route: string) => {
    try {
      user.value = await get('/me-as-admin')
      isLoggedIn.value = true
    } catch (error) {
      isLoggedIn.value = false
    }
  }

  const logout = async () => {
    try {
      await get('/logout').then((response) => {
        user.value = {}
        isLoggedIn.value = false
        toast.add({
          title: response,
          icon: 'i-heroicons-check-circle',
          color: 'green',
          timeout: 3000,
        })
        return navigateTo('/login')
      })
    } catch (error) {
      console.error(error.message)
    }
  }

  return {
    login,
    logout,
    isLoggedIn,
    user,
    checkIfLoggedIn,
  }
})
