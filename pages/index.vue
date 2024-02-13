<template>
  <div class="flex flex-col">
    <h1 class="mt-4">Ici viendra le tableau de bord.</h1>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n()
const navigationStore = useNavigationStore()
navigationStore.updatePageTitle(t('bo.pageTitles.dashboard'))
navigationStore.setMainMenuActiveLink('dashboard')
</script>

<style scoped lang="scss"></style>
