import { z } from 'zod'

export const useValidatorSelector = () => {
  const { t } = useI18n()
  const professionSchema = {
    name: z.string({ required_error: t('bo.forms.errors.required') }),
    is_enabled: z.boolean({ required_error: t('bo.forms.errors.required') }),
  }

  const serviceSchema = {
    name: z.string({ required_error: t('bo.forms.errors.required') }),
    short_name: z.string({ required_error: t('bo.forms.errors.required') }),
    is_enabled: z.boolean({ required_error: t('bo.forms.errors.required') }),
  }

  const formFieldSchema = {
    type: z.string({ required_error: t('bo.forms.errors.required') }),
    label: z.string({ required_error: t('bo.forms.errors.required') }),
    mandatory: z.boolean({ required_error: t('bo.forms.errors.required') }),
  }

  return {
    professionSchema,
    serviceSchema,
    formFieldSchema,
  }
}
