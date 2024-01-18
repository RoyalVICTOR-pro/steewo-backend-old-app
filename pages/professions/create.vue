<template>
  <UButton class="mt-2" color="primary" to="/professions">
    {{ $t('bo.buttons.back') }}
  </UButton>
  <UCard class="mt-4">
    <UForm
      :schema="schema"
      :state="state"
      class="space-y-4 flex flex-col"
      @submit="onSubmit"
    >
      <UFormGroup
        :label="$t('bo.forms.fields.professions.name')"
        name="name"
        required
      >
        <UInput v-model="state.name" />
      </UFormGroup>
      <UCheckbox
        v-model="state.is_enabled"
        :label="$t('bo.forms.fields.professions.is_enabled')"
        name="is_enabled"
      />

      <UButton class="ml-auto" type="submit">
        {{ $t('bo.buttons.addProfession') }}
      </UButton>
    </UForm>
  </UCard>
</template>

<script setup lang="ts">
import type { FormSubmitEvent } from '#ui/types'
import { z } from 'zod'
const { t } = useI18n()
const professionStore = useProfessionStore()

const navigationStore = useNavigationStore()
navigationStore.updatePageTitle(t('bo.pageTitles.professionsAdd'))

const schema = z.object({
  name: z.string({ required_error: t('bo.forms.errors.required') }),
  is_enabled: z.boolean({ required_error: t('bo.forms.errors.required') }),
})

type Schema = z.output<typeof schema>

const state = reactive({
  name: undefined,
  is_enabled: false,
})

const onSubmit = async (event: FormSubmitEvent<Schema>) => {
  console.log('onSubmit appelé')
  if (state.name === undefined || state.is_enabled === undefined) return
  const newProfession = {
    name: state.name,
    is_enabled: state.is_enabled,
  }
  console.log('newProfession :>> ', newProfession)
  if (await professionStore.addProfession(newProfession)) {
    await navigateTo('/professions')
  } else {
    console.log('error')
  }
}
</script>

<style scoped></style>
