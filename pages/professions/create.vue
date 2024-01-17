<template>
  <UButton class="mt-2" color="primary" to="/professions">
    {{ $t('bo.buttons.back') }}
  </UButton>
  <UContainer>
    <UCard class="mt-4">
      <UForm
        :schema="schema"
        :state="state"
        class="space-y-4 flex flex-col"
        @submit="onSubmit"
      >
        <UFormGroup :label="$t('bo.forms.fields.professions.name')" name="name">
          <UInput v-model="state.name" />
        </UFormGroup>
        <UFormGroup
          :label="$t('bo.forms.fields.professions.is_enabled')"
          name="is_enabled"
        >
          <UInput v-model="state.is_enabled" />
        </UFormGroup>
        <UButton class="ml-auto" type="submit">
          {{ $t('bo.forms.fields.createButton') }}
        </UButton>
      </UForm>
    </UCard>
  </UContainer>
</template>

<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'
const { t } = useI18n()
const navigationStore = useNavigationStore()
navigationStore.updatePageTitle('Ajouter un métier')

const professionStore = useProfessionStore()

const schema = z.object({
  name: z.string({ required_error: t('bo.forms.errors.required') }),
  is_enabled: z.string({ required_error: t('bo.forms.errors.required') }),
})

type Schema = z.output<typeof schema>

const state = reactive({
  name: undefined,
  is_enabled: undefined,
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  if (state.name === undefined || state.is_enabled === undefined) return
  if (
    await professionStore.addProfession({
      name: state.name,
      is_enabled: state.is_enabled,
    })
  ) {
    await navigateTo('/professions')
  } else {
    console.log('error')
  }
}
</script>

<style scoped></style>
