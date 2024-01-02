export default defineNuxtRouteMiddleware(async (to, from) => {
  const { $api } = useNuxtApp()
  // const authStore = useAuthStore()
  // const { isLoggedIn } = storeToRefs(authStore)
  let testLogin = ref(false)
  const routeToGo = to.path === '/login' ? '/' : to.path

  // await authStore.checkIfLoggedIn(routeToGo)
  // const headers = useRequestHeaders(['cookie'])
  // console.log('headers :>> ', headers)

  const fetchResponse = useFetch($api('/me'), {
    credentials: 'include',
  })

  const { error, data } = await fetchResponse

  if (data.value) {
    console.log('connecté')
    const user = data.value.user
    console.log('user :>> ', user)
    testLogin = true
  } else {
    console.log('non connecté')
    testLogin = false
  }

  if (!testLogin && to.path !== '/login') {
    console.log('On va vers /login')
    return navigateTo({
      path: '/login',
      query: { redirect: routeToGo.replace('/', '') },
    })
  }
})
