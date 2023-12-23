<!-- layouts/default.vue (ou le fichier correspondant dans votre projet) -->

<template>
  <div forced-theme="light">
    <nuxt />
  </div>
</template>

<script>
export default {
  head() {
    return {
      meta: [
        { name: 'color-scheme', content: 'light' }, // Forcer le light mode
      ],
    }
  },
}
</script>

<style scoped>
/* ... styles spécifiques à votre mise en page ... */
</style>
