import { CommonSelectors } from '../../../src/components/data-testid/common-selectors.cy'
import { FilterRefiner } from '../../../src/components/data-testid/filter-refiner.cy'
import { BasePage } from '../lib/base-page'
import { FilterRefinerMenuWidget } from './widgets/filter-refiner.widget'
import { FilterRefinerLeftPanelWidget } from './widgets/filter-refiner-left-panel.widget'
import { FilterRefinerFilterWidget } from './widgets/filter-refiner-select-filter.widget'
import { FilterRefinerTotalWidget } from './widgets/filter-refiner-total.widget'

class FilterRefinerPage extends BasePage {
  readonly menu: FilterRefinerMenuWidget
  readonly leftPanel: FilterRefinerLeftPanelWidget
  readonly filter: FilterRefinerFilterWidget
  readonly total: FilterRefinerTotalWidget

  constructor() {
    super()
    this.menu = new FilterRefinerMenuWidget({
      selectors: {
        selectPreset: addDataId(FilterRefiner.selectPreset),
        saveDataset: addDataId(FilterRefiner.saveDataset),
      },
    })
    this.leftPanel = new FilterRefinerLeftPanelWidget({
      selectors: {
        searchField: addDataId(FilterRefiner.searchField),
        listElements: addDataId(FilterRefiner.listElements),
      },
    })
    this.filter = new FilterRefinerFilterWidget({
      selectors: {
        filterHeader: addDataId(FilterRefiner.filterHeader),
        filterElements: addDataId(FilterRefiner.filterElements),
        filterElementsCheckbox: addDataId(CommonSelectors.checkbox),
        addButton: addDataId(FilterRefiner.addButton),
        clearButton: addDataId(FilterRefiner.clearButton),
      },
      labels: {
        filterHeader: '',
        filterElements: '',
      },
    })
    this.total = new FilterRefinerTotalWidget({
      selectors: {
        applyButton: addDataId(FilterRefiner.applyButton),
        rulesListElement: addDataId(FilterRefiner.rulesListElement),
        rulesListCheckbox: addDataId(CommonSelectors.checkbox),
        variantsNumber: addDataId(FilterRefiner.variantsNumber),
      },
      labels: {
        rulesListElement: '',
        variantsNumber: '',
      },
    })
  }
}

export const filterRefinerPage = new FilterRefinerPage()

function addDataId(selector: string): string {
  return `[data-testid = "${selector}"]`
}
