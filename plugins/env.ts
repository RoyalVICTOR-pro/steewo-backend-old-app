export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  console.log('config.public.api :>> ', config.public.api)
  return {
    provide: {
      api: (path: string) => config.public?.api + path,
    },
  }
})
