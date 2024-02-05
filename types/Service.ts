import { DateTime } from 'luxon'
export interface Service {
  id: number
  profession_id: number
  name: string
  short_name: string
  picto_file?: string
  image_file?: string
  is_enabled: boolean | number
  created_at?: DateTime
  updated_at?: DateTime
}
