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
      <UFormGroup
        :label="$t('bo.forms.fields.professions.picto_file')"
        name="picto_file"
      >
        <UInput
          type="file"
          @change="onPictoFileChange"
          inputClass="custom_input"
        />
        <div class="flex">
          <UPopover mode="hover" v-if="formState.picto_file">
            <UButton
              color="white"
              :label="$t('bo.buttons.seeFile')"
              icon="i-heroicons-document-magnifying-glass"
              class="text-gray-700 text-sm"
              variant="link"
            />

            <template #panel>
              <div class="p-4">
                <NuxtImg
                  :src="(formState.picto_file as string)"
                  alt="picto"
                  class="w-48"
                />
              </div>
            </template>
          </UPopover>
          <!-- <ULink
          v-if="formState.picto_file"
          :to="formState.picto_file"
          target="_blank"
          class="text-gray-700 text-sm underline"
          >{{ $t('bo.buttons.seeFile') }}</ULink
        > -->
          <UButton
            v-if="formState.picto_file"
            @click="showPictoDeleteConfirm = true"
            target="_blank"
            color="white"
            variant="link"
            icon="i-heroicons-trash"
            class="ml-2 text-gray-700 text-sm"
            >{{ $t('bo.buttons.delete') }}</UButton
          >
          <div v-if="showPictoDeleteConfirm">
            <div class="text-sm">
              Vous êtes sur le point de supprimer ce visuel. Êtes-vous sûr ?
            </div>
            <UButton
              color="white"
              variant="link"
              class="ml-2 text-red-600 text-sm"
              @click="deletePictoFile"
              >{{ $t('bo.buttons.confirm') }}</UButton
            >
            <UButton
              color="white"
              variant="link"
              class="ml-2 text-gray-700 text-sm"
              @click="showPictoDeleteConfirm = false"
              >{{ $t('bo.buttons.cancel') }}</UButton
            >
          </div>
        </div>
      </UFormGroup>
      <UFormGroup
        :label="$t('bo.forms.fields.professions.image_file')"
        name="image_file"
      >
        <UInput
          type="file"
          @change="onImageFileChange"
          inputClass="custom_input"
        />
      </UFormGroup>
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

const professionStore = useProfessionStore()

const navigationStore = useNavigationStore()
navigationStore.setMainMenuActiveLink('professions')

const formState = reactive({
  name: '',
  is_enabled: false,
  picto_file: undefined as File | string | undefined,
  image_file: undefined as File | string | undefined,
})

const showPictoDeleteConfirm = ref(false)
const showImageDeleteConfirm = ref(false)

const onPictoFileChange = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  formState.picto_file = file
  console.log('formState.picto_file :>> ', formState.picto_file)
}
const onImageFileChange = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  formState.image_file = file
}

const deletePictoFile = async () => {
  if (
    await professionStore.deleteProfessionPicto(
      parseInt(professionId as string)
    )
  ) {
    formState.picto_file = undefined
    showPictoDeleteConfirm.value = false
  }
}

const professionId = route.params.id

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
