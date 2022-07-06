import { ReturnedVariantsDataCy } from '@data-testid'
import { Helper } from '../../shared/helpers'
import { BasePage } from '../lib/base-page'
import { ReturnedVariantWidget } from './widgets/returned-variants.widget'

class ReturnedVariantsPage extends BasePage {
  readonly returnedVariantsTable: ReturnedVariantWidget
  constructor() {
    super()
    this.returnedVariantsTable = new ReturnedVariantWidget({
      selectors: {
        sampleButton: Helper.getDataId(ReturnedVariantsDataCy.sampleButton),
        // TODO: fix the localor
        tableSection: '[data-grid="[object Object]"]',
        returnedVariantsHeader: Helper.getDataId(
          ReturnedVariantsDataCy.returnedVariantsHeader,
        ),
      },
      labels: {
        returnedVariantsHeader: 'returnedVariantsHeader',
      },
    })
  }
}
export const returnedVariantsPage = new ReturnedVariantsPage()
