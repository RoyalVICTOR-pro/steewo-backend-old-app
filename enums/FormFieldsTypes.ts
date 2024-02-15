import { FormField } from './../types/FormField'
export enum FormFieldsTypes {
  TEXT = 'text',
  TEXTAREA = 'textarea',
  CHECKBOX = 'checkbox',
  LINK = 'link',
  IMAGE_FILE = 'image_file',
  DOCUMENT_FILE = 'document_file',
  VIDEO_FILE = 'video_file',
  COLOR = 'color',
  SELECT = 'select',
  RADIO = 'radio',
}

export const FormFieldsTypesForSelect = [
  { label: 'Champ texte simple', value: FormFieldsTypes.TEXT },
  { label: 'Champ texte multiligne', value: FormFieldsTypes.TEXTAREA },
  { label: 'Case à cocher', value: FormFieldsTypes.CHECKBOX },
  { label: 'Lien web', value: FormFieldsTypes.LINK },
  { label: 'Image', value: FormFieldsTypes.IMAGE_FILE },
  { label: 'Document', value: FormFieldsTypes.DOCUMENT_FILE },
  { label: 'Vidéo', value: FormFieldsTypes.VIDEO_FILE },
  { label: 'Couleur', value: FormFieldsTypes.COLOR },
  { label: 'Sélection', value: FormFieldsTypes.SELECT },
  { label: 'Bouton radio', value: FormFieldsTypes.RADIO },
]
