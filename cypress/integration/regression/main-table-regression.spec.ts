/* eslint-disable no-undef */
import { CommonSelectors } from '../../../src/components/data-testid/common-selectors.cy'
import { datasetPage } from '../../page-objects/app/datasets-page'
import { mainTablePage } from '../../page-objects/app/main-table-page'
import { variantDrawerPage } from '../../page-objects/app/variant-drawer-page'

describe('Regression test of the main table | step 1', () => {
  it('should open main table for PGP3140_wgs_panel_hl dataset', () => {
    datasetPage.visit()
    datasetPage.leftPanel.leftPanelHeader.checkLabelText('Datasets')
    datasetPage.leftPanel.datasetsListElem
      .getButtonByText('PGP3140_wgs_panel_hl')
      .click()
    datasetPage.leftPanel.leftPanelHeader.checkLabelText('Datasets')
    cy.wait(500)
    datasetPage.datasetInfo.openInViewer.click()
    datasetPage.datasetInfo.mainTable.click()
    cy.url().should('include', '/ws?ds=PGP3140_wgs_panel_hl')
  })

  it('should apply preset on a dataset | step 2', () => {
    mainTablePage.visit('/ws?ds=PGP3140_wgs_panel_hl')
    cy.intercept('POST', '/app/tab_report').as('dsUpload')
    cy.wait('@dsUpload', { timeout: 20000 })
    mainTablePage.mainTable.numVariants.haveText('Variants: 2592')
    mainTablePage.mainTable.selectPreset.click()
    cy.intercept('POST', '/app/tab_report').as('loadPreset')
    mainTablePage.mainTable.preset
      .getButtonByText('⏚BGM_Homozygous_Rec')
      .click()
    cy.wait('@loadPreset', { timeout: 20000 })
    //number of variants changes
    mainTablePage.mainTable.numVariants.haveText('Variants: 2')
  })

  it('should apply gene to the preset | step 3', () => {
    mainTablePage.visit('/ws?ds=PGP3140_wgs_panel_hl')
    cy.intercept('POST', '/app/tab_report').as('dsUpload')
    cy.wait('@dsUpload', { timeout: 20000 })
    mainTablePage.mainTable.selectPreset.click()
    cy.intercept('POST', '/app/tab_report').as('loadPreset')
    mainTablePage.mainTable.numVariants.haveText('Variants: 2592')
    mainTablePage.mainTable.preset
      .getButtonByText('⏚BGM_Homozygous_Rec')
      .click()
    cy.wait('@loadPreset', { timeout: 20000 })
    //number of variants changes
    mainTablePage.mainTable.numVariants.haveText('Variants: 2')
    mainTablePage.mainTable.addGene.click()
    mainTablePage.mainTable.searchFilter.type('CHSY1')
    mainTablePage.mainTable.geneCheckbox.check()
    mainTablePage.mainTable.applyButton.click()
    mainTablePage.mainTable.numVariants.haveText('Variants: 1')
  })

  it('should add custom tag to the variant | step 4', () => {
    mainTablePage.visit('/ws?ds=PGP3140_wgs_panel_hl')
    cy.intercept('POST', '/app/tab_report').as('dsUpload')
    cy.wait('@dsUpload', { timeout: 20000 })
    cy.intercept('POST', '/app/tab_report').as('loadPreset')
    mainTablePage.mainTable.numVariants.haveText('Variants: 2592')
    mainTablePage.mainTable.selectPreset.click()
    mainTablePage.mainTable.preset
      .getButtonByText('⏚BGM_Homozygous_Rec')
      .click()
    cy.wait('@loadPreset', { timeout: 20000 })
    //number of variants changes
    mainTablePage.mainTable.numVariants.haveText('Variants: 2')
    mainTablePage.mainTable.addGene.click()
    mainTablePage.mainTable.searchFilter.type('CHSY1')
    mainTablePage.mainTable.geneCheckbox.check()
    mainTablePage.mainTable.applyButton.click()
    mainTablePage.mainTable.numVariants.haveText('Variants: 1')
    mainTablePage.mainTable.tableRow.getButtonByText('p.Y434=').click()
    variantDrawerPage.variantDrawer.addTag.eq(1).click()
    variantDrawerPage.variantDrawer.tagInput.type('Custom_tag')
    variantDrawerPage.variantDrawer.addCustomTag.forceClick()
    cy.wait(500)
    cy.intercept('POST', '/app/ws_tags').as('addTags')
    variantDrawerPage.variantDrawer.saveTags.forceClick()
    cy.wait('@addTags', { timeout: 20000 })
  })

  it('should add note to the variant | step 5', () => {
    mainTablePage.visit('/ws?ds=PGP3140_wgs_panel_hl')
    cy.intercept('POST', '/app/tab_report').as('dsUpload')
    cy.wait('@dsUpload', { timeout: 20000 })
    mainTablePage.mainTable.selectPreset.click()
    cy.intercept('POST', '/app/tab_report').as('loadPreset')
    mainTablePage.mainTable.numVariants.haveText('Variants: 2592')
    mainTablePage.mainTable.preset
      .getButtonByText('⏚BGM_Homozygous_Rec')
      .click()
    cy.wait('@loadPreset', { timeout: 20000 })
    //number of variants changes
    mainTablePage.mainTable.numVariants.haveText('Variants: 2')
    mainTablePage.mainTable.addGene.click()
    mainTablePage.mainTable.searchFilter.type('CHSY1')
    mainTablePage.mainTable.geneCheckbox.check()
    mainTablePage.mainTable.applyButton.click()
    mainTablePage.mainTable.numVariants.haveText('Variants: 1')
    mainTablePage.mainTable.tableRow.getButtonByText('p.Y434=').click()
    variantDrawerPage.variantDrawer.addNote.click()
    variantDrawerPage.variantDrawer.fillSpace.type('note addition test')
    cy.intercept('POST', '/app/ws_tags?ds=PGP3140_wgs_panel_hl&rec=**').as(
      'addNote',
    )
    variantDrawerPage.variantDrawer.saveNote.click()
    cy.wait('@addNote', { timeout: 20000 })
  })

  it('should filter main table by custom tag | step 6', () => {
    mainTablePage.visit('/ws?ds=PGP3140_wgs_panel_hl')
    cy.intercept('POST', '/app/tab_report').as('dsUpload')
    cy.wait('@dsUpload', { timeout: 20000 })
    mainTablePage.mainTable.selectPreset.click()
    cy.intercept('POST', '/app/tab_report').as('loadPreset')
    mainTablePage.mainTable.numVariants.haveText('Variants: 2592')
    mainTablePage.mainTable.preset
      .getButtonByText('⏚BGM_Homozygous_Rec')
      .click()
    cy.wait('@loadPreset', { timeout: 20000 })
    //number of variants changes
    mainTablePage.mainTable.numVariants.haveText('Variants: 2')
    mainTablePage.mainTable.addTag.first().click()
    mainTablePage.mainTable.searchFilter.type('CustomTag')
    mainTablePage.mainTable.checkbox.variantMainTableCheckbox('CustomTag')
    mainTablePage.mainTable.applyButton.click()
    mainTablePage.mainTable.numVariants.haveText('Variants: 0')
  })

  it('should turn off Gene column | step 7', () => {
    mainTablePage.visit('/ws?ds=PGP3140_wgs_panel_hl')
    cy.intercept('POST', '/app/tab_report').as('dsUpload')
    cy.wait('@dsUpload', { timeout: 20000 })
    mainTablePage.mainTable.numVariants.haveText('Variants: 2592')
    mainTablePage.mainTable.customizeTable.click()
    mainTablePage.mainTable.searchColumn.type('Gene')
    mainTablePage.mainTable.columnSwitch.eq(1).click({ force: true })
    mainTablePage.mainTable.applyButton.click()
    mainTablePage.mainTable.columnHeader.countElements(7)
  })

  it('should turn on Gene column | step 8', () => {
    mainTablePage.visit('/ws?ds=PGP3140_wgs_panel_hl')
    cy.intercept('POST', '/app/tab_report').as('dsUpload')
    cy.wait('@dsUpload', { timeout: 20000 })
    mainTablePage.mainTable.numVariants.haveText('Variants: 2592')
    mainTablePage.mainTable.customizeTable.click()
    mainTablePage.mainTable.searchColumn.type('Gene')
    mainTablePage.mainTable.columnSwitch.eq(1).click({ force: true })
    mainTablePage.mainTable.applyButton.click()
    mainTablePage.mainTable.columnHeader.countElements(7)
    mainTablePage.mainTable.customizeTable.click()
    mainTablePage.mainTable.searchColumn.clear()
    mainTablePage.mainTable.searchColumn.type('Gene')
    mainTablePage.mainTable.columnSwitch.eq(1).click({ force: true })
    mainTablePage.mainTable.applyButton.click()
    mainTablePage.mainTable.columnHeader.countElements(8)
  })

  it('should turn off column from the middle part of a table | step 9', () => {
    mainTablePage.visit('/ws?ds=PGP3140_wgs_panel_hl')
    cy.intercept('POST', '/app/tab_report').as('dsUpload')
    cy.wait('@dsUpload', { timeout: 20000 })
    mainTablePage.mainTable.numVariants.haveText('Variants: 2592')
    mainTablePage.mainTable.customizeTable.click()
    mainTablePage.mainTable.searchColumn.type('In-Silico')
    mainTablePage.mainTable.columnSwitch.eq(1).click({ force: true })
    mainTablePage.mainTable.applyButton.click()
    mainTablePage.mainTable.columnHeader.countElements(7)
  })

  it('should turn on column from the middle part of table | step 10', () => {
    mainTablePage.visit('/ws?ds=PGP3140_wgs_panel_hl')
    cy.intercept('POST', '/app/tab_report').as('dsUpload')
    cy.wait('@dsUpload', { timeout: 20000 })
    mainTablePage.mainTable.numVariants.haveText('Variants: 2592')
    mainTablePage.mainTable.customizeTable.click()
    mainTablePage.mainTable.searchColumn.type('In-Silico')
    mainTablePage.mainTable.customizeTableList.element.within($list => {
      $list.find(CommonSelectors.columnSwitch).click()
    })
    //mainTablePage.mainTable.columnSwitch.eq(1).click()
    mainTablePage.mainTable.applyButton.click()
    mainTablePage.mainTable.columnHeader.countElements(7)
    mainTablePage.mainTable.customizeTable.click()
    mainTablePage.mainTable.searchColumn.clear()
    mainTablePage.mainTable.searchColumn.type('In-Silico')
    mainTablePage.mainTable.columnSwitch.eq(1).click({ force: true })
    mainTablePage.mainTable.applyButton.click()
    mainTablePage.mainTable.columnHeader.countElements(8)
  })

  it('should save Excel file | test #12', () => {
    mainTablePage.visit('/ws?ds=PGP3140_wgs_panel_hl')
    cy.intercept('POST', '/app/tab_report').as('dsUpload')
    cy.wait('@dsUpload', { timeout: 20000 })
    mainTablePage.mainTable.selectPreset.click()
    cy.intercept('POST', '/app/tab_report').as('loadPreset')
    mainTablePage.mainTable.numVariants.haveText('Variants: 2592')
    mainTablePage.mainTable.preset
      .getButtonByText('⏚BGM_Homozygous_Rec')
      .click()
    cy.wait('@loadPreset', { timeout: 20000 })
    //number of variants changes
    mainTablePage.mainTable.numVariants.haveText('Variants: 2')
    cy.intercept('GET', '/app/excel/PGP3140_wgs_panel_hl_****.xlsx').as(
      'reportDownload',
    )
    mainTablePage.mainTable.exportReport.click()
    mainTablePage.mainTable.exportExcel.click()
    cy.wait('@reportDownload')
  })

  it('should save csv file | test #13', () => {
    mainTablePage.visit('/ws?ds=PGP3140_wgs_panel_hl')
    cy.intercept('POST', '/app/tab_report').as('dsUpload')
    cy.wait('@dsUpload', { timeout: 20000 })
    mainTablePage.mainTable.selectPreset.click()
    cy.intercept('POST', '/app/tab_report').as('loadPreset')
    mainTablePage.mainTable.numVariants.haveText('Variants: 2592')
    mainTablePage.mainTable.preset
      .getButtonByText('⏚BGM_Homozygous_Rec')
      .click()
    cy.wait('@loadPreset', { timeout: 20000 })
    //number of variants changes
    mainTablePage.mainTable.numVariants.haveText('Variants: 2')
    cy.intercept('POST', '/app/export').as('reportCsvDownload')
    mainTablePage.mainTable.exportReport.click()
    mainTablePage.mainTable.exportExcel.click()
    cy.wait('@reportCsvDownload', { timeout: 20000 })
  })
})
