import { t } from '@i18n'

export const validateNotes = (note: string): string | null => {
  if (note.length > 600) {
    return t('error.tooLongNote')
  }

  return null
}
