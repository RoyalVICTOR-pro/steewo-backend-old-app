import { DateTime } from 'luxon'
export interface Profession {
  id: number
  name: string
  picto_file?: string
  image_file?: string
  is_enabled: boolean
  created_at: DateTime
  updated_at: DateTime
}
