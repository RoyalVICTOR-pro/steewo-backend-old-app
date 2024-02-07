<template>
  <UButton
    class="mt-2 border-2 bg-gray-400 text-white font-light"
    :to="`/professions/${route.params.id_profession}/services/${route.params.id_service}/form-fields`"
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
        :label="$t('bo.forms.fields.formFields.label')"
        name="label"
        required
      >
        <UInput v-model="formState.label" autofocus />
      </UFormGroup>
      <UFormGroup
        :label="$t('bo.forms.fields.formFields.type')"
        name="type"
        required
      >
        <USelect v-model="formState.type" :options="FormFieldsTypesForSelect" />
      </UFormGroup>
      <UCheckbox
        v-model="formState.mandatory"
        :label="$t('bo.forms.fields.formFields.mandatory')"
        name="mandatory"
      />
      <UFormGroup
        :label="$t('bo.forms.fields.formFields.tooltip_text')"
        name="tooltip_text"
      >
        <UInput v-model="formState.tooltip_text" />
      </UFormGroup>
      <UFormGroup
        :label="$t('bo.forms.fields.formFields.description')"
        name="description"
      >
        <UInput v-model="formState.description" />
      </UFormGroup>
      <UFormGroup
        :label="$t('bo.forms.fields.formFields.placeholder')"
        name="placeholder"
      >
        <UInput v-model="formState.placeholder" />
      </UFormGroup>

      <UButton class="ml-auto" type="submit">
        {{ $t('bo.buttons.addFormField') }}
      </UButton>
    </UForm>
  </UCard>
</template>

<script setup lang="ts">
import FormFieldsTypesForSelect from '~/enums/FormFieldsTypes'

const { t } = useI18n()
const { formFieldSchema } = useValidatorSelector()
const { schema, isValid } = useFormValidator(formFieldSchema)
const route = useRoute()

const serviceStore = useServiceStore()
const formFieldStore = useFormFieldStore()

const navigationStore = useNavigationStore()
navigationStore.setMainMenuActiveLink('professions')

const service = await serviceStore.getCurrentService(
  route.params.id_service,
  route.params.id_profession
)
if (service !== undefined && service !== null) {
  navigationStore.updatePageTitle(
    t('bo.pageTitles.formFieldsAdd', {
      serviceName: service.name,
    })
  )
} else {
  await navigateTo('/professions/' + route.params.id_profession + '/services')
}

const formState = reactive({
  label: undefined,
  type: undefined,
  mandatory: false,
  tooltip_text: undefined,
  description: undefined,
  placeholder: undefined,
})

const onSubmit = async () => {
  if (!isValid(formState)) return
  const newFormField = {
    type: formState.type,
    label: formState.label,
    mandatory: formState.mandatory,
    tooltip_text: formState.tooltip_text,
    description: formState.description,
    placeholder: formState.placeholder,
  }
  if (
    await formFieldStore.addFormField(newFormField, route.params.id_service)
  ) {
    await navigateTo(
      '/professions/' +
        route.params.id_profession +
        '/services/' +
        route.params.id_service +
        '/form-fields'
    )
  }
}
</script>

<style scoped></style>
