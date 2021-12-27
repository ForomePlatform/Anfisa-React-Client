import { CommonSelectors } from '../../../src/components/data-testid/common-selectors.cy'
import { VariantDrawerDataCy } from '../../../src/components/data-testid/variant-drawer.cy'
import { BasePage } from '../lib/base-page'
import { VariantDrawerWidget } from './widgets/variant-drawer.widget'

class VariantDrawerPage extends BasePage {
  readonly variantDrawer: VariantDrawerWidget
  constructor() {
    super()
    this.variantDrawer = new VariantDrawerWidget({
      selectors: {
        addTag: addDataId(VariantDrawerDataCy.addTag),
        tagInput: `${CommonSelectors.tagInput}`,
        addCustomTag: addDataId(VariantDrawerDataCy.addCustomTag),
        tagCheckbox: `${CommonSelectors.checkbox}`,
        saveTags: addDataId(VariantDrawerDataCy.saveTags),
        addNote: addDataId(VariantDrawerDataCy.addNote),
        fillSpace: `${CommonSelectors.fillSpace}`,
        saveNote: addDataId(VariantDrawerDataCy.saveNote),
        addedTag: addDataId(VariantDrawerDataCy.addedTag),
      },
      labels: {
        addedTag: '',
      },
    })
  }
}
export const variantDrawerPage = new VariantDrawerPage()

function addDataId(selector: string): string {
  return `[data-testid = "${selector}"]`
}
