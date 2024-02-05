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
const { serviceSchema } = useValidatorSelector()
const { schema, isValid } = useFormValidator(serviceSchema)
const route = useRoute()
const professionName = ref('Test')
const serviceName = ref('Toto')

const serviceStore = useServiceStore()

const navigationStore = useNavigationStore()
navigationStore.updatePageTitle(t('bo.pageTitles.servicesEdit'))
navigationStore.setMainMenuActiveLink('professions')

const formState = reactive({
  name: '',
  short_name: '',
  is_enabled: false,
})
const serviceId = route.params.id

const onSubmit = async () => {
  if (!isValid(formState)) return

  const updatedService: Service = {
    id: parseInt(serviceId as string),
    profession_id: parseInt(route.params.id_profession as string),
    name: formState.name,
    short_name: formState.short_name,
    is_enabled: formState.is_enabled,
  }
  if (await serviceStore.updateService(updatedService)) {
    await navigateTo('/professions/' + route.params.id_profession + '/services')
  }
}
onMounted(async () => {
  const service = await serviceStore.getServiceById(
    serviceId,
    route.params.id_profession
  )

  // Mettez à jour le formulaire avec les données de la service existante
  if (service === undefined)
    return await navigateTo(
      '/professions/' + route.params.id_profession + '/services'
    )
  formState.name = service.name
  formState.short_name = service.short_name
  formState.is_enabled = service.is_enabled === 1 ? true : false
})
</script>

<style scoped></style>
