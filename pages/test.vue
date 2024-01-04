<script lang="ts" setup>
const authStore = useAuthStore()
const { user } = storeToRefs(authStore)
</script>

<template>
  <h1>Tests</h1>
  <ul>
    Bonjour
    {{
      user.email
    }}
  </ul>
</template>

<style></style>
