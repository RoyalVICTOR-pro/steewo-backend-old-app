<script lang="ts" setup>
import type { Profession } from '@/types/Profession'
const { $api } = useNuxtApp()
const headers = useRequestHeaders(['cookie'])
const authStore = useAuthStore()

const { data: professions } = await useFetch<Profession[]>(
  $api('/professions'),
  {
    credentials: 'include',
  }
)
</script>

<template>
  <h1>Professions</h1>
  <ul>
    <li v-for="profession in professions">{{ profession.name }}</li>
  </ul>
</template>

<style></style>
