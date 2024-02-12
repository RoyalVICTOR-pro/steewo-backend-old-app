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
        <UInput v-model="formState.short_name" autofocus />
      </UFormGroup>
      <FileUploadInput
        fieldName="picto_file"
        :label="$t('bo.forms.fields.services.picto_file')"
        v-model:file="formState.picto_file"
        @delete-file="deletePictoFile"
      />
      <FileUploadInput
        fieldName="image_file"
        :label="$t('bo.forms.fields.services.image_file')"
        v-model:file="formState.image_file"
        @delete-file="deleteImageFile"
      />
      <UCheckbox
        v-model="formState.is_enabled"
        :label="$t('bo.forms.fields.services.is_enabled')"
        name="is_enabled"
      />

      <UButton class="ml-auto" type="submit">
        {{ $t('bo.buttons.editService') }}
      </UButton>
    </UForm>
  </UCard>
</template>

<script setup lang="ts">
import type { Service } from '~/types/Service'

const { t } = useI18n()
const { $filesPath } = useNuxtApp()
const { serviceSchema } = useValidatorSelector()
const { schema, isValid } = useFormValidator(serviceSchema)
const route = useRoute()

const professionStore = useProfessionStore()
const serviceStore = useServiceStore()

const navigationStore = useNavigationStore()
navigationStore.setMainMenuActiveLink('professions')

const formState = reactive({
  name: '',
  short_name: '',
  is_enabled: false,
  picto_file: undefined as File | string | undefined,
  image_file: undefined as File | string | undefined,
})
const serviceId = route.params.id

const deletePictoFile = async () => {
  if (await serviceStore.deleteServicePicto(parseInt(serviceId as string))) {
    formState.picto_file = undefined
  }
}

const deleteImageFile = async () => {
  if (await serviceStore.deleteServiceImage(parseInt(serviceId as string))) {
    formState.image_file = undefined
  }
}

const onSubmit = async () => {
  if (!isValid(formState)) return

  const updatedService = new FormData()
  updatedService.append('id', serviceId as string)
  updatedService.append('name', formState.name ?? '')
  updatedService.append('short_name', formState.short_name ?? '')
  updatedService.append('is_enabled', formState.is_enabled.toString())
  if (formState.picto_file instanceof File) {
    updatedService.append('picto_file', formState.picto_file)
  }
  if (formState.image_file instanceof File) {
    updatedService.append('image_file', formState.image_file)
  }
  console.log('updatedService :>> ', updatedService)
  if (
    await serviceStore.updateService(
      updatedService,
      parseInt(route.params.id_profession as string),
      parseInt(serviceId as string)
    )
  ) {
    await navigateTo('/professions/' + route.params.id_profession + '/services')
  }
}

onMounted(async () => {
  const profession = await professionStore.getCurrentProfession(
    route.params.id_profession
  )
  const service = await serviceStore.getServiceById(
    serviceId,
    route.params.id_profession
  )

  if (service === undefined || profession === undefined || profession === null)
    return await navigateTo(
      '/professions/' + route.params.id_profession + '/services'
    )
  formState.name = service.name
  formState.short_name = service.short_name
  formState.is_enabled = service.is_enabled === 1 ? true : false
  if (service.picto_file) formState.picto_file = $filesPath(service.picto_file)
  if (service.image_file) formState.image_file = $filesPath(service.image_file)

  navigationStore.updatePageTitle(
    t('bo.pageTitles.servicesEdit', {
      professionName: profession.name,
      serviceName: service.short_name,
    })
  )
})
</script>

<style scoped></style>
