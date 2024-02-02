export const useCustomToast = () => {
  const toast = useToast()

  const toastSuccess = (message: string) => {
    toast.add({
      title: message,
      icon: 'i-heroicons-check-circle',
      color: 'green',
      timeout: 2000,
    })
  }

  const toastError = (errorMessage: string) => {
    toast.add({
      title: errorMessage,
      icon: 'i-heroicons-exclamation-triangle',
      color: 'red',
    })
  }

  return { toastSuccess, toastError }
}
