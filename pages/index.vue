<template>
  <ul>
    <li v-for="profession in professions">{{ profession.name }}</li>
  </ul>
</template>

<script lang="ts" setup>
const { $api } = useNuxtApp()
const headers = useRequestHeaders(['cookie'])
const authStore = useAuthStore()

console.log('entrée dans la page index')

watch(
  () => authStore.isLoggedIn,
  async (newValue, oldValue) => {
    if (newValue !== oldValue && newValue === true) {
      // L'utilisateur vient de se connecter, rechargez les données
      const { data: professions } = await useFetch($api('/professions'), {
        headers,
      })
    }
  }
)
</script>

<style></style>
