export default defineNuxtRouteMiddleware(async (to, from) => {
  const { $api } = useNuxtApp()
  const headers = useRequestHeaders(['cookie'])
  const authStore = useAuthStore()
  const { setAskedRoute } = authStore
  const { askedRoute } = storeToRefs(authStore)

  /* 
  Si tu demandes une page spécifique sans être connecté, faut aller vers /login et après aller à la page demandée
  Si tu demandes une page spécifique en étant connecté, faut aller à la page demandée
  Si tu demandes aucune page, (accès direct à /login) et que tu te connectes, tu dois aller vers /
  */

  console.log('from = ' + from.path + ' & to = ' + to.path)
  console.log('au début askedRoute :>> ', askedRoute.value)

  const fetchResponse = useFetch($api('/me'), { headers })
  const { isFetching, error, data } = await fetchResponse

  if (data.value) {
    console.log('Si on est connecté...')
    if (askedRoute.value !== '' && askedRoute.value !== undefined) {
      const routeToGo = askedRoute.value
      authStore.setAskedRoute('')
      console.log(
        '...et on demande ' +
          routeToGo +
          ', on navigue vers ' +
          routeToGo +
          'et askedRoute est remis à ' +
          askedRoute.value +
          ' (vide)'
      )
      return navigateTo(routeToGo)
    }
    if (to.path == '/login') {
      console.log('...et on demande /login, on navigue vers /')
      return navigateTo('/')
    }
  }

  if (to.path !== '/login') {
    if (error.value && error.value.statusCode === 401) {
      console.log("Ici, erreur d'authentification,... ")
      if (to.path !== '/login' && askedRoute.value !== '/login') {
        authStore.setAskedRoute(to.path)
        console.log(
          '...on navigue vers /login en sachant que askedRoute est :>> ',
          askedRoute.value
        )
        return navigateTo('/login')
      }
    }
  }
})
