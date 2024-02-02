import { Profession } from './../types/Profession'
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
// import { useFetch } from '@vueuse/core'
import type { Profession } from '@/types/Profession'

export const useProfessionStore = defineStore('profession', () => {
  const professions = ref<Profession[]>([])
  const { $api } = useNuxtApp()
  const { get, post, update, del } = useApi()
  const { t } = useI18n()
  const { toastSuccess, toastError } = useCustomToast()
  const professionsCount = computed(() => professions.value.length)

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
      return profession
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

  const updateProfession = async (profession: Profession) => {
    try {
      const updatedProfession = await update(
        `/professions/${profession.id}`,
        profession
      )
      toastSuccess(t('bo.toasts.professionUpdated'))
      return true
    } catch (error) {
      toastError(error.message)
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
    addProfession,
    updateProfession,
    deleteProfession,
  }
})
