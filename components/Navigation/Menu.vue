<template>
  <ul>
    <li v-for="item in navigationStore.mainMenuLinks" :key="item.id">
      <NavigationMenuItem
        :id="item.id"
        :label="item.label"
        :icon="item.icon"
        :active="item.active"
      />
    </li>
  </ul>
</template>

<script lang="ts" setup>
const navigationStore = useNavigationStore()
</script>

<style scoped lang="scss"></style>
