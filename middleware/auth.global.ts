export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore()
  const { isLoggedIn } = storeToRefs(authStore)

  if (to.path.includes('login')) {
    setPageLayout('blank')
  } else {
    setPageLayout('default')
  }

  const routeToGo = to.path.includes('login') ? '/' : to.path

  await authStore.checkIfLoggedIn(routeToGo)

  if (!isLoggedIn.value && !to.path.includes('login')) {
    return navigateTo({
      path: '/login',
      query: { redirect: routeToGo.replace('/', '') },
    })
  }

  if (isLoggedIn.value && to.path.includes('login')) {
    return navigateTo('/')
  }
})
