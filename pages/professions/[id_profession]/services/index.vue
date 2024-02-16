<template>
  <UButton
    class="mt-2 border-2 bg-gray-400 text-white font-light"
    to="/professions"
    icon="i-heroicons-chevron-left"
  >
    {{ $t('bo.buttons.back') }}
  </UButton>
  <div class="flex flex-col">
    <UButton
      class="ml-auto mt-12 bg-steewo-orange-500"
      :to="`/professions/${route.params.id_profession}/services/create`"
    >
      {{ $t('bo.buttons.addService') }}
    </UButton>
    <UCard class="mt-4">
      <UInput v-model="filter" placeholder="Filtrer..." class="w-72 ml-auto" />
      <UDivider class="mt-3" />
      <UTable
        :rows="filteredRows"
        :columns="columns"
        :empty-state="{
          icon: 'i-heroicons-circle-stack-20-solid',
          label: t('bo.messages.noItems'),
        }"
        class="custom_table"
      >
        <template #is_enabled-data="{ row }">
          <UButton
            @click="
              serviceStore.toggleServiceStatus(
                row.id,
                parseInt(route.params.id_profession as string),
                row.is_enabled
              )
            "
            :color="row.is_enabled ? 'green' : 'red'"
            :icon="
              row.is_enabled
                ? 'i-heroicons-check-badge'
                : 'i-heroicons-x-circle'
            "
            variant="ghost"
            size="sm"
          />
        </template>
        <template #services-data="{ row }">
          <UButton
            :to="`/professions/${route.params.id_profession}/services/${row.id}/form-fields`"
            variant="outline"
            size="xs"
            class="border-steewo-orange-500 text-steewo-orange-500"
          >
            {{ $t('bo.buttons.manageFormFields') }}
          </UButton>
        </template>
        <template #actions-data="{ row }">
          <UButton
            :to="`/professions/${route.params.id_profession}/services/${row.id}`"
            icon="i-heroicons-pencil-square"
            size="sm"
            color="gray"
            square
            variant="ghost"
          />
          <UButton
            @click="
              serviceStore.deleteService(row.id, route.params.id_profession)
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
const { t } = useI18n()
const navigationStore = useNavigationStore()
navigationStore.setMainMenuActiveLink('professions')

const route = useRoute()
const serviceStore = useServiceStore()
await serviceStore.getServices(route.params.id_profession)

const professionStore = useProfessionStore()
const profession = await professionStore.getCurrentProfession(
  route.params.id_profession
)
if (profession !== undefined && profession !== null) {
  navigationStore.updatePageTitle(
    t('bo.pageTitles.servicesMain', {
      professionName: profession.name,
    })
  )
} else {
  await navigateTo('/professions')
}

const filter = ref('')

const filteredRows = computed(() => {
  if (!filter.value) {
    return serviceStore.services
  }

  return serviceStore.services.filter((service) => {
    return Object.values(service).some((value) => {
      return String(value).toLowerCase().includes(filter.value.toLowerCase())
    })
  })
})

const columns = [
  {
    key: 'name',
    label:
      t('bo.tableHeaders.services.name') + ` (${serviceStore.servicesCount})`,
    sortable: true,
    class: 'w-full',
  },
  {
    key: 'is_enabled',
    label: t('bo.tableHeaders.services.isActive'),
    class: 'w-auto',
  },
  {
    key: 'services',
    class: 'w-auto',
  },
  {
    key: 'actions',
    class: 'w-auto',
  },
]
</script>

<style scoped lang="scss"></style>
