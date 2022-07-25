import { t } from '@i18n'
import { noFirstSymbolsPattern } from './validationPatterns'

export const validateTag = (value: string, tags?: string[]): string | null => {
  const loweredValue = value.toLowerCase().trim()

  if (tags && tags.some(tag => tag.toLowerCase().trim() === loweredValue)) {
    return t('variant.tagExists')
  }

  if (value.length > 30) {
    return t('error.tagNameIsTooLong')
  }

  if (noFirstSymbolsPattern.test(value)) {
    return t('error.noFirstSymbols')
  }

  return null
}
