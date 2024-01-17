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
