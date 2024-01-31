<script lang="ts" setup>
const { t } = useI18n()
const links = [
  {
    label: t('bo.navigation.dashboard'),
    icon: 'i-heroicons-home',
    to: '/',
  },
  {
    label: t('bo.navigation.professions'),
    icon: 'i-heroicons-briefcase',
    to: '/professions',
  },
  {
    label: t('bo.navigation.students'),
    icon: 'i-heroicons-academic-cap',
    to: '/students',
  },
  {
    label: t('bo.navigation.missions'),
    icon: 'i-heroicons-newspaper',
    to: '/missions',
  },
]

const pageLinks = [
  {
    icon: 'i-heroicons-arrow-left-start-on-rectangle',
    label: 'Se déconnecter',
    to: '/logout',
  },
]

const navigationStore = useNavigationStore()
</script>

<template>
  <div class="flex">
    <NavigationSideBar />
    <NavigationBackdrop v-if="navigationStore.mobileSidebarIsOpen" />
    <div class="flex flex-col flex-1">
      <!-- <UHeader class="shadow-sm" :title="navigationStore.pageTitle" /> -->
      <!-- <Header :title="navigationStore.pageTitle" /> -->
      <NavigationHeader :title="navigationStore.pageTitle" />
      <div class="flex-1 overflow-auto">
        <UContainer class="lg:py-4">
          <slot />
        </UContainer>
      </div>
    </div>
  </div>
  <!-- <UPage class="lg:gap-0">
    <template #left>
      <UAside class="h-screen lg:top-0 shadow-md lg:mx-0 lg:max-h-screen z-60">
        <ImageLogo class="mb-12" />
        <UNavigationTree :links="links" />
        <UDivider type="dashed" class="my-6" />
        <UPageLinks :links="pageLinks" />
      </UAside>
    </template>
    
    <UContainer class="lg:py-4">
      <slot />
    </UContainer>
  </UPage> -->
</template>

<style scoped>
/* ... styles spécifiques à votre mise en page ... */
</style>
