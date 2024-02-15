<template>
  <UButton
    @click="openModal"
    variant="outline"
    class="mt-12 border-steewo-orange-500 text-steewo-orange-500 w-52"
  >
    {{ $t('bo.buttons.manageValues') }}
  </UButton>
  <UModal v-model="isModalOpen" prevent-close>
    <UCard
      :ui="{
        ring: '',
        divide: 'divide-y divide-gray-100 dark:divide-gray-800',
      }"
    >
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-base font-regular leading-6 dark:text-white">
            {{ $t('bo.pageTitles.manageValues') }}
          </h3>
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-x-mark-20-solid"
            class="ml-auto pr-0"
            @click="isModalOpen = false"
          />
        </div>
      </template>

      <div class="p-4">
        <div v-if="newValues.length === 0" class="text-sm text-gray-500">
          <div
            class="border border-gray-200 px-2 py-2 mb-1 text-sm text-center"
          >
            {{ $t('bo.messages.noValues') }}
          </div>
        </div>
        <div v-else class="mb-4">
          <div
            v-for="item in newValues"
            :key="item.value"
            class="border border-gray-200 px-2 mb-1 text-sm flex items-center"
          >
            {{ item.label }} ({{ item.value }})
            <UButton
              @click="removeValue(item)"
              variant="ghost"
              class="ml-auto"
              icon="i-heroicons-trash"
            />
          </div>
        </div>
        <div class="flex flex-col p-2 bg-gray-100 mt-4">
          <UInput
            v-model="newLabel"
            class="mb-2 rounded-none"
            inputClass="text-xs rounded-none"
            :placeholder="
              t('bo.forms.fields.formFields.possibleValues.labelsPlaceholder')
            "
          />
          <UInput
            v-model="newValue"
            class="mb-2 rounded-none"
            inputClass="text-xs rounded-none"
            :placeholder="
              t('bo.forms.fields.formFields.possibleValues.valuesPlaceholder')
            "
          />
          <UButton
            @click="addNewValue"
            variant="solid"
            color="gray"
            class="w-30 mx-auto rounded-none text-xs"
            >{{ t('bo.forms.fields.formFields.possibleValues.addValueButton') }}
          </UButton>
        </div>
      </div>
      <template #footer>
        <div class="flex justify-end p-4">
          <UButton
            @click="validateNewValues"
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
const { t } = useI18n()
const isModalOpen = ref(false)
const openModal = () => {
  isModalOpen.value = true
}

const props = defineProps<{
  values: any[]
}>()

const emit = defineEmits<{
  (event: 'new-values', newValues: any[]): void
}>()

const newValue = ref('')
const newLabel = ref('')
const newValues = ref(props.values)

const addNewValue = () => {
  newValues.value.push({
    label: newLabel.value,
    value: newValue.value,
  })
  newLabel.value = ''
  newValue.value = ''
}

const removeValue = (item: any) => {
  newValues.value = newValues.value.filter((value) => value !== item)
}

const validateNewValues = () => {
  emit('new-values', newValues.value)
  isModalOpen.value = false
}
</script>

<style></style>
