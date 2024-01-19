import { z } from 'zod'

export const useValidatorSelector = () => {
  const { t } = useI18n()
  const professionSchema = z.object({
    name: z.string({ required_error: t('bo.forms.errors.required') }),
    is_enabled: z.boolean({ required_error: t('bo.forms.errors.required') }),
  })

  return {
    professionSchema,
  }
}
