<template>
  <UButton
    class="mt-2 border-2 bg-gray-400 text-white font-light"
    :to="`/professions/${route.params.id_profession}/services`"
    icon="i-heroicons-chevron-left"
  >
    {{ $t('bo.buttons.back') }}
  </UButton>
  <div class="flex flex-col">
    <div class="flex justify-between">
      <UButton
        @click="isReorderModalOpen = true"
        variant="outline"
        class="mt-12 border-steewo-orange-500 text-steewo-orange-500"
      >
        {{ $t('bo.buttons.reorder') }}
      </UButton>
      <UButton
        class="mt-12 bg-steewo-orange-500"
        :to="`/professions/${route.params.id_profession}/services/${route.params.id_service}/form-fields/create`"
      >
        {{ $t('bo.buttons.addFormField') }}
      </UButton>
    </div>
    <UCard class="mt-4">
      <UTable :rows="formFieldStore.formFields" :columns="columns">
        <template #type-data="{ row }">
          {{ getTypeLabelByValue(row.type) }}
        </template>
        <template #actions-data="{ row }">
          <UButton
            :to="`/professions/${route.params.id_profession}/services/${route.params.id_service}/form-fields/${row.id}`"
            icon="i-heroicons-pencil-square"
            size="sm"
            color="gray"
            square
            variant="ghost"
          />
          <UButton
            @click="
              formFieldStore.deleteFormField(row.id, route.params.id_service)
            "
            icon="i-heroicons-trash"
            size="sm"
            color="gray"
            square
            variant="ghost"
          />
        </template>
      </UTable>
    </UCard>
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
  </div>
</template>

<script lang="ts" setup>
import FormFieldsTypesForSelect from '~/enums/FormFieldsTypes'
import { Container, Draggable } from 'vue3-smooth-dnd'

const { t } = useI18n()
const navigationStore = useNavigationStore()
navigationStore.updatePageTitle(t('bo.pageTitles.formFieldsMain'))
navigationStore.setMainMenuActiveLink('professions')

const route = useRoute()
const formFieldStore = useFormFieldStore()
await formFieldStore.getFormFields(route.params.id_service)
let formFieldsList = ref(formFieldStore.formFields)
console.log('formFieldsList : ')
console.table(formFieldsList.value)

const serviceStore = useServiceStore()
const service = await serviceStore.getCurrentService(
  route.params.id_service,
  route.params.id_profession
)
if (service !== undefined && service !== null) {
  navigationStore.updatePageTitle(
    t('bo.pageTitles.formFieldsMain', {
      serviceName: service.name,
    })
  )
} else {
  await navigateTo('/professions/' + route.params.id_profession + '/services')
}

const getTypeLabelByValue = (value: string) => {
  const type = FormFieldsTypesForSelect.find((type) => type.value === value)
  return type ? type.label : ''
}

const isReorderModalOpen = ref(false)
const onDrop = (dropResult: any) => {
  formFieldsList.value = applyDrag(formFieldsList.value, dropResult)
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

const validateNewOrder = () => {
  const newOrders = formFieldsList.value.map((formField, index) => {
    return {
      id: formField.id,
      order: index,
    }
  })
  formFieldStore.updateFormFieldsOrder(newOrders, route.params.id_service)
  formFieldsList.value = formFieldStore.formFields
  isReorderModalOpen.value = false
}

const columns = [
  {
    key: 'label',
    label:
      t('bo.tableHeaders.formFields.label') +
      ` (${formFieldStore.formFieldsCount})`,
    sortable: true,
    class: 'w-full',
  },
  {
    key: 'type',
    label: t('bo.tableHeaders.formFields.type'),
    class: 'w-auto',
  },
  {
    key: 'actions',
    class: 'w-auto',
  },
]
</script>

<style scoped lang="scss"></style>
