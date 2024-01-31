<template>
  <h1>Tableau de bord</h1>
</template>

<script lang="ts" setup>
const navigationStore = useNavigationStore()
navigationStore.updatePageTitle('Tableau de bord')
</script>

<style scoped lang="scss"></style>
