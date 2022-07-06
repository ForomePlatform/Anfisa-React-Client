import { CommonSelectors } from '@data-testid/index'
import { datasetPage } from '../page-objects/app/datasets-page'
import { decisionTreesPage } from '../page-objects/app/decision-trees-page'
import { ApiEndpoints, Paths } from '../shared/constants'

describe('XL Dataset should be opened in decision tree', () => {
  const datasetName = 'PGP3140_wgs_NIST-4_2'
  const xlDatasetName = 'xl_' + datasetName
  const filterName = '@Hearing Loss, v.5'

  it('should open XL dataset in decision tree | Test #1', () => {
    datasetPage.visit()
    datasetPage.leftPanel.leftPanelHeader.checkLabelText('Datasets')
    datasetPage.leftPanel.datasetsListElem.getButtonByText(datasetName).click()
    datasetPage.datasetInfo.datasetHeader.haveText(xlDatasetName)
    datasetPage.datasetInfo.openInViewer.click()
    datasetPage.datasetInfo.viewerOption.contains('Decision Tree Panel').click()
    cy.url().should('include', `${Paths.dtree}?ds=${xlDatasetName}`)
  })

  it('should open decision tree and select filter | Test #2', () => {
    datasetPage.visit(`${Paths.dtree}?ds=${xlDatasetName}`)

    decisionTreesPage.decisionTreeMenu.selectDecisionTree.click()
    cy.intercept('POST', ApiEndpoints.statUnits).as('decTreeUpload')
    cy.wait('@decTreeUpload')

    decisionTreesPage.decisionTreeMenu.selectDecisionTree.getFilter(filterName)
    decisionTreesPage.decisionTreeMenu.applyFilter.click()
    decisionTreesPage.decisionTreeResults.stepCard.countElements(17)
  })

  it('should exclude 3 variants | Test #3 part 1', () => {
    cy.intercept('POST', ApiEndpoints.statUnits).as('filterLoad')

    visitWithFilter()
    cy.wait('@filterLoad')

    const results = decisionTreesPage.decisionTreeResults
    results.resultsTitle.checkLabelText(
      'Showing results for Final Step (Included Variants)',
    )
    results.stepCard.findStepAndExclude('Step 5')
    cy.wait('@filterLoad')

    results.resultsTitle.checkLabelText()
  })

  it('should find unit name Most_Severe_Consequence | Test #3 part 2', () => {
    cy.intercept('POST', ApiEndpoints.statUnits).as('filterLoad')
    visitWithFilter()
    cy.wait('@filterLoad')

    const results = decisionTreesPage.decisionTreeResults
    results.stepCard.findStepAndExclude('Step 5')
    results.resultsTitle.checkLabelText()

    const unitName = 'Most_Severe_Consequence'

    results.unitGroupName
      //@ts-ignore
      .contains(/^Variant$/)
      .parent()
      .parent()
      .contains(unitName)
  })

  it('should be possible to search for unit Presence_in_Databases | Test #3 part 3', () => {
    cy.intercept('POST', ApiEndpoints.statUnits).as('filterLoad')
    visitWithFilter()
    cy.wait('@filterLoad')

    const results = decisionTreesPage.decisionTreeResults
    results.stepCard.findStepAndExclude('Step 5')

    const unitName = 'Presence_in_Databases'
    results.searchResults.type(unitName)
    results.unitGroupName.element.should('have.length', 1)
    results.unitGroupName.contains('Databases')
    results.unitName.contains(unitName)
  })

  it('should find splice_altering in group of units "Predictions" | Test #3 part 4', () => {
    cy.intercept('POST', ApiEndpoints.statUnits).as('filterLoad')
    visitWithFilter()
    cy.wait('@filterLoad')

    decisionTreesPage.decisionTreeResults.stepCard.findStepAndExclude('Step 5')

    const unitName = 'splice_altering'
    const results = decisionTreesPage.decisionTreeResults
    results.searchResults.type(unitName)

    results.unitGroupName.element.should('have.length', 1)
    results.unitGroupName.contains('Predictions')
    results.unitName.contains(unitName)
  })

  it('should show bar chart with masked_repeats info for unit "Region_Canonical" | Test #3 part 5', () => {
    cy.intercept('POST', ApiEndpoints.statUnits).as('filterLoad')
    visitWithFilter()
    cy.wait('@filterLoad')
    decisionTreesPage.decisionTreeResults.stepCard.findStepAndExclude('Step 5')

    const unitName = 'Region_Canonical'
    const results = decisionTreesPage.decisionTreeResults
    results.searchResults.type(unitName)
    cy.wait('@filterLoad')

    results.unitGroupName.element.should('have.length', 1)
    results.unitGroupName.contains('Coordinates')

    results.unitPredictionPower.element.should('be.visible')
    results.unitName.contains(unitName).click()

    results.unitChart.element.find('rect').eq(0).click()
    cy.get(`#${CommonSelectors.chartTooltip}`).should(
      'have.text',
      'intron2 variants',
    )

    results.unitChart.element.find('rect').eq(1).click()
    cy.get(`#${CommonSelectors.chartTooltip}`).should(
      'have.text',
      'masked_repeats2 variants',
    )

    results.unitChart.element.find('rect').eq(2).click()
    cy.get(`#${CommonSelectors.chartTooltip}`).should(
      'have.text',
      'Other1 variant',
    )
  })

  function visitWithFilter() {
    datasetPage.visit(`${Paths.dtree}?ds=${xlDatasetName}`)
    decisionTreesPage.decisionTreeMenu.selectDecisionTree.click()
    decisionTreesPage.decisionTreeMenu.selectDecisionTree.getFilter(filterName)
    decisionTreesPage.decisionTreeMenu.applyFilter.click()
  }
})
