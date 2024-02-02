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
import type { Profession } from '~/types/Profession'

const { t } = useI18n()
const { professionSchema } = useValidatorSelector()
const { schema, isValid } = useFormValidator(professionSchema)
const route = useRoute()

const professionStore = useProfessionStore()

const navigationStore = useNavigationStore()
navigationStore.updatePageTitle(t('bo.pageTitles.professionsEdit'))
navigationStore.setMainMenuActiveLink('professions')

const formState = reactive({
  name: '',
  is_enabled: false,
})
const professionId = route.params.id

const onSubmit = async () => {
  if (!isValid(formState)) return

  const updatedProfession: Profession = {
    id: parseInt(professionId as string),
    name: formState.name,
    is_enabled: formState.is_enabled,
  }
  if (await professionStore.updateProfession(updatedProfession)) {
    await navigateTo('/professions')
  }
}
onMounted(async () => {
  const profession = await professionStore.getProfessionById(professionId)

  // Mettez à jour le formulaire avec les données de la profession existante
  if (profession === undefined) return await navigateTo('/professions')
  formState.name = profession.name
  formState.is_enabled = profession.is_enabled === 1 ? true : false
})
</script>

<style scoped></style>
