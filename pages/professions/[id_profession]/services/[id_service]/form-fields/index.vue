<template>
  <UButton
    class="mt-2 border-2 bg-gray-400 text-white font-light"
    :to="`/professions/${route.params.id_profession}/services`"
    icon="i-heroicons-chevron-left"
  >
    {{ $t('bo.buttons.back') }}
  </UButton>
  <div class="flex flex-col">
    <UButton
      class="ml-auto mt-12 bg-steewo-orange-500"
      :to="`/professions/${route.params.id_profession}/services/${route.params.id_service}/form-fields/create`"
    >
      {{ $t('bo.buttons.addFormField') }}
    </UButton>
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
  </div>
</template>

<script lang="ts" setup>
import FormFieldsTypesForSelect from '~/enums/FormFieldsTypes'

const { t } = useI18n()
const navigationStore = useNavigationStore()
navigationStore.updatePageTitle(t('bo.pageTitles.formFieldsMain'))
navigationStore.setMainMenuActiveLink('professions')

const route = useRoute()
const formFieldStore = useFormFieldStore()
await formFieldStore.getFormFields(route.params.id_service)

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
