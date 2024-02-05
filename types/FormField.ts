import { DateTime } from 'luxon'
import { FormFieldsTypes } from '@/enums/FormFieldsTypes'
export interface FormField {
  id: number
  service_id: number
  type: FormFieldsTypes
  label: string
  mandatory: boolean | number
  tooltip_image_file?: string
  tooltip_text?: string
  description?: string
  placeholder?: string
  created_at?: DateTime
  updated_at?: DateTime
}
