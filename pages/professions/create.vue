<template>
  <UButton class="mt-2" color="primary" to="/professions">
    {{ $t('bo.buttons.back') }}
  </UButton>
  <UCard class="mt-4">
    <UForm
      :schema="schema"
      :state="formState"
      class="space-y-4 flex flex-col"
      @submit="onSubmit"
    >
      <UFormGroup
        :label="$t('bo.forms.fields.professions.name')"
        name="name"
        required
      >
        <UInput v-model="formState.name" autofocus />
      </UFormGroup>
      <UCheckbox
        v-model="formState.is_enabled"
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
const { t } = useI18n()
const { professionSchema } = useValidatorSelector()
const { schema, isValid } = useFormValidator(professionSchema)

const professionStore = useProfessionStore()

const navigationStore = useNavigationStore()
navigationStore.updatePageTitle(t('bo.pageTitles.professionsAdd'))

const formState = reactive({
  name: undefined,
  is_enabled: false,
})

const onSubmit = async () => {
  if (!isValid(formState)) return
  const newProfession = {
    name: formState.name,
    is_enabled: formState.is_enabled,
  }
  if (await professionStore.addProfession(newProfession)) {
    await navigateTo('/professions')
  }
}
</script>

<style scoped></style>
