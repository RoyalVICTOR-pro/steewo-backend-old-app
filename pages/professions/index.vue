<template>
  <div class="flex flex-col">
    <UButton class="ml-auto mt-12" color="primary" to="professions/create">
      {{ $t('bo.buttons.addProfession') }}
    </UButton>
    <UCard class="mt-4">
      <UTable :rows="professionStore.professions" :columns="columns">
        <template #is_enabled-data="{ row }">
          <UButton
            :to="`/test/${row.id}`"
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
          <UButton :to="`/test/${row.id}`" variant="outline" size="xs">
            {{ $t('bo.buttons.manageServices') }}
          </UButton>
        </template>
        <template #actions-data="{ row }">
          <UButton
            :to="`/test/${row.id}`"
            icon="i-heroicons-pencil-square"
            size="sm"
            color="gray"
            square
            variant="ghost"
          />
          <UButton
            :to="`/test/${row.id}`"
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
navigationStore.updatePageTitle(t('bo.pageTitles.professionsMain'))

const professionStore = useProfessionStore()
await professionStore.getProfessions()

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
