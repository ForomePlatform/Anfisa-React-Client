import {
  DatasetCard,
  DatasetInfoDataCy,
  FilterDatasetDataCy,
} from '@data-testid'
import { Helper } from '../../shared/helpers'
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
        searchInput: Helper.getDataId(FilterDatasetDataCy.searchInput),
        leftPanelHeader: Helper.getDataId(FilterDatasetDataCy.leftPanelHeader),
        datasetsListElem: Helper.getDataId(
          FilterDatasetDataCy.datasetsListElem,
        ),
      },
      labels: { leftPanelHeader: 'Datasets' },
    })
    this.datasetInfo = new DatasetInfoWidget({
      selectors: {
        openInViewer: Helper.getDataId(DatasetInfoDataCy.openInViewer),
        viewerOption: Helper.getDataId(DatasetInfoDataCy.viewerOption),
        datasetHeader: Helper.getDataId(DatasetCard.datasetHeader),
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
