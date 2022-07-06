/* eslint-disable @typescript-eslint/no-use-before-define */
import {
  CommonSelectors,
  DecisionTreesMenuDataCy,
  DecisionTreeModalDataCy,
  DecisionTreesResultsDataCy,
} from '@data-testid/index'
import { Helper } from '../../shared/helpers'
import { BasePage } from '../lib/base-page'
import { AttributesListWidget } from './widgets/attributes-list.widget'
import { DecisionTreeChartWidget } from './widgets/decision-tree-chart.widget'
import { DecisionTreeWidget } from './widgets/decision-tree-menu.widget'
import { DecisionTreeResultsWidget } from './widgets/decision-tree-results.widget'

class DecisionTreesPage extends BasePage {
  readonly decisionTreeMenu: DecisionTreeWidget
  readonly decisionTreeResults: DecisionTreeResultsWidget
  readonly attributesList: AttributesListWidget
  readonly decisionTreeChart: DecisionTreeChartWidget
  constructor() {
    super()
    this.decisionTreeMenu = new DecisionTreeWidget({
      selectors: {
        applyFilter: Helper.getDataId(DecisionTreesMenuDataCy.applyFilter),
        selectDecisionTree: Helper.getDataId(
          DecisionTreesMenuDataCy.selectDecisionTree,
        ),
        decisionActions: Helper.getDataId(
          DecisionTreesMenuDataCy.decisionActions,
        ),
        loadDecision: Helper.getDataId(DecisionTreesMenuDataCy.loadDecision),
        selectDropdownElem: Helper.getDataId(
          DecisionTreesMenuDataCy.selectDropdownElem,
        ),
        saveDataset: Helper.getDataId(DecisionTreesMenuDataCy.saveDataset),
        datasetNameInput: Helper.getDataId(
          DecisionTreesMenuDataCy.datasetNameInput,
        ),
        addNewDataset: DecisionTreesMenuDataCy.addNewDataset,
        cancelAddNewDataset: Helper.getDataId(
          DecisionTreesMenuDataCy.cancelAddNewDataset,
        ),
        textEditor: Helper.getDataId(DecisionTreesMenuDataCy.textEditor),
        createNew: Helper.getDataId(DecisionTreesMenuDataCy.createNew),
        applyNewTree: Helper.getDataId(DecisionTreesMenuDataCy.applyNewTree),
        newDecisionTreeNameInput:
          DecisionTreesMenuDataCy.newDecisionTreeNameInput,
      },
      labels: {},
    })
    this.decisionTreeResults = new DecisionTreeResultsWidget({
      selectors: {
        searchResults: Helper.getDataId(
          DecisionTreesResultsDataCy.searchResults,
        ),
        searchStepsResults: Helper.getDataId(
          DecisionTreesResultsDataCy.searchStepsResults,
        ),
        unitName: Helper.getDataId(DecisionTreesResultsDataCy.unitName),
        unitGroupName: Helper.getDataId(
          DecisionTreesResultsDataCy.unitGroupName,
        ),
        unitChart: Helper.getDataId(DecisionTreesResultsDataCy.unitChart),
        unitPredictionPower: Helper.getDataId(
          DecisionTreesResultsDataCy.unitPredictionPower,
        ),
        stepCard: Helper.getDataId(DecisionTreesResultsDataCy.stepCard),
        excludeInfo: Helper.getDataId(DecisionTreesResultsDataCy.excludeInfo),
        viewReturnedVariants: Helper.getDataId(
          DecisionTreesResultsDataCy.viewReturnedVariants,
        ),
        resultsTitle: Helper.getDataId(DecisionTreesResultsDataCy.resultsTitle),
        addAttribute: Helper.getDataId(DecisionTreesResultsDataCy.addAttrbute),
        joinByLabel: Helper.getDataId(DecisionTreeModalDataCy.joinByLabel),
        optionsMenu: Helper.getDataId(DecisionTreesResultsDataCy.optionsMenu),
        addStepAfter: Helper.getDataId(DecisionTreesResultsDataCy.addStepAfter),
        deleteStep: Helper.getDataId(DecisionTreesResultsDataCy.deleteStep),
        leftInput: Helper.getDataId(DecisionTreeModalDataCy.leftInput),
        rightInput: Helper.getDataId(DecisionTreeModalDataCy.rightInput),
        selectReset: Helper.getDataId(DecisionTreeModalDataCy.selectReset),
        addButton: Helper.getDataId(DecisionTreeModalDataCy.addButton),
        removeButton: Helper.getDataId(DecisionTreeModalDataCy.removeButton),
        numberInput: Helper.getDataId(CommonSelectors.numberInput),
        cancelButton: Helper.getDataId(DecisionTreeModalDataCy.cancelButton),
        gearButton: Helper.getDataId(DecisionTreesResultsDataCy.gearButton),
        contentEditor: Helper.getDataId(
          DecisionTreesResultsDataCy.contentEditor,
        ),
        expandAll: Helper.getDataId(DecisionTreesResultsDataCy.expandAll),
        collapseAll: Helper.getDataId(DecisionTreesResultsDataCy.collapseAll),
        modalHeader: Helper.getDataId(DecisionTreeModalDataCy.modalHeader),
        anyChangeAlert: CommonSelectors.anyChangeAlert,
      },
      labels: {
        stepCard: 'header3',
        resultsTitle: 'Showing results for Step 5 (Excluded Variants)',
        joinByLabel: 'Join by AND',
        contentEditor: '',
        modalHeader: 'Edit current Decision Tree code',
        anyChangeAlert: '',
      },
    })
    this.attributesList = new AttributesListWidget({
      selectors: {
        searchForAttr: Helper.getDataId(
          DecisionTreesResultsDataCy.searchForAttr,
        ),
        selectAll: Helper.getDataId(
          DecisionTreeModalDataCy.selectAllFromAttribute,
        ),
        addSelectedAttributes: Helper.getDataId(
          DecisionTreeModalDataCy.addSelectedAttributes,
        ),
        addByJoin: Helper.getDataId(DecisionTreeModalDataCy.addByJoin),
        problemGroup: CommonSelectors.checkbox,
        joinByAnd: Helper.getDataId(DecisionTreeModalDataCy.joinByAnd),
        joinByOr: Helper.getDataId(DecisionTreeModalDataCy.joinByOr),
        replaceButton: Helper.getDataId(DecisionTreeModalDataCy.replaceButton),
        variantsList: Helper.getDataId(DecisionTreesResultsDataCy.variantsList),
      },
      labels: {
        variantsList: '',
      },
    })
    this.decisionTreeChart = new DecisionTreeChartWidget({
      selectors: {
        dataCharts: CommonSelectors.dataCharts,
      },
      labels: {
        dataCharts: '',
      },
    })
  }
  searchForCallers(datasetName: string): void {
    decisionTreesPage.visit(`/filter?ds=${datasetName}`)
    decisionTreesPage.decisionTreeResults.addAttribute.click()
    decisionTreesPage.attributesList.searchForAttr.eq(0).type('aller')
  }

  selectAllAttributes(selectAll: string): void {
    decisionTreesPage.attributesList.selectAll.contains(selectAll).click()
    cy.intercept('POST', '/app/statunits').as('applyAttributes')
    decisionTreesPage.attributesList.addSelectedAttributes.click()
    cy.wait('@applyAttributes')
  }

  addStepAfter(elementNumber: number) {
    cy.intercept('POST', '/app/dtree_stat').as('stepAfter')
    decisionTreesPage.decisionTreeResults.optionsMenu.eq(elementNumber).click()
    decisionTreesPage.decisionTreeResults.addStepAfter.click()
    cy.wait('@stepAfter')
  }

  addMinGq(min: string, max: string) {
    decisionTreesPage.decisionTreeResults.stepCard.countElements(2)
    decisionTreesPage.decisionTreeResults.addAttribute.eq(1).click()
    decisionTreesPage.attributesList.searchForAttr.eq(0).type('Min_GQ')
    decisionTreesPage.decisionTreeResults.unitName.eq(0).click()
    decisionTreesPage.decisionTreeResults.leftInput.type(min)
    decisionTreesPage.decisionTreeResults.rightInput.type(max)
  }
}

export const decisionTreesPage = new DecisionTreesPage()
