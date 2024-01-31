<template>
  <div></div>
</template>

<script lang="ts" setup>
const authStore = useAuthStore()
await authStore.logout()
</script>

<style scoped lang="scss"></style>
