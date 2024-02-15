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
      <ManageValuesForFieldsModal
        v-if="formState.type === FormFieldsTypes.SELECT"
        :values="formState.possible_values.items"
        @new-values="updatePossibleValues"
      />
      <ManageValuesForFieldsModal
        v-if="formState.type === FormFieldsTypes.RADIO"
        :values="formState.possible_values.items"
        @new-values="updatePossibleValues"
      />
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
      <FileUploadInput
        fieldName="tooltip_image_file"
        :label="$t('bo.forms.fields.formFields.tooltip_image_file')"
        v-model:file="formState.tooltip_image_file"
        @delete-file="deleteToolTipImageFile"
      />
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
import {
  FormFieldsTypesForSelect,
  FormFieldsTypes,
} from '~/enums/FormFieldsTypes'

const { t } = useI18n()
const { $filesPath } = useNuxtApp()
const { formFieldSchema } = useValidatorSelector()
const { schema, isValid } = useFormValidator(formFieldSchema)
const route = useRoute()

const serviceStore = useServiceStore()
const formFieldStore = useFormFieldStore()

const navigationStore = useNavigationStore()
navigationStore.setMainMenuActiveLink('professions')

const formState = reactive({
  label: '',
  type: '',
  mandatory: false,
  tooltip_text: '',
  tooltip_image_file: undefined as File | string | undefined,
  description: '',
  placeholder: '',
  possible_values: {
    items: [] as any[],
  },
})
const formFieldId = route.params.id

const deleteToolTipImageFile = async () => {
  if (
    await formFieldStore.deleteFormFieldToolTipImage(
      parseInt(formFieldId as string)
    )
  ) {
    formState.tooltip_image_file = undefined
  }
}

const updatePossibleValues = (newValues: any[]) => {
  formState.possible_values.items = newValues
}

const onSubmit = async () => {
  if (!isValid(formState)) return

  const updatedFormField = new FormData()
  updatedFormField.append('id', formFieldId as string)
  updatedFormField.append('service_id', route.params.id_service as string)
  updatedFormField.append('type', formState.type)
  updatedFormField.append('label', formState.label)
  updatedFormField.append('mandatory', formState.mandatory ? '1' : '0')
  updatedFormField.append('tooltip_text', formState.tooltip_text)
  if (formState.tooltip_image_file instanceof File) {
    updatedFormField.append('tooltip_image_file', formState.tooltip_image_file)
  }
  updatedFormField.append('description', formState.description)
  updatedFormField.append('placeholder', formState.placeholder)
  updatedFormField.append(
    'possible_values',
    JSON.stringify(formState.possible_values)
  )

  if (
    await formFieldStore.updateFormField(
      updatedFormField,
      parseInt(route.params.id_service as string),
      parseInt(formFieldId as string)
    )
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

onMounted(async () => {
  const service = await serviceStore.getCurrentService(
    route.params.id_service,
    route.params.id_profession
  )
  const formField = await formFieldStore.getFormFieldById(
    formFieldId,
    route.params.id_service
  )

  if (formField === undefined || service === undefined || service === null)
    return await navigateTo(
      '/professions/' + route.params.id_profession + '/services'
    )
  formState.label = formField.label
  formState.type = formField.type
  formState.tooltip_text = formField.tooltip_text || ''
  formState.description = formField.description || ''
  formState.placeholder = formField.placeholder || ''
  formState.mandatory = formField.mandatory === 1 ? true : false
  if (formField.tooltip_image_file)
    formState.tooltip_image_file = $filesPath(formField.tooltip_image_file)
  if (formField.possible_values)
    formState.possible_values = JSON.parse(formField.possible_values)

  navigationStore.updatePageTitle(
    t('bo.pageTitles.formFieldsEdit', {
      serviceName: service.short_name,
      fieldName: formField.label,
    })
  )
})
</script>

<style scoped></style>
