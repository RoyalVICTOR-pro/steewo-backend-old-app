export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  return {
    provide: {
      api: (path: string) => config.public?.api + path,
      filesPath: (path: string) => config.public?.files + path,
    },
  }
})
