<template>
  <div class="sidebar_container">
    <div
      :class="
        navigationStore.mobileSidebarIsOpen ? 'sidebar is_active' : 'sidebar'
      "
    >
      <!-- Sidebar Content Goes Here -->
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
    </div>
  </div>
</template>

<script lang="ts" setup>
// [x] Le sidebar est un composant qui affiche :
// [x] - un bouton Fermer,
// [x] - le logo,
// [ ] - le menu,
// [ ] - un séparateur
// [ ] - et un MenuItem pour la déconnexion
// [x] Le sidebar est affiché dans le layout default.vue
// [x] Le sidebar est blanc avec un border-right de 1px et 1 ombre
// [x] L'affichage du sidebar est affiché en version Desktop
// [x] L'affichage du sidebar est caché en version Mobile
// [x] et un bouton apparaît pour le faire apparaître
// [x] Au clic sur le bouton, la sidebar apparaît par dessus le contenu,
// [x] avec un fond semi - transparent sur le contenu
// [x] Au clic sur le bouton Fermer, la sidebar et le fond disparaîssent
// [x] Au clic sur le fond semi-transparent, la sidebar et le fond disparaîssent

const navigationStore = useNavigationStore()
</script>

<style scoped>
.sidebar_container {
  @apply sticky top-0 overflow-hidden z-40 border-r border-gray-200 dark:border-gray-800 shadow-md;
}

.sidebar {
  @apply bg-white text-gray-900 px-2 py-3 h-screen;
}

.close_button {
  @apply text-zinc-400 p-0;
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
    display: block;
    width: 260px;
    max-width: 340px;
    @apply fixed top-0 left-0 z-40;
  }

  .sidebar_open_button {
    @apply fixed top-4 left-4 z-50;
  }
}
</style>
