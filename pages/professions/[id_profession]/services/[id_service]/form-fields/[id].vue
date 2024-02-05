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
        <UInput v-model="formState.type" />
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
        {{ $t('bo.buttons.editFormField') }}
      </UButton>
    </UForm>
  </UCard>
</template>

<script setup lang="ts">
import type { FormField } from '~/types/FormField'
const { t } = useI18n()
const { formFieldSchema } = useValidatorSelector()
const { schema, isValid } = useFormValidator(formFieldSchema)
const route = useRoute()

const formFieldStore = useFormFieldStore()

const navigationStore = useNavigationStore()
navigationStore.updatePageTitle(t('bo.pageTitles.formFieldsEdit'))
navigationStore.setMainMenuActiveLink('professions')

const formState = reactive({
  label: '',
  type: '',
  mandatory: false,
  tooltip_text: '',
  description: '',
  placeholder: '',
})
const formFieldId = route.params.id

const onSubmit = async () => {
  if (!isValid(formState)) return
  const updatedFormField = {
    id: parseInt(route.params.id as string),
    service_id: parseInt(route.params.id_service as string),
    type: formState.type,
    label: formState.label,
    mandatory: formState.mandatory,
    tooltip_text: formState.tooltip_text,
    description: formState.description,
    placeholder: formState.placeholder,
  }
  if (await formFieldStore.updateFormField(updatedFormField)) {
    await navigateTo(
      '/professions/' +
        route.params.id_profession +
        '/services/' +
        route.params.id_service +
        '/form-fields'
    )
  }
}

onMounted(async () => {
  const formField = await formFieldStore.getFormFieldById(
    formFieldId,
    route.params.id_service
  )

  if (formField === undefined)
    return await navigateTo(
      '/professions/' + route.params.id_profession + '/services'
    )
  formState.label = formField.label
  formState.type = formField.type
  formState.tooltip_text = formField.tooltip_text || ''
  formState.description = formField.description || ''
  formState.placeholder = formField.placeholder || ''
  formState.mandatory = formField.mandatory === 1 ? true : false
})
</script>

<style scoped></style>
