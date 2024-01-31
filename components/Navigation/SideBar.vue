<template>
  <div class="sidebar_container">
    <div
      :class="
        navigationStore.mobileSidebarIsOpen ? 'sidebar is_active' : 'sidebar'
      "
    >
      <div class="flex items-start justify-between">
        <ImageLogo class="mt-2 ml-3 mb-12" />
        <UButton
          icon="i-heroicons-chevron-double-left"
          variant="ghost"
          size="lg"
          square
          class="close_button"
          v-if="navigationStore.mobileSidebarIsOpen"
          @click="navigationStore.toggleMobileSidebar()"
        />
      </div>
      <NavigationMenu />
      <div class="flex-1"></div>
      <UDivider type="dashed" class="my-6" />
      <NavigationMenuItem
        :id="logoutLink.id"
        :label="logoutLink.label"
        :icon="logoutLink.icon"
        :active="logoutLink.active"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const navigationStore = useNavigationStore()
const logoutLink = navigationStore.logoutLink
</script>

<style scoped lang="scss">
.sidebar_container {
  @apply sticky 
  top-0 
  overflow-hidden 
  z-40 
  border-r 
  border-gray-200 
  dark:border-gray-800 
  shadow-md;
}

.sidebar {
  @apply bg-white text-gray-900 px-1 py-3 h-screen;
}

.close_button {
  @apply text-zinc-400 p-0 pr-1;
}
@media (min-width: 1280px) {
  .sidebar {
    width: 260px;
    max-width: 340px;
  }

  .sidebar_open_button {
    display: none;
  }
}

@media (max-width: 1279px) {
  .sidebar {
    display: none;
  }

  .sidebar.is_active {
    width: 260px;
    max-width: 340px;
    @apply flex flex-col fixed top-0 left-0 z-40;
  }

  .sidebar_open_button {
    @apply fixed top-4 left-4 z-50;
  }
}
</style>
