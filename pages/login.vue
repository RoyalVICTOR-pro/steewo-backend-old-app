<template>
  <UContainer class="flex items-center justify-center h-screen flex-col">
    <ImageLogo class="mb-12" />

    <UCard class="lg:w-1/2 w-full">
      <template #header>
        <h1>{{ $t('bo.title') }}</h1>
      </template>

      <UForm
        :schema="schema"
        :state="state"
        class="space-y-4 flex flex-col"
        @submit="onSubmit"
      >
        <UFormGroup :label="$t('bo.forms.fields.email')" name="email">
          <UInput v-model="state.email" />
        </UFormGroup>

        <UFormGroup :label="$t('bo.forms.fields.password')" name="password">
          <UInput v-model="state.password" type="password" />
        </UFormGroup>

        <UButton class="ml-auto" type="submit">
          {{ $t('bo.forms.fields.connectButton') }}
        </UButton>
      </UForm>
    </UCard>
  </UContainer>
</template>

<script setup lang="ts">
import type { FormSubmitEvent } from '#ui/types'
import { z } from 'zod'
const { t } = useI18n()
const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()

const schema = z.object({
  email: z
    .string({ required_error: t('bo.forms.errors.required') })
    .email(t('bo.forms.errors.invalidEmail')),
  password: z
    .string({ required_error: t('bo.forms.errors.required') })
    .min(8, t('bo.forms.errors.passwordLength')),
})

type Schema = z.output<typeof schema>

const state = reactive({
  email: undefined,
  password: undefined,
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  if (state.email === undefined || state.password === undefined) return
  if (await authStore.login(state.email, state.password)) {
    let redirect = route.query.redirect
    if (redirect) {
      await router.push('/' + redirect)
    } else {
      await router.push('/')
    }
  } else {
    console.log('erreur')
  }
}
</script>

<style scoped></style>
