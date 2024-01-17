export default defineNuxtRouteMiddleware(async (to, from) => {
  const { $api } = useNuxtApp()
  const authStore = useAuthStore()
  const { isLoggedIn } = storeToRefs(authStore)

  if (to.path === '/login') {
    setPageLayout('blank')
  } else {
    setPageLayout('default')
  }

  const routeToGo = to.path === '/login' ? '/' : to.path

  await authStore.checkIfLoggedIn(routeToGo)

  if (!isLoggedIn.value && to.path !== '/login') {
    return navigateTo({
      path: '/login',
      query: { redirect: routeToGo.replace('/', '') },
    })
  }

  if (isLoggedIn.value && to.path === '/login') {
    return navigateTo('/')
  }
})
