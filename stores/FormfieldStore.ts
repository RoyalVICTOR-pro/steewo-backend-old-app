import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { FormField } from '@/types/FormField'
import type { FormFieldOrder } from '@/types/FormFieldOrder'

export const useFormFieldStore = defineStore('formfield', () => {
  const formFields = ref<FormField[]>([])
  const { $api } = useNuxtApp()
  const { get, post, update, patch, del } = useApi()
  const { t } = useI18n()
  const { toastSuccess, toastError } = useCustomToast()
  const formFieldsCount = computed(() => formFields.value.length)

  const getFormFields = async (id_service) => {
    try {
      formFields.value = await get('/services/' + id_service + '/form-fields')
      return formFields
    } catch (error) {
      toastError(error.message)
    }
  }

  const getFormFieldById = async (id, id_service) => {
    try {
      const formField: FormField = await get(
        '/services/' + id_service + '/form-fields/' + id.toString()
      )
      return formField
    } catch (error) {
      toastError(error.message)
    }
  }

  const addFormField = async (formField, id_service) => {
    try {
      const newFormField = await post(
        `/services/${id_service}/form-fields`,
        formField
      )
      formFields.value.push(newFormField)
      toastSuccess(t('bo.toasts.formFieldAdded'))
      return true
    } catch (error) {
      toastError(error.message)
    }
  }

  const updateFormField = async (
    formField: FormData,
    serviceId: number,
    formFieldId: number
  ) => {
    try {
      const updatedFormField = await update(
        `/services/${serviceId}/form-fields/${formFieldId}`,
        formField
      )
      toastSuccess(t('bo.toasts.formFieldUpdated'))
      return true
    } catch (error) {
      toastError(error.message)
    }
  }

  const updateFormFieldsOrder = async (
    formFields: FormFieldOrder[],
    id_service
  ) => {
    try {
      await patch(`/services/${id_service}/form-fields/order`, {
        formFields: formFields,
      })
      toastSuccess(t('bo.toasts.formFieldsReordered'))
      return getFormFields(id_service)
    } catch (error) {
      toastError(error.message)
    }
  }

  const deleteFormFieldToolTipImage = async (id: Number) => {
    try {
      await patch(`/form-fields/${id}/delete-tooltip-image`)
      toastSuccess(t('bo.toasts.formFieldTooltipImageDeleted'))
      return true
    } catch (error) {
      toastError(error.message)
      return false
    }
  }

  const deleteFormField = async (id: Number, id_service) => {
    try {
      await del(`/services/${id_service}/form-fields/${id}`)
      getFormFields(id_service)
      toastSuccess(t('bo.toasts.formFieldDeleted'))
      return true
    } catch (error) {
      toastError(error.message)
    }
  }

  return {
    formFields,
    formFieldsCount,
    getFormFields,
    getFormFieldById,
    addFormField,
    updateFormField,
    updateFormFieldsOrder,
    deleteFormFieldToolTipImage,
    deleteFormField,
  }
})
