<template>
  <!-- <div class="h-screen">
    <NuxtLayout class="h-full lg:gap-0 lg:px-0">
      <div>
        <div class="text-4xl">You've Arrived Here on Error, boss</div>
        <UButton to="/" class="button">Go Back</UButton>
      </div>
    </NuxtLayout>
    <UNotifications />
  </div> -->
</template>

<script setup>
const { toastError } = useCustomToast()
const { t } = useI18n()
toastError(t('bo.errors.notFound'))
navigateTo('/')
</script>

<style scoped>
.button {
  padding: 4px 6px;
  margin: 10px 0px;
  background: black;
  color: white;
}
</style>
