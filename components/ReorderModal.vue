<template>
  <UButton
    @click="openModal"
    variant="outline"
    class="mt-12 border-steewo-orange-500 text-steewo-orange-500"
  >
    {{ $t('bo.buttons.reorder') }}
  </UButton>
  <UModal v-model="isReorderModalOpen" prevent-close>
    <UCard
      :ui="{
        ring: '',
        divide: 'divide-y divide-gray-100 dark:divide-gray-800',
      }"
    >
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-base font-regular leading-6 dark:text-white">
            {{ $t('bo.pageTitles.formFieldsReorder') }}
          </h3>
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-x-mark-20-solid"
            class="ml-auto pr-0"
            @click="isReorderModalOpen = false"
          />
        </div>
      </template>

      <div class="p-4">
        <Container @drop="onDrop">
          <Draggable v-for="item in formFieldsList" :key="item.id">
            <div
              class="draggable-item border border-gray-200 p-2 mb-2 text-sm flex items-center cursor-pointer"
            >
              <i class="i-heroicons-bars-3 pt-1 mr-2 text-gray-400" />
              {{ item.label }}
            </div>
          </Draggable>
        </Container>
      </div>
      <template #footer>
        <div class="flex justify-end p-4">
          <UButton
            @click="validateNewOrder"
            variant="solid"
            style="bg-steewo-orange-500"
          >
            {{ $t('bo.buttons.save') }}
          </UButton>
        </div>
      </template>
    </UCard>
  </UModal>
</template>

<script lang="ts" setup>
import { Container, Draggable } from 'vue3-smooth-dnd'

const props = defineProps<{
  formFieldsList: any[]
}>()

const emit = defineEmits<{
  (event: 'new-order', newOrders: any[]): void
}>()

const formFieldsList = ref(props.formFieldsList)
const isReorderModalOpen = ref(false)

const openModal = () => {
  if (props.formFieldsList !== undefined && props.formFieldsList.length !== 0) {
    isReorderModalOpen.value = true
  }
}

const onDrop = (dropResult: any) => {
  formFieldsList.value = applyDrag(formFieldsList.value, dropResult)
}

const validateNewOrder = () => {
  const newOrders = formFieldsList.value.map((formField, index) => {
    return {
      id: formField.id,
      order: index,
    }
  })
  emit('new-order', newOrders)
  isReorderModalOpen.value = false
}

const applyDrag = (arr: any, dragResult: any) => {
  const { removedIndex, addedIndex, payload } = dragResult

  if (removedIndex === null && addedIndex === null) return arr
  const result = [...arr]
  let itemToAdd = payload

  if (removedIndex !== null) {
    itemToAdd = result.splice(removedIndex, 1)[0]
  }
  if (addedIndex !== null) {
    result.splice(addedIndex, 0, itemToAdd)
  }
  return result
}
</script>

<style></style>
