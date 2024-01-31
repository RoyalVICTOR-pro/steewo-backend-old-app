<template>
  <h1>Tableau de bord</h1>
</template>

<script lang="ts" setup>
const navigationStore = useNavigationStore()
navigationStore.updatePageTitle('Tableau de bord')
navigationStore.setMainMenuActiveLink('dashboard')
</script>

<style scoped lang="scss"></style>
