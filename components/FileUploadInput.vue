<template>
  <UFormGroup :label="props.label" :name="props.fieldName">
    <div
      class="flex bg-slate-100 p-2 justify-between content-center align-middle self-center"
    >
      <UInput type="file" @change="onFileChange" inputClass="custom_input" />
      <div class="flex justify-items-center">
        <UPopover
          mode="hover"
          v-if="file && isAnImage(file)"
          class="flex justify-items-center"
        >
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
                :src="(file as string) + '?' + Math.floor(Math.random() * 1000)"
                alt="picto"
                class="w-48"
              />
            </div>
          </template>
        </UPopover>

        <UButton
          v-if="file && typeof file === 'string' && !isAnImage(file)"
          :to="file"
          icon="i-heroicons-document-magnifying-glass"
          class="text-gray-700 text-sm"
          color="white"
          variant="link"
          target="blank"
          >{{ $t('bo.buttons.seeFile') }}</UButton
        >

        <UPopover
          overlay
          v-if="file && typeof file === 'string'"
          :popper="{ placement: 'bottom-end' }"
          class="flex justify-items-center"
        >
          <UButton
            target="_blank"
            color="white"
            variant="link"
            icon="i-heroicons-trash"
            class="ml-2 text-gray-700 text-sm"
            >{{ $t('bo.buttons.delete') }}</UButton
          >
          <template #panel="{ close }">
            <div class="p-4">
              <div class="text-sm">
                Vous êtes sur le point de supprimer ce document.<br />Êtes-vous
                sûr ?
              </div>
              <div class="flex content-around justify-around mt-4">
                <UButton
                  variant="solid"
                  class="bg-red-700 hover:bg-red-600 text-white text-sm"
                  @click="emit('delete-file')"
                  >{{ $t('bo.buttons.confirm') }}</UButton
                >
                <UButton
                  color="white"
                  variant="solid"
                  class="text-gray-700 text-sm hover:bg-gray-200"
                  @click="close"
                  >{{ $t('bo.buttons.cancel') }}</UButton
                >
              </div>
            </div>
          </template>
        </UPopover>
      </div>
    </div>
  </UFormGroup>
</template>

<script lang="ts" setup>
const file = defineModel('file')

const props = defineProps<{
  label: string
  fieldName: string
}>()

const emit = defineEmits<{
  (e: 'delete-file'): void
}>()

const onFileChange = (event: Event) => {
  file.value = (event.target as HTMLInputElement).files?.[0]
}

const isAnImage = (path: any) => {
  if (!path) return false
  if (typeof path !== 'string') return false

  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp']
  const extension = path ? path.split('.').pop()?.toLowerCase() : ''

  return extension !== undefined && imageExtensions.includes(extension)
}
</script>

<style lang="scss">
.custom_input {
  @apply px-0 m-0 block 
    w-full 
    text-sm 
    text-slate-500 
    bg-slate-100
    file:m-0
    file:mr-4 
    file:py-2 
    file:px-4 
    file:rounded-sm 
    file:border-0 
    file:text-sm 
    file:font-normal 
    file:bg-gray-300
    file:text-gray-700 
    hover:file:bg-steewo-orange-400
    hover:file:text-white
    file:cursor-pointer
    cursor-pointer
    ring-0 
    shadow-none;
}
</style>
