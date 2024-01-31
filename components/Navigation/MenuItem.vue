<template>
  <a
    v-if="props.id"
    :class="props.active ? 'button is_active' : 'button'"
    @click="navigationStore.goToMainMenu(props.id)"
  >
    <UIcon v-if="props.icon" :name="props.icon" class="button_icon" />
    <div class="button_label">{{ props.label }}</div>
  </a>
</template>

<script lang="ts" setup>
const navigationStore = useNavigationStore()

const props = defineProps({
  id: String,
  label: String,
  icon: String,
  active: Boolean,
})
</script>

<style scoped lang="scss">
.button {
  @apply flex 
  items-center 
  mb-3
  px-4 
  py-3 
  rounded-sm
  text-sm 
  font-normal 
  text-gray-700 
  dark:text-gray-400 
  hover:bg-gray-100 
  dark:hover:bg-gray-800 
  focus:outline-none 
  focus:bg-gray-100
  dark:focus:bg-gray-800 
  transition 
  duration-150 
  ease-in-out 
  cursor-pointer;
}
.button_icon {
  @apply mr-3 h-5 w-5 bg-steewo-violet-800;
}

.button.is_active {
  @apply text-white bg-gradient-to-r from-steewo-violet-800 to-steewo-orange-500;
}
.button.is_active .button_icon {
  @apply bg-white;
}
</style>
