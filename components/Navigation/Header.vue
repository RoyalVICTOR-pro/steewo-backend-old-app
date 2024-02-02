<template>
  <div class="header">
    <div class="sidebar_open_button">
      <UButton
        icon="i-heroicons-bars-3"
        color="gray"
        variant="ghost"
        size="lg"
        square
        @click="navigationStore.toggleMobileSidebar()"
      />
    </div>
    <h1 class="header_title">{{ props.title || t('bo.title') }}</h1>
  </div>
</template>

<script lang="ts" setup>
const navigationStore = useNavigationStore()
const { t } = useI18n()
const props = defineProps({
  title: String,
})
</script>

<style scoped lang="scss">
.header {
  @apply flex px-4 py-4 backdrop-blur border-b border-gray-200 dark:border-gray-800 -mb-px sticky top-0 z-20 shadow-sm;
}

.header_title {
  @apply flex pl-2 pb-1 items-center text-xl text-gray-900 dark:text-white;
}

@media (min-width: 1280px) {
  .sidebar_open_button {
    display: none;
  }
}

@media (max-width: 1279px) {
  .sidebar_open_button {
    @apply inline;
  }
}
</style>
