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
        console.log('user.value :>> ', user.value)
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
      user.value = await get('/me')
      isLoggedIn.value = true
    } catch (error) {
      console.log('Passage dans le catch de checkIfLoggedIn')
      isLoggedIn.value = false
    }
  }

  return {
    login,
    isLoggedIn,
    user,
    checkIfLoggedIn,
  }
})
