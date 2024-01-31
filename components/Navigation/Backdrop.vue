<template>
  <div
    class="custom_backdrop"
    @click="navigationStore.toggleMobileSidebar()"
  ></div>
</template>

<script lang="ts" setup>
const navigationStore = useNavigationStore()
</script>

<style scoped>
.custom_backdrop {
  cursor: pointer;
  @apply fixed inset-0 z-30 bg-black bg-opacity-50;
}
</style>
