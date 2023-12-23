export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore()
  console.log('Entrée dans le middleware')
  console.log('isLoggedIn', authStore.isLoggedIn)
  console.log('to.path', to.path)
  console.log('from.path', from.path)
  console.log('to.fullPath', to.fullPath)
  if (!authStore.isLoggedIn && to.path !== '/login') {
    return navigateTo('/login')
  }
})
