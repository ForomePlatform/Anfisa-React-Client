import { CommonSelectors } from '@data-testid/index'
import { Checkbox } from './checkbox'

export class MainTableCheckbox extends Checkbox {
  constructor(selector: string) {
    super(selector)
  }
  variantMainTableCheckbox(substring?: string) {
    // TODO: fix selector
    // cy.get(CommonSelectors.checkBoxList)
    //   .find(`[data-testid = "${MainTableDataCy.checkboxListElement}"]`)
    //   .contains(substring!)
    //   .siblings(CommonSelectors.checkbox)
    //   .click({ force: true })
  }
  checkTagInDrawer(substring?: string, timeout?: number) {
    cy.get(CommonSelectors.checkBoxListInDrawer, { timeout })
      .find(CommonSelectors.tagNameInDrawer)
      .contains(substring!)
      .siblings(CommonSelectors.checkbox)
      .click({ force: true })
  }
}
