import { CommonSelectors } from '../../../src/components/data-testid/common-selectors.cy'
import { DecisionTreesMenuDataCy } from '../../../src/components/data-testid/decision-tree-menu.cy'
import { DecisionTreesResultsDataCy } from '../../../src/components/data-testid/decision-tree-results.cy'
import { BasePage } from '../lib/base-page'
import { AttributesListWidget } from './widgets/attributes-list.widget'
import { DecisionTreeWidget } from './widgets/decision-tree-menu.widget'
import { DecisionTreeResultsWidget } from './widgets/decision-tree-results.widget'

class DecisionTreesPage extends BasePage {
  readonly decisionTreeMenu: DecisionTreeWidget
  readonly decisionTreeResults: DecisionTreeResultsWidget
  readonly attributesList: AttributesListWidget
  constructor() {
    super()
    this.decisionTreeMenu = new DecisionTreeWidget({
      selectors: {
        selectDecision: `[aria-haspopup = "${DecisionTreesMenuDataCy.selectDecision}"]`,
        decisionActions: addDataId(DecisionTreesMenuDataCy.decisionActions),
        loadDecision: addDataId(DecisionTreesMenuDataCy.loadDecision),
        selectDropdownElem: addDataId(
          DecisionTreesMenuDataCy.selectDropdownElem,
        ),
        saveDataset: addDataId(DecisionTreesMenuDataCy.saveDataset),
        datasetNameInput: addDataId(DecisionTreesMenuDataCy.datasetNameInput),
        addNewDataset: addDataId(DecisionTreesMenuDataCy.addNewDataset),
        cancelAddNewDataset: addDataId(
          DecisionTreesMenuDataCy.cancelAddNewDataset,
        ),
      },
      labels: {},
    })
    this.decisionTreeResults = new DecisionTreeResultsWidget({
      selectors: {
        searchGraphResults: addDataId(
          DecisionTreesResultsDataCy.searchGraphResults,
        ),
        searchStepsResults: addDataId(
          DecisionTreesResultsDataCy.searchStepsResults,
        ),
        groupGraphHeaders: addDataId(
          DecisionTreesResultsDataCy.groupGraphHeaders,
        ),
        graphHeaders: addDataId(DecisionTreesResultsDataCy.graphHeaders),
        stepCard: addDataId(DecisionTreesResultsDataCy.stepCard),
        excludeInfo: addDataId(DecisionTreesResultsDataCy.excludeInfo),
        viewReturnedVariants: addDataId(
          DecisionTreesResultsDataCy.viewReturnedVariants,
        ),
        treeTooltip: `${CommonSelectors.treeTooltip}`,
        addAttribute: addDataId(DecisionTreesResultsDataCy.addAttrbute),
      },
      labels: {
        graphHeaders: '',
        groupGraphHeaders: 'Variant',
        stepCard: 'header3',
        treeTooltip: 'Show excluded varants for step 5',
      },
    })
    this.attributesList = new AttributesListWidget({
      selectors: {
        searchForAttr: addDataId(DecisionTreesResultsDataCy.searchForAttr),
        selectAll: addDataId(DecisionTreesResultsDataCy.selectAllFromAttribute),
        addSelectedAttributes: addDataId(
          DecisionTreesResultsDataCy.addSelectedAttributes,
        ),
        addByJoin: addDataId(DecisionTreesResultsDataCy.addByJoin),
      },
    })
  }
}

export const decisionTreesPage = new DecisionTreesPage()

function addDataId(selector: string): string {
  return `[data-testid = "${selector}"]`
}
