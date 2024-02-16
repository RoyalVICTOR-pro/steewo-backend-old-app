<template>
  <div class="flex flex-col">
    <UButton class="ml-auto mt-12 bg-steewo-orange-500" to="professions/create">
      {{ $t('bo.buttons.addProfession') }}
    </UButton>
    <UCard class="mt-4">
      <UInput
        v-model="filter"
        :placeholder="t('bo.placeholders.filter')"
        class="w-72 ml-auto"
      />
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
              professionStore.toggleProfessionStatus(row.id, row.is_enabled)
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
            :to="`/professions/${row.id}/services`"
            variant="outline"
            size="xs"
            class="border-steewo-orange-500 text-steewo-orange-500"
          >
            {{ $t('bo.buttons.manageServices') }}
          </UButton>
        </template>
        <template #actions-data="{ row }">
          <UButton
            :to="`/professions/${row.id}`"
            icon="i-heroicons-pencil-square"
            size="sm"
            color="gray"
            square
            variant="ghost"
          />
          <UButton
            @click="professionStore.deleteProfession(row.id)"
            icon="i-heroicons-trash"
            size="sm"
            color="gray"
            square
            variant="ghost"
          />
        </template>
      </UTable>
      <div
        v-if="professionStore.professions.length > maxRowsPerPage"
        class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700"
      >
        <UPagination
          v-model="currentPage"
          :page-count="maxRowsPerPage"
          :total="professionStore.professions.length"
        />
      </div>
    </UCard>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n()
const navigationStore = useNavigationStore()
navigationStore.updatePageTitle(t('bo.pageTitles.professionsMain'))
navigationStore.setMainMenuActiveLink('professions')

const professionStore = useProfessionStore()
await professionStore.getProfessions()

const currentPage = ref(1)
const maxRowsPerPage = 5

const filter = ref('')

const filteredRows = computed(() => {
  if (!filter.value) {
    return professionStore.professions.slice(
      (currentPage.value - 1) * maxRowsPerPage,
      currentPage.value * maxRowsPerPage
    )
  }

  const filteredProfessions = professionStore.professions.filter(
    (profession) => {
      return Object.values(profession).some((value) => {
        return String(value).toLowerCase().includes(filter.value.toLowerCase())
      })
    }
  )

  return filteredProfessions.slice(
    (currentPage.value - 1) * maxRowsPerPage,
    currentPage.value * maxRowsPerPage
  )
})

const columns = [
  {
    key: 'name',
    label:
      t('bo.tableHeaders.professions.name') +
      ` (${professionStore.professionsCount})`,
    sortable: true,
    class: 'w-full',
  },
  {
    key: 'is_enabled',
    label: t('bo.tableHeaders.professions.isActive'),
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
