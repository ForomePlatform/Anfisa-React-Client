/* eslint-disable no-undef */
import { datasetPage } from '../../page-objects/app/datasets-page'
import { decisionTreesPage } from '../../page-objects/app/decision-trees-page'

describe('Regression test of the decision tree', () => {
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
    decisionTreesPage.decisionTreeResults.searchForAttr.eq(0).type('aller')
    decisionTreesPage.decisionTreeResults.graphHeaders
      .eq(0)
      .should('have.text', 'Callers')
  })
  it('should select all attributes', () => {
    decisionTreesPage.visit('/filter?ds=xl_PGP3140_wgs_NIST-4_2')
    decisionTreesPage.decisionTreeResults.addAttribute.click()
    decisionTreesPage.decisionTreeResults.searchForAttr.eq(0).type('aller')
    decisionTreesPage.decisionTreeResults.graphHeaders.eq(0).click()
    cy.wait(300)
    decisionTreesPage.decisionTreeResults.selectAll
      .contains('Select All')
      .click()
    decisionTreesPage.decisionTreeResults.addAttribute.click()
    decisionTreesPage.decisionTreeResults.graphHeaders
      .contains('Callers')
      .click()
    decisionTreesPage.decisionTreeResults.selectAll.click()
  })
})
