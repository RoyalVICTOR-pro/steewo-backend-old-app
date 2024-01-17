import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Profession } from '@/types/Profession'

export const useProfessionStore = defineStore('profession', () => {
  const professions = ref<Profession[]>([])
  const { $api } = useNuxtApp()

  const getProfessions = async () => {
    const { data: fetchedProfessions } = await useFetch<Profession[]>(
      $api('/professions'),
      {
        credentials: 'include',
      }
    )
    console.log(
      'professions dans getProfessions :>> ',
      fetchedProfessions.value
    )
    professions.value = fetchedProfessions.value

    return professions
  }

  const getProfession = computed((id: number) => {
    return professions.value.find((p) => p.id === id)
  })

  const addProfession = async (profession) => {
    const { data: newProfession } = await useFetch<Profession>(
      $api('/professions', {
        method: 'POST',
        body: JSON.stringify(profession),
      }),
      {
        credentials: 'include',
      }
    )
    professions.value.push(newProfession)
    return true
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
