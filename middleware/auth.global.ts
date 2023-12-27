export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore()
  const { $api } = useNuxtApp()
  const headers = useRequestHeaders(['cookie'])

  /* 
  Si tu demandes une page spécifique sans être connecté, faut aller vers /login et après aller à la page demandée
  Si tu demandes une page spécifique en étant connecté, faut aller à la page demandée
  Si tu demandes aucune page, (accès direct à /login) et que tu te connectes, tu dois aller vers /
  */
  authStore.isLoggedIn = false
  const fetchResponse = useFetch($api('/me'), { headers })
  const { isFetching, error, data } = await fetchResponse
  console.log('from.path', from.path)

  if (data.value) {
    authStore.isLoggedIn = true
    console.log('Si on est connecté...')
    if (authStore.askedRoute !== '' && authStore.askedRoute !== undefined) {
      const routeToGo = authStore.askedRoute
      authStore.askedRoute = ''
      console.log(
        '...et on demande ' + routeToGo + ', on navigue vers ' + routeToGo
      )
      return navigateTo(routeToGo)
    }
    if (to.path == '/login') {
      console.log('...et on demande /login, on navigue vers /')
      return navigateTo('/')
    }
  }

  if (error.value && error.value.statusCode === 401) {
    console.log("Ici, erreur d'authentification,... ")
    console.log('to.path :>> ', to.path)
    console.log('authStore.askedRoute :>> ', authStore.askedRoute)
    if (authStore.askedRoute !== '/login' && to.path !== '/login') {
      authStore.askedRoute = to.path
      console.log(
        '...on navigue vers /login en sachant que askedRoute est :>> ',
        authStore.askedRoute
      )
      return navigateTo('/login')
    }
  }
})
