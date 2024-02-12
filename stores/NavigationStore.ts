import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import MenuID from '@/enums/MenuID'

export const useNavigationStore = defineStore('navigation', () => {
  const { t } = useI18n()
  const pageTitle = ref('')
  const mobileSidebarIsOpen = ref(false)

  const toggleMobileSidebar = () => {
    mobileSidebarIsOpen.value = !mobileSidebarIsOpen.value
  }

  const goToMainMenu = (id: string) => {
    if (mobileSidebarIsOpen.value) {
      toggleMobileSidebar()
    }

    return navigateTo(getRouteById(id))
  }

  const getRouteById = (id: string) => {
    if (id === MenuID.LOGOUT) {
      return '/logout'
    }

    const link = mainMenuLinks.value.find((link) => link.id === id)
    if (link) {
      return link.to
    }
    return '/'
  }

  const mainMenuLinks = ref([
    {
      id: MenuID.DASHBOARD,
      active: true,
      label: t('bo.navigation.dashboard'),
      icon: 'i-heroicons-home',
      to: '/',
    },
    {
      id: MenuID.PROFESSIONS,
      active: false,
      label: t('bo.navigation.professions'),
      icon: 'i-heroicons-briefcase',
      to: '/professions',
    },
    {
      id: MenuID.STUDENTS,
      active: false,
      label: t('bo.navigation.students'),
      icon: 'i-heroicons-academic-cap',
      to: '/students',
    },
    {
      id: MenuID.MISSIONS,
      active: false,
      label: t('bo.navigation.missions'),
      icon: 'i-heroicons-newspaper',
      to: '/missions',
    },
  ])
  const logoutLink = ref({
    id: MenuID.LOGOUT,
    active: false,
    icon: 'i-heroicons-arrow-left-start-on-rectangle',
    label: 'Se déconnecter',
    to: '/logout',
  })

  const updatePageTitle = (title: string) => {
    pageTitle.value = title
  }

  const setMainMenuActiveLink = (linkId: string) => {
    mainMenuLinks.value.forEach((link) => {
      link.active = link.id === linkId
    })
  }

  return {
    pageTitle,
    mainMenuLinks,
    logoutLink,
    updatePageTitle,
    toggleMobileSidebar,
    mobileSidebarIsOpen,
    goToMainMenu,
    setMainMenuActiveLink,
  }
})
