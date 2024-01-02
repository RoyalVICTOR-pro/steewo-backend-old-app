import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useFetch } from '@vueuse/core'

export const useAuthStore = defineStore('auth', () => {
  const { $api } = useNuxtApp()
  const user = ref({})
  const askedRoute = ref('')
  const isLoggedIn = ref(false)
  // const tokenCookie = useCookie('access_token', {
  //   secure: true,
  //   samesite: 'none',
  // })

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
        const response = JSON.parse(data.value).loginResponse
        if (response.user) {
          // console.log('response.token :>> ', response.token)
          // tokenCookie.value = response.token
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
    // console.log('headers in the isLoggedIn', tokenCookie.value)
    const headers = useRequestHeaders(['cookie'])
    console.log('headers :>> ', headers)
    // const
    // const fetchResponse =
    // const fetchResponse = useFetch($api('/me'), {
    //   cookie: `access_token=${tokenCookie.value}`,
    // })

    const { error, data } = await useFetch($api('/me'), {
      credentials: 'include',
      headers,
    })

    if (data.value) {
      console.log('connecté')
      user.value = JSON.parse(data.value).user
      isLoggedIn.value = true
    } else {
      console.log('non connecté')
      askedRoute.value = route
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
