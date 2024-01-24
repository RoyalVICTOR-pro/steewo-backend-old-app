import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
// import { useFetch } from '@vueuse/core'
import type { Profession } from '@/types/Profession'

export const useProfessionStore = defineStore('profession', () => {
  const professions = ref<Profession[]>([])
  const { $api } = useNuxtApp()
  const { get, post } = useApi()
  const toast = useToast()
  const { t } = useI18n()

  const getProfessions = async () => {
    try {
      professions.value = await get('/professions')
      return professions
    } catch (error) {
      toast.add({
        title: error.message,
        icon: 'i-heroicons-x-circle',
        color: 'red',
      })
    }
  }

  const getProfession = computed((id: number) => {
    return professions.value.find((p) => p.id === id)
  })

  const addProfession = async (profession) => {
    try {
      const newProfession = await post('/professions', profession)
      professions.value.push(newProfession)
      toast.add({
        title: t('bo.toasts.professionAdded'),
        icon: 'i-heroicons-check-circle',
        color: 'green',
        timeout: 2000,
      })
      return true
    } catch (error) {
      toast.add({
        title: error.message,
        icon: 'i-heroicons-exclamation-triangle',
        color: 'red',
      })
    }
  }

  const updateProfession = async (profession: Profession) => {
    const { data: updatedProfession } = await useFetch<Profession>(
      $api(`/professions/${profession.id}`, {
        method: 'PUT',
        body: JSON.stringify(profession),
      }),
      {
        credentials: 'include',
      }
    )
    professions.value = professions.value.map((p) =>
      p.id === updatedProfession.id ? updatedProfession : p
    )
  }

  const deleteProfession = async (id: Number) => {
    await useFetch(
      $api(`/professions/${id}`, {
        method: 'DELETE',
      }),
      {
        credentials: 'include',
      }
    )
    getProfessions()
  }

  return {
    professions,
    getProfessions,
    getProfession,
    addProfession,
    updateProfession,
    deleteProfession,
  }
})
