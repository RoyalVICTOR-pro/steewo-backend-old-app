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
        :file="formState.picto_file"
        @file-change="onPictoFileChange"
        @delete-file="deletePictoFile"
      />
      <FileUploadInput
        fieldName="image_file"
        :label="$t('bo.forms.fields.professions.image_file')"
        :file="formState.image_file"
        @file-change="onImageFileChange"
        @delete-file="deleteImageFile"
      />
      <UCheckbox
        v-model="formState.is_enabled"
        :label="$t('bo.forms.fields.professions.is_enabled')"
        name="is_enabled"
      />

      <UButton class="ml-auto" type="submit">
        {{ $t('bo.buttons.editProfession') }}
      </UButton>
    </UForm>
  </UCard>
</template>

<script setup lang="ts">
const { t } = useI18n()
const { $filesPath } = useNuxtApp()
const { professionSchema } = useValidatorSelector()
const { schema, isValid } = useFormValidator(professionSchema)
const route = useRoute()

const professionId = route.params.id

const professionStore = useProfessionStore()

const navigationStore = useNavigationStore()
navigationStore.setMainMenuActiveLink('professions')

const formState = reactive({
  name: '',
  is_enabled: false,
  picto_file: undefined as File | string | undefined,
  image_file: undefined as File | string | undefined,
})

const onPictoFileChange = (file: File) => {
  formState.picto_file = file
}
const onImageFileChange = (file: File) => {
  formState.image_file = file
}

const deletePictoFile = async () => {
  if (
    await professionStore.deleteProfessionPicto(
      parseInt(professionId as string)
    )
  ) {
    formState.picto_file = undefined
  }
}

const deleteImageFile = async () => {
  if (
    await professionStore.deleteProfessionImage(
      parseInt(professionId as string)
    )
  ) {
    formState.image_file = undefined
  }
}

const onSubmit = async () => {
  if (!isValid(formState)) return
  const updatedProfession = new FormData()
  updatedProfession.append('name', formState.name ?? '')
  updatedProfession.append('is_enabled', formState.is_enabled.toString())
  if (formState.picto_file instanceof File) {
    updatedProfession.append('picto_file', formState.picto_file)
  }
  if (formState.image_file instanceof File) {
    updatedProfession.append('image_file', formState.image_file)
  }
  if (await professionStore.updateProfession(updatedProfession, professionId)) {
    await navigateTo('/professions')
  }
}
onMounted(async () => {
  const profession = await professionStore.getProfessionById(professionId)

  // Mettez à jour le formulaire avec les données de la profession existante
  if (profession === undefined) return await navigateTo('/professions')
  formState.name = profession.name
  formState.is_enabled = profession.is_enabled === 1 ? true : false
  if (profession.picto_file)
    formState.picto_file = $filesPath(profession.picto_file)
  if (profession.image_file)
    formState.image_file = $filesPath(profession.image_file)
  navigationStore.updatePageTitle(
    t('bo.pageTitles.professionsEdit', { professionName: profession.name })
  )
})
</script>

<style scoped></style>
