export const useApi = () => {
  const { $api } = useNuxtApp()
  const { t } = useI18n()

  const handleApiErrors = (error) => {
    console.log(`Error ${error.statusCode} :>> ${error.statusMessage}`)
    switch (error.statusCode) {
      case 401:
      case 404:
        throw new Error({
          statusCode: 401,
          message: error.statusMessage,
        })
      case 422:
        throw new Error({
          statusCode: 422,
          message: error.data.message.errors[0].message,
        })
      default:
        throw new Error({
          statusCode: 500,
          message: t('bo.errors.internalServerError'),
        })
    }
  }

  const get = async (endpoint) => {
    /* 
    const { data, error } = await $fetch($api(endpoint), {
      credentials: 'include',
    })
    if (error.value) {
      handleApiErrors(error.value)
    }
    */
    try {
      const data = await $fetch($api(endpoint), {
        credentials: 'include',
      })
    } catch (error) {
      handleApiErrors(error.value)
    }

    return data.value
  }

  const post = async (endpoint, content = {}) => {
    /*     const { data, error } = await $fetch($api(endpoint), {
      method: 'POST',
      credentials: 'include',
      body: content,
    })
    if (error.value) {
      handleApiErrors(error.value)
    } */
    try {
      const data = await $fetch($api(endpoint), {
        method: 'POST',
        credentials: 'include',
        body: content,
      })
    } catch (error) {
      handleApiErrors(error.value)
    }
    return data.value
  }

  // Vous pouvez ajouter ici les méthodes put, patch, delete

  return { get, post }
}
