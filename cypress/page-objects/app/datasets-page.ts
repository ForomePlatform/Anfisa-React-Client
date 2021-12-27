import { DatasetCard } from '../../../src/components/data-testid/dataset-card.cy'
import { DatasetInfoDataCy } from '../../../src/components/data-testid/dataset-info.cy'
import { FilterDatasetDataCy } from '../../../src/components/data-testid/filter-dataset.cy'
import { BasePage } from '../lib/base-page'
import { DatasetInfoWidget } from './widgets/dataset-info.widget'
import { LeftPanelWidget } from './widgets/left-panel.widget'

class DatasetPage extends BasePage {
  readonly leftPanel: LeftPanelWidget
  readonly datasetInfo: DatasetInfoWidget
  constructor() {
    super()
    this.leftPanel = new LeftPanelWidget({
      selectors: {
        searchInput: addDataId(FilterDatasetDataCy.searchInput),
        leftPanelHeader: addDataId(FilterDatasetDataCy.leftPanelHeader),
        datasetsListElem: addDataId(FilterDatasetDataCy.datasetsListElem),
      },
      labels: { leftPanelHeader: 'Datasets' },
    })
    this.datasetInfo = new DatasetInfoWidget({
      selectors: {
        openInViewer: addDataId(DatasetInfoDataCy.openInViewer),
        decTreePanel: addDataId(DatasetInfoDataCy.decTreePanel),
        datasetHeader: addDataId(DatasetCard.datasetHeader),
        mainTable: addDataId(DatasetInfoDataCy.mainTable),
      },
      labels: {
        datasetHeader: 'xl_PGP3140_wgs_NIST-4_2',
      },
    })
  }
  getDataset(name: string) {
    return cy.get('[data-testid="search-dataset"]').contains(name)
  }
}

export const datasetPage = new DatasetPage()

function addDataId(selector: string): string {
  return `[data-testid = "${selector}"]`
}
