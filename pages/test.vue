<template>
  <h1>Tests</h1>
  <ul>
    Bonjour
    {{
      user.email
    }}
  </ul>
</template>

<script lang="ts" setup>
const authStore = useAuthStore()
const { user } = storeToRefs(authStore)
</script>

<style></style>
