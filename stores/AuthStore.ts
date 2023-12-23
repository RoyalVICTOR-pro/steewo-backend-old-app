import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useFetch } from '@vueuse/core'

export const useAuthStore = defineStore('auth', () => {
  const { $api } = useNuxtApp()
  const isLoggedIn = ref(false)

  const login = async (email: string, password: string) => {
    const fetchResponse = useFetch($api('/login')).post({
      email,
      password,
    })
    const { isFetching, error, data } = await fetchResponse

    if (data.value) {
      const response = JSON.parse(data.value).loginResponse
      if (response.token) {
        isLoggedIn.value = true

        document.cookie = `access_token=${response.token};secure; samesite=none;`
        console.log("le cookie vient d'être créé")
        return true
      }
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
