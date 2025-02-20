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
        {{ $t('bo.buttons.addFormField') }}
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
  tooltip_image_file: undefined as File | string | undefined,
  description: undefined,
  placeholder: undefined,
  possible_values: {
    items: [] as any[],
  },
})

const updatePossibleValues = (newValues: any[]) => {
  formState.possible_values.items = newValues
}

const onSubmit = async () => {
  if (!isValid(formState)) return

  const newFormField = new FormData()
  newFormField.append('label', formState.label ?? '')
  newFormField.append('type', formState.type ?? '')
  newFormField.append('mandatory', formState.mandatory.toString())
  newFormField.append('tooltip_text', formState.tooltip_text ?? '')
  if (formState.tooltip_image_file) {
    newFormField.append('tooltip_image_file', formState.tooltip_image_file)
  }
  newFormField.append('description', formState.description ?? '')
  newFormField.append('placeholder', formState.placeholder ?? '')
  newFormField.append(
    'possible_values',
    JSON.stringify(formState.possible_values)
  )

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
