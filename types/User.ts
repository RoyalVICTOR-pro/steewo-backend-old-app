import { DateTime } from 'luxon'
export interface User {
  id: number
  email: string
  remember_me_token: string | null
  role: number | null
  status: string | null
  user_language: string | null
  privacy_acceptation: DateTime
  cgv_acceptation: DateTime
  email_validation_token: string | null
  is_valid_email: number
  internal_or_sso: string | null
  sso_provider_id: string | null
  password_forgotten: string | null
  password_forgotten_datetime: DateTime | null
  has_enabled_notifications: boolean
  created_at: DateTime
  updated_at: DateTime
}
