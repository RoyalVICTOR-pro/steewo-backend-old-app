export const useApi = () => {
  const { $api, $i18n } = useNuxtApp()
  // const { t } = useI18n()
  // Comme il n'est pas possible d'utiliser useI18n() dans un middleware,
  // on a récupèré la fonction t() de $i18n depuis useNuxtApp()
  // https://github.com/nuxt-modules/i18n/issues/1831

  const handleApiErrors = (error) => {
    console.log(`Error ${error.statusCode} :>> ${error.statusMessage}`)
    switch (error.statusCode) {
      case 401:
      case 404:
        throw new Error(error.statusMessage)
      case 422:
        throw new Error(error.data.message.errors[0].message)
      default:
        throw new Error($i18n.t('bo.errors.internalServerError'))
      // throw new Error('Une erreur est survenue. Merci de réessayer ultérieurement.')
    }
  }

  const get = async (endpoint) => {
    try {
      const data = await $fetch($api(endpoint), {
        credentials: 'include',
      })
      return data
    } catch (error) {
      return handleApiErrors(error)
    }
  }

  const post = async (endpoint, content = {}) => {
    try {
      const data = await $fetch($api(endpoint), {
        method: 'POST',
        credentials: 'include',
        body: content,
      })
      return data
    } catch (error) {
      return handleApiErrors(error)
    }
  }

  return { get, post }
}
