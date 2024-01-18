import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
// import { useFetch } from '@vueuse/core'
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
    professions.value = fetchedProfessions.value
    return professions
  }

  const getProfession = computed((id: number) => {
    return professions.value.find((p) => p.id === id)
  })

  const addProfession = async (profession) => {
    const {
      data: newProfession,
      status,
      error,
    } = await useFetch($api('/professions'), {
      method: 'POST',
      credentials: 'include',
      body: profession,
    })

    if (status === 'success') {
      professions.value.push(newProfession)
      return true
    }
    console.log('error dans addProfession du ProfessionStore :>> ', error.value)
    console.log('error.status :>> ', error.statusCode)
    console.log('error.message :>> ', error.statusMessage)
    console.log('error.value.status :>> ', error.value.statusCode)
    console.log('error.value.message :>> ', error.value.statusMessage)
    console.log(
      'error.value.data.message.errors.message :>> ',
      error.value.data.message.errors.message
    )
    console.log(
      'error.value.data.message.errors[0].message :>> ',
      error.value.data.message.errors[0].message
    )
    console.log('error :>> ', error)
    return false
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
