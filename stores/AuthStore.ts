import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { User } from '@/types/User'

export const useAuthStore = defineStore('auth', () => {
  const user: User = ref({})
  const isLoggedIn = ref(false)
  const { get, post } = useApi()
  const { toastSuccess, toastError } = useCustomToast()

  const login = async (email: string, password: string) => {
    try {
      const response = await post('/admin/login', {
        email,
        password,
      })
      if (response.user) {
        user.value = response.user
        return true
      }
    } catch (error) {
      toastError(error.message)
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
        toastSuccess(response)
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
