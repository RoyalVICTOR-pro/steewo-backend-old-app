import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useFetch } from '@vueuse/core'

export const useAuthStore = defineStore('auth', () => {
  const { $api } = useNuxtApp()
  const isLoggedIn = ref(false)
  const askedRoute = ref('')

  const login = async (email: string, password: string) => {
    console.log('Entrée dans le login côté store')
    try {
      console.log("$api('/login') :>> ", $api('/login'))
      const fetchResponse = useFetch($api('/login')).post({
        email,
        password,
      })
      const { isFetching, error, data } = await fetchResponse
      if (data.value) {
        const response = JSON.parse(data.value).loginResponse
        if (response.token) {
          isLoggedIn.value = true
          console.log('response.token :>> ', response.token)
          document.cookie = `access_token=${response.token};secure; samesite=none;`
          console.log("le cookie vient d'être créé")
          return true
        }
      }
    } catch (error) {
      console.log('error :>> ', error)
    }
    // TODO: gérer l'erreur (avec un store dédié aux erreurs ?)
    return false
  }

  const logout = () => {
    // faire une route pour revoker le token et l'appeler
  }

  return {
    isLoggedIn,
    login,
    logout,
  }
})
