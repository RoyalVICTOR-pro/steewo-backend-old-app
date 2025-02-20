<template>
  <UButton
    class="mt-2 border-2 bg-gray-400 text-white font-light"
    to="/professions"
    icon="i-heroicons-chevron-left"
  >
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
      <FileUploadInput
        fieldName="picto_file"
        :label="$t('bo.forms.fields.professions.picto_file')"
        v-model:file="formState.picto_file"
      />
      <FileUploadInput
        fieldName="image_file"
        :label="$t('bo.forms.fields.professions.image_file')"
        v-model:file="formState.image_file"
      />
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
navigationStore.setMainMenuActiveLink('professions')

const formState = reactive({
  name: undefined,
  is_enabled: false,
  picto_file: undefined as File | string | undefined,
  image_file: undefined as File | string | undefined,
})

const onSubmit = async () => {
  if (!isValid(formState)) return

  const newProfession = new FormData()
  newProfession.append('name', formState.name ?? '')
  newProfession.append('is_enabled', formState.is_enabled.toString())
  if (formState.picto_file) {
    newProfession.append('picto_file', formState.picto_file)
  }
  if (formState.image_file) {
    newProfession.append('image_file', formState.image_file)
  }

  if (await professionStore.addProfession(newProfession)) {
    await navigateTo('/professions')
  }
}
</script>

<style scoped></style>
