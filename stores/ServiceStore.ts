import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Service } from '@/types/Service'

export const useServiceStore = defineStore('service', () => {
  const services = ref<Service[]>([])
  const { $api } = useNuxtApp()
  const { get, post, update, patch, del } = useApi()
  const { t } = useI18n()
  const { toastSuccess, toastError } = useCustomToast()
  const servicesCount = computed(() => services.value.length)
  const currentService = ref<Service | null>(null)

  const getServices = async (id_profession) => {
    try {
      services.value = await get('/professions/' + id_profession + '/services')
      return services
    } catch (error) {
      toastError(error.message)
    }
  }

  const getServiceById = async (id, id_profession) => {
    try {
      const service: Service = await get(
        '/professions/' + id_profession + '/services/' + id.toString()
      )
      currentService.value = service
      return service
    } catch (error) {
      toastError(error.message)
    }
  }

  const getCurrentService = async (id, id_profession) => {
    if (currentService.value) return currentService.value
    try {
      currentService.value = await getServiceById(id, id_profession)
      return currentService.value
    } catch (error) {
      toastError(error.message)
    }
  }

  const addService = async (service, id_profession) => {
    try {
      const newService = await post(
        `/professions/${id_profession}/services`,
        service
      )
      services.value.push(newService)
      toastSuccess(t('bo.toasts.serviceAdded'))
      return true
    } catch (error) {
      toastError(error.message)
    }
  }

  const updateService = async (
    service: FormData,
    professionId: number,
    serviceId: number
  ) => {
    try {
      const updatedService = await update(
        `/professions/${professionId}/services/${serviceId}`,
        service
      )
      currentService.value = updatedService
      toastSuccess(t('bo.toasts.serviceUpdated'))
      return true
    } catch (error) {
      toastError(error.message)
    }
  }

  const toggleServiceStatus = async (
    id: Number,
    id_profession: Number,
    is_enabled: Boolean
  ) => {
    try {
      const isEnabledNewValue = !is_enabled
      const updatedService = await patch(
        `/professions/${id_profession}/services/${id}`,
        {
          is_enabled: isEnabledNewValue,
        }
      )
      services.value = services.value.map((p) =>
        p.id === id ? { ...p, is_enabled: isEnabledNewValue } : p
      )
      return true
    } catch (error) {
      toastError(error.message)
    }
  }

  const deleteServicePicto = async (id: Number) => {
    try {
      await patch(`/services/${id}/delete-picto`)
      toastSuccess(t('bo.toasts.servicePictoDeleted'))
      return true
    } catch (error) {
      toastError(error.message)
      return false
    }
  }

  const deleteServiceImage = async (id: Number) => {
    try {
      await patch(`/services/${id}/delete-image`)
      toastSuccess(t('bo.toasts.serviceImageDeleted'))
      return true
    } catch (error) {
      toastError(error.message)
      return false
    }
  }

  const deleteService = async (id: Number, id_profession) => {
    try {
      await del(`/professions/${id_profession}/services/${id}`)
      getServices(id_profession)
      toastSuccess(t('bo.toasts.serviceDeleted'))
      return true
    } catch (error) {
      toastError(error.message)
    }
  }

  return {
    services,
    servicesCount,
    getServices,
    getServiceById,
    getCurrentService,
    addService,
    updateService,
    toggleServiceStatus,
    deleteServicePicto,
    deleteServiceImage,
    deleteService,
  }
})
