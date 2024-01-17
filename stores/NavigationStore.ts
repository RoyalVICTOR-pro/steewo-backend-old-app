import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useNavigationStore = defineStore('navigation', () => {
  const pageTitle = ref('')

  const updatePageTitle = (title: string) => {
    pageTitle.value = title
  }

  return {
    pageTitle,
    updatePageTitle,
  }
})
