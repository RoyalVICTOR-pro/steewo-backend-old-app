export const useApi = () => {
  const { $api, $i18n } = useNuxtApp()
  // const { t } = useI18n()
  // Comme il n'est pas possible d'utiliser useI18n() dans un middleware,
  // on a récupèré la fonction t() de $i18n depuis useNuxtApp()
  // https://github.com/nuxt-modules/i18n/issues/1831

  const handleApiErrors = (error) => {
    switch (error.statusCode) {
      case 401:
        throw new Error(error.data)
      case 403:
        throw new Error(error.data)
      case 404:
        throw new Error(error.data)
      case 422:
        throw new Error(error.data.errors[0].message)
      case 429:
        throw new Error(error.data)
      default:
        // console.error(error.data)
        throw new Error($i18n.t('bo.errors.internalServerError'))
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

  const update = async (endpoint, content = {}) => {
    try {
      const data = await $fetch($api(endpoint), {
        method: 'PUT',
        credentials: 'include',
        body: content,
      })
      return data
    } catch (error) {
      return handleApiErrors(error)
    }
  }

  const patch = async (endpoint, content = {}) => {
    try {
      const data = await $fetch($api(endpoint), {
        method: 'PATCH',
        credentials: 'include',
        body: content,
      })
      return data
    } catch (error) {
      return handleApiErrors(error)
    }
  }

  const del = async (endpoint) => {
    try {
      console.log('ici')
      const data = await $fetch($api(endpoint), {
        method: 'DELETE',
        credentials: 'include',
      })
      return data
    } catch (error) {
      console.log(error)
      return handleApiErrors(error)
    }
  }

  return { get, post, update, patch, del }
}
