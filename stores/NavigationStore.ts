import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useNavigationStore = defineStore('navigation', () => {
  const { t } = useI18n()
  const pageTitle = ref('')
  const mobileSidebarIsOpen = ref(false)

  const toggleMobileSidebar = () => {
    mobileSidebarIsOpen.value = !mobileSidebarIsOpen.value
  }

  const mainMenuLinks = ref([
    {
      label: t('bo.navigation.dashboard'),
      icon: 'i-heroicons-home',
      to: '/',
    },
    {
      label: t('bo.navigation.professions'),
      icon: 'i-heroicons-briefcase',
      to: '/professions',
    },
    {
      label: t('bo.navigation.students'),
      icon: 'i-heroicons-academic-cap',
      to: '/students',
    },
    {
      label: t('bo.navigation.missions'),
      icon: 'i-heroicons-newspaper',
      to: '/missions',
    },
  ])
  const logoutLink = ref({
    icon: 'i-heroicons-arrow-left-start-on-rectangle',
    label: 'Se déconnecter',
    to: '/logout',
  })

  const updatePageTitle = (title: string) => {
    pageTitle.value = title
  }

  return {
    pageTitle,
    mainMenuLinks,
    logoutLink,
    updatePageTitle,
    toggleMobileSidebar,
    mobileSidebarIsOpen,
  }
})
