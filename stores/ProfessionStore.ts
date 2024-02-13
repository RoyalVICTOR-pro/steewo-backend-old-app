import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { Profession } from '@/types/Profession'

export const useProfessionStore = defineStore('profession', () => {
  const professions = ref<Profession[]>([])
  const { $api } = useNuxtApp()
  const { get, post, update, patch, del } = useApi()
  const { t } = useI18n()
  const { toastSuccess, toastError } = useCustomToast()
  const professionsCount = computed(() => professions.value.length)
  const currentProfession = ref<Profession | null>(null)

  const getProfessions = async () => {
    try {
      professions.value = await get('/professions')
      return professions
    } catch (error) {
      toastError(error.message)
    }
  }

  const getProfessionById = async (id) => {
    try {
      const profession: Profession = await get('/professions/' + id.toString())
      currentProfession.value = profession
      return profession
    } catch (error) {
      toastError(error.message)
    }
  }

  const getCurrentProfession = async (id) => {
    // if (currentProfession.value) return currentProfession.value
    console.log('id in getCurrentProfession :>> ', id)
    try {
      currentProfession.value = await getProfessionById(id)
      return currentProfession.value
    } catch (error) {
      toastError(error.message)
    }
  }

  const addProfession = async (profession) => {
    try {
      const newProfession = await post('/professions', profession)
      professions.value.push(newProfession)
      toastSuccess(t('bo.toasts.professionAdded'))
      return true
    } catch (error) {
      toastError(error.message)
    }
  }

  const updateProfession = async (profession, professionId) => {
    try {
      const updatedProfession = await update(
        `/professions/${professionId}`,
        profession
      )
      currentProfession.value = updatedProfession
      toastSuccess(t('bo.toasts.professionUpdated'))
      return true
    } catch (error) {
      toastError(error.message)
    }
  }

  const toggleProfessionStatus = async (id: Number, is_enabled: Boolean) => {
    try {
      const isEnabledNewValue = !is_enabled
      const updatedProfession = await patch(`/professions/${id}`, {
        is_enabled: isEnabledNewValue,
      })
      professions.value = professions.value.map((p) =>
        p.id === id ? { ...p, is_enabled: isEnabledNewValue } : p
      )
      return true
    } catch (error) {
      toastError(error.message)
    }
  }

  const deleteProfessionPicto = async (id: Number) => {
    try {
      await patch(`/professions/${id}/delete-picto`)
      toastSuccess(t('bo.toasts.professionPictoDeleted'))
      return true
    } catch (error) {
      toastError(error.message)
      return false
    }
  }

  const deleteProfessionImage = async (id: Number) => {
    try {
      await patch(`/professions/${id}/delete-image`)
      toastSuccess(t('bo.toasts.professionImageDeleted'))
      return true
    } catch (error) {
      toastError(error.message)
      return false
    }
  }

  const deleteProfession = async (id: Number) => {
    try {
      await del(`/professions/${id}`)
      getProfessions()
      toastSuccess(t('bo.toasts.professionDeleted'))
      return true
    } catch (error) {
      toastError(error.message)
    }
  }

  return {
    professions,
    professionsCount,
    getProfessions,
    getProfessionById,
    getCurrentProfession,
    addProfession,
    updateProfession,
    toggleProfessionStatus,
    deleteProfessionPicto,
    deleteProfessionImage,
    deleteProfession,
  }
})
