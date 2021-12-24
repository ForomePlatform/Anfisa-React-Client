/* eslint-disable no-undef */
import { datasetPage } from '../../page-objects/app/datasets-page'
import { decisionTreesPage } from '../../page-objects/app/decision-trees-page'

describe('Regression test of the decision tree', () => {
  const includedVariants = '+5041176'

  it('should open decision tree for XL dataset', () => {
    datasetPage.visit()
    datasetPage.leftPanel.leftPanelHeader.haveText('Datasets')
    datasetPage.leftPanel.datasetsListElem
      .getButtonByText('xl_PGP3140_wgs_NIST-4_2')
      .click()
    datasetPage.datasetInfo.datasetHeader.haveText('xl_PGP3140_wgs_NIST-4_2')
    datasetPage.datasetInfo.openInViewer.click()
    datasetPage.datasetInfo.decTreePanel.click()
    cy.url().should('include', '/filter?ds=xl_PGP3140_wgs_NIST-4_2')
  })
  it('should search attribute based on a substring', () => {
    decisionTreesPage.visit('/filter?ds=xl_PGP3140_wgs_NIST-4_2')
    decisionTreesPage.decisionTreeResults.addAttribute.click()
    decisionTreesPage.attributesList.searchForAttr.eq(0).type('aller')
    decisionTreesPage.decisionTreeResults.graphHeaders
      .eq(0)
      .should('have.text', 'Callers')
  })
  it('should select all attributes', () => {
    decisionTreesPage.visit('/filter?ds=xl_PGP3140_wgs_NIST-4_2')
    decisionTreesPage.decisionTreeResults.addAttribute.click()
    decisionTreesPage.attributesList.searchForAttr.eq(0).type('aller')
    decisionTreesPage.decisionTreeResults.graphHeaders.eq(0).click()
    cy.wait(300)
    decisionTreesPage.attributesList.selectAll.contains('Select All').click()
    cy.intercept('POST', '/app/statunits').as('applyAttributes')
    decisionTreesPage.attributesList.addSelectedAttributes.click()
    cy.wait('@applyAttributes').its('response.statusCode').should('eq', 200)
    decisionTreesPage.decisionTreeResults.excludeInfo
      .first()
      .should('have.text', includedVariants)
  })
  it('should join second attribute with first', () => {
    decisionTreesPage.visit('/filter?ds=xl_PGP3140_wgs_NIST-4_2')
    decisionTreesPage.decisionTreeResults.addAttribute.click()
    decisionTreesPage.attributesList.searchForAttr.eq(0).type('aller')
    decisionTreesPage.decisionTreeResults.graphHeaders.eq(0).click()
    decisionTreesPage.attributesList.selectAll.contains('Select All').click()
    cy.intercept('POST', '/app/statunits').as('applyAttributes')
    decisionTreesPage.attributesList.addSelectedAttributes.click()
    cy.wait('@applyAttributes').its('response.statusCode').should('eq', 200)
    decisionTreesPage.decisionTreeResults.excludeInfo
      .first()
      .should('have.text', includedVariants)
    decisionTreesPage.decisionTreeResults.addAttribute.click()
    decisionTreesPage.attributesList.searchForAttr
      .eq(0)
      .type('Inheritance_Mode')
    decisionTreesPage.decisionTreeResults.graphHeaders.eq(0).click()
  })
})
