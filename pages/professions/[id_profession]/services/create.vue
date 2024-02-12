<template>
  <UButton
    class="mt-2 border-2 bg-gray-400 text-white font-light"
    :to="`/professions/${route.params.id_profession}/services`"
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
        :label="$t('bo.forms.fields.services.name')"
        name="name"
        required
      >
        <UInput v-model="formState.name" autofocus />
      </UFormGroup>
      <UFormGroup
        :label="$t('bo.forms.fields.services.short_name')"
        name="short_name"
        required
      >
        <UInput v-model="formState.short_name" />
      </UFormGroup>
      <FileUploadInput
        fieldName="picto_file"
        :label="$t('bo.forms.fields.services.picto_file')"
        v-model:file="formState.picto_file"
      />
      <FileUploadInput
        fieldName="image_file"
        :label="$t('bo.forms.fields.services.image_file')"
        v-model:file="formState.image_file"
      />
      <UCheckbox
        v-model="formState.is_enabled"
        :label="$t('bo.forms.fields.services.is_enabled')"
        name="is_enabled"
      />

      <UButton class="ml-auto" type="submit">
        {{ $t('bo.buttons.addService') }}
      </UButton>
    </UForm>
  </UCard>
</template>

<script setup lang="ts">
const { t } = useI18n()
const { serviceSchema } = useValidatorSelector()
const { schema, isValid } = useFormValidator(serviceSchema)
const route = useRoute()

const professionStore = useProfessionStore()
const serviceStore = useServiceStore()

const navigationStore = useNavigationStore()
navigationStore.setMainMenuActiveLink('professions')

const profession = await professionStore.getCurrentProfession(
  route.params.id_profession
)
if (profession !== undefined && profession !== null) {
  navigationStore.updatePageTitle(
    t('bo.pageTitles.servicesAdd', {
      professionName: profession.name,
    })
  )
} else {
  await navigateTo('/professions')
}

const formState = reactive({
  name: undefined,
  short_name: undefined,
  is_enabled: false,
  picto_file: undefined as File | string | undefined,
  image_file: undefined as File | string | undefined,
})

const onSubmit = async () => {
  if (!isValid(formState)) return

  const newService = new FormData()
  newService.append('name', formState.name ?? '')
  newService.append('short_name', formState.short_name ?? '')
  newService.append('is_enabled', formState.is_enabled.toString())
  if (formState.picto_file) {
    newService.append('picto_file', formState.picto_file)
  }
  if (formState.image_file) {
    newService.append('image_file', formState.image_file)
  }

  if (await serviceStore.addService(newService, route.params.id_profession)) {
    await navigateTo('/professions/' + route.params.id_profession + '/services')
  }
}
</script>

<style scoped></style>
