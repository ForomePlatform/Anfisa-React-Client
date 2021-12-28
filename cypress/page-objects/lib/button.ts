import { CommonSelectors } from '../../../src/components/data-testid/common-selectors.cy'
import { UIElement } from './ui-element'

export class Button extends UIElement {
  constructor(selector: string, isTextSelector = false) {
    super(selector, isTextSelector)
  }
  /**
   * Get current element and check inner text.
   */
  checkButtonText(text: string) {
    return this.getElement().should('have.text', text)
  }
  getButtonByText(text: string) {
    return this.getElement().contains(text)
  }
<<<<<<< HEAD
  getChildren() {
    return this.getElement().children()
  }
  length(num: number) {
    return this.getElement().should('have.length', num)
=======

  getFilter(text: string) {
    return cy.get(CommonSelectors.preset).contains(text).click()
>>>>>>> main
  }
}
