import {
  noFirstNumberPattern,
  noFirstSymbolsPattern,
  noSpacesPattern,
} from './validationPatterns'

export const validatePresetName = (presetName: string): boolean => {
  if (
    !presetName ||
    noFirstSymbolsPattern.test(presetName) ||
    noFirstNumberPattern.test(presetName) ||
    noSpacesPattern.test(presetName) ||
    presetName.length > 50
  ) {
    return false
  }

  return true
}
