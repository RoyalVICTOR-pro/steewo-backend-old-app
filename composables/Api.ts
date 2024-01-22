export const useApi = () => {
  const { $api } = useNuxtApp()
  const { t } = useI18n()

  const handleApiErrors = (error) => {
    console.log(`Error ${error.statusCode} :>> ${error.statusMessage}`)
    switch (error.statusCode) {
      case 401:
      case 404:
        throw new Error(error.statusMessage)
      case 422:
        throw new Error(error.data.message.errors[0].message)
      default:
        throw new Error(t('bo.errors.internalServerError'))
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
