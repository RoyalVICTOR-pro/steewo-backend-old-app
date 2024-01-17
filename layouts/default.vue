<script lang="ts" setup>
const links = [
  {
    label: 'Tableau de bord',
    icon: 'i-heroicons-home',
    to: '/',
  },
  {
    label: 'Professions',
    icon: 'i-heroicons-briefcase',
    to: '/professions',
  },
  {
    label: 'Etudiants',
    icon: 'i-heroicons-academic-cap',
    to: '/students',
  },
  {
    label: 'Missions',
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
  <UContainer>
    <UPage class="lg:gap-0">
      <template #left>
        <UAside class="h-screen lg:top-0 shadow-md lg:mx-0 lg:max-h-screen">
          <img src="~/assets/images/logo-steewo-color.svg" class="mb-12" />
          <UNavigationTree :links="links" />
          <UDivider type="dashed" class="my-6" />
          <UPageLinks :links="pageLinks" />
        </UAside>
      </template>
      <UHeader class="shadow-sm" :title="navigationStore.pageTitle" />
      <UContainer class="lg:py-4">
        <slot />
      </UContainer>
    </UPage>
  </UContainer>
</template>

<style scoped>
/* ... styles spécifiques à votre mise en page ... */
</style>
