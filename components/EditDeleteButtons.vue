<template>
  <div class="flex flex-row">
    <UButton
      :to="props.updateRoute"
      icon="i-heroicons-pencil-square"
      size="sm"
      color="gray"
      square
      variant="ghost"
    />

    <UPopover
      v-if="elementExists"
      overlay
      :popper="{ placement: 'bottom-end' }"
      class="flex justify-items-center"
    >
      <UButton
        icon="i-heroicons-trash"
        size="sm"
        color="gray"
        square
        variant="ghost"
      />
      <template #panel="{ close }">
        <div class="p-4">
          <div class="text-sm" v-html="props.confirmMessage"></div>
          <div class="flex content-around justify-around mt-4">
            <UButton
              variant="solid"
              class="bg-red-700 hover:bg-red-600 text-white text-sm"
              @click="onDeleteConfirmed()"
              >{{ t('bo.buttons.confirm') }}</UButton
            >
            <UButton
              color="white"
              variant="solid"
              class="text-gray-700 text-sm hover:bg-gray-200"
              @click="close"
              >{{ t('bo.buttons.cancel') }}</UButton
            >
          </div>
        </div>
      </template>
    </UPopover>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n()
const props = defineProps<{
  updateRoute: string
  confirmMessage: string
}>()

const emit = defineEmits<{
  (e: 'delete-item'): void
}>()

const elementExists = ref(true)

const onDeleteConfirmed = () => {
  emit('delete-item')
  elementExists.value = false
}
</script>

<style></style>
