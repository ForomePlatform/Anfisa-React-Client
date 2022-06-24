import { CommonSelectors } from '../../src/components/data-testid/common-selectors.cy'
import { datasetPage } from '../page-objects/app/datasets-page'
import { mainTablePage } from '../page-objects/app/main-table-page'
import { variantDrawerPage } from '../page-objects/app/variant-drawer-page'
import { ApiEndpoints } from '../shared/constants'
import { Timeouts } from '../shared/timeouts'

const today = new Date()

const time =
  today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()

const dateTime = time

describe.skip('Open saved dataset in MainTable', () => {
  const datasetName = 'PGP3140_wgs_NIST-4_2'
  const autoDataset = 'Dataset_from_autotests'
  const datasetsGroup = 'Datasets'
  // const xlDatasetName = 'xl_' + datasetName

  const presetName = '⏚SEQaBOO_Hearing_Quick'
  const variants1 = 'Variants: 41'
  const variants2 = 'Variants: 24'
  const forSecondaryReview = `For_secondary_review/${dateTime}`
  const likelyBenign = `Likely Benign/${dateTime}`
  const polyphenHDIV = `Polyphen HDIV D/${dateTime}`
  const benign = `Benign/${dateTime}`

  it('should open saved on previous step dataset and open it in main table', () => {
    datasetPage.visit()

    const leftPanel = datasetPage.leftPanel
    leftPanel.leftPanelHeader.checkLabelText(datasetsGroup)
    leftPanel.datasetsListElem.getButtonByText(datasetName).click()

    leftPanel.leftPanelHeader.checkLabelText(datasetsGroup)
    leftPanel.datasetsListElem.getButtonByText(autoDataset).click()

    const info = datasetPage.datasetInfo
    info.datasetHeader.haveText(autoDataset)

    info.openInViewer.click()
    info.viewerOption.contains('Main Table').click()
    cy.url().should('include', `/ws?ds=${autoDataset}`)
  })

  it('should select preset in main table | test #6', () => {
    mainTablePage.visit(`/ws?ds=${autoDataset}`)
    const mainTable = mainTablePage.mainTable

    mainTable.selectPreset.click()
    cy.intercept('POST', ApiEndpoints.tabReport).as('tabReport')

    mainTable.numVariants.haveText(variants1)
    mainTable.selectPreset.click()
    mainTable.selectPreset.contains(presetName).click()
    cy.wait('@tabReport').its('response.statusCode').should('eq', 200)

    mainTable.numVariants.haveText(variants2)
    mainTable.addSample.click()
    mainTable.checkboxListElement.contains('proband [HG002]').click()

    mainTable.applyButton.click()
    mainTable.numVariants.haveText('Variants: 8')
    cy.wait('@tabReport').its('response.statusCode').should('eq', 200)
  })

  it('should add custom tag to the variant | test #8/1', () => {
    loginWithPreset()
    mainTablePage.mainTable.addGene.click()
    mainTablePage.mainTable.searchFilter.type('KIT')
    cy.waitUntil(() =>
      mainTablePage.mainTable.checkboxListElement.element.then(el => {
        return el.text() === 'KIT'
      }),
    )
    mainTablePage.mainTable.geneCheckbox.check()
    mainTablePage.mainTable.applyButton.click()
    mainTablePage.mainTable.numVariants.haveText('Variants: 1')
    mainTablePage.mainTable.tableRow.getButtonByText('p.M541L').click()
    variantDrawerPage.variantDrawer.addTag.eq(1).click()
    cy.waitUntil(() =>
      variantDrawerPage.variantDrawer.tagCheckbox.element.then(
        () => Cypress.$(CommonSelectors.tagNameInDrawer).length,
      ),
    )
    variantDrawerPage.variantDrawer.tagInput.type(likelyBenign)
    variantDrawerPage.variantDrawer.addCustomTag.forceClick()
    cy.intercept('POST', '/app/ws_tags').as('addTags')
    variantDrawerPage.variantDrawer.saveTags.forceClick()
    cy.wait('@addTags').its('response.statusCode').should('eq', 200)
    variantDrawerPage.variantDrawer.addedTag.contains(likelyBenign)
  })

  it('should add note to the variant | test #8/2', () => {
    loginWithPreset()
    mainTablePage.mainTable.addGene.click()
    mainTablePage.mainTable.searchFilter.type('KIT')
    cy.waitUntil(() =>
      mainTablePage.mainTable.checkboxListElement.element.then(el => {
        return el.text() === 'KIT'
      }),
    )
    mainTablePage.mainTable.geneCheckbox.check()
    mainTablePage.mainTable.applyButton.click()
    mainTablePage.mainTable.numVariants.haveText('Variants: 1')
    mainTablePage.mainTable.tableRow.getButtonByText('p.M541L').click()
    variantDrawerPage.variantDrawer.addNote.click()
    cy.intercept('POST', `${ApiEndpoints.wsTags}?ds=${autoDataset}&rec=**`).as(
      'addNote',
    )
    variantDrawerPage.variantDrawer.fillSpace.type(
      'MS, 11/10/21: DM in HGMD but benign in ClinVar, common in AS',
    )
    variantDrawerPage.variantDrawer.saveNote.forceClick()
    cy.wait('@addNote').its('response.statusCode').should('eq', 200)
    variantDrawerPage.variantDrawer.addNote.getChildren('svg')
  })

  it('should add custom tag "for secondary review" | test #9/1', () => {
    loginWithPreset()
    mainTablePage.mainTable.addGene.click()
    mainTablePage.mainTable.searchFilter.type('BDP1')
    cy.waitUntil(() =>
      mainTablePage.mainTable.checkboxListElement.element.then(el => {
        return el.text() === 'BDP1'
      }),
    )
    mainTablePage.mainTable.geneCheckbox.check()
    mainTablePage.mainTable.applyButton.click()
    mainTablePage.mainTable.numVariants.haveText('Variants: 1')
    mainTablePage.mainTable.tableRow.getButtonByText('p.A1685P').click()
    variantDrawerPage.variantDrawer.addTag.eq(1).click()
    cy.waitUntil(() =>
      variantDrawerPage.variantDrawer.tagCheckbox.element.then(
        () => Cypress.$(CommonSelectors.tagNameInDrawer).length,
      ),
    )
    variantDrawerPage.variantDrawer.tagInput.type(forSecondaryReview)
    variantDrawerPage.variantDrawer.addCustomTag.forceClick()
    cy.intercept('POST', ApiEndpoints.wsTags).as('addTags')
    variantDrawerPage.variantDrawer.saveTags.forceClick()
    cy.wait('@addTags').its('response.statusCode').should('eq', 200)
    variantDrawerPage.variantDrawer.addedTag.contains(forSecondaryReview)
  })

  it('should add note to the variant | test #9/2', () => {
    loginWithPreset()
    mainTablePage.mainTable.addGene.click()
    mainTablePage.mainTable.searchFilter.type('BDP1')
    cy.waitUntil(() =>
      mainTablePage.mainTable.checkboxListElement.element.then(el => {
        return el.text() === 'BDP1'
      }),
    )
    mainTablePage.mainTable.geneCheckbox.check()
    mainTablePage.mainTable.applyButton.click()
    mainTablePage.mainTable.numVariants.haveText('Variants: 1')
    mainTablePage.mainTable.tableRow.getButtonByText('p.A1685P').click()
    variantDrawerPage.variantDrawer.addNote.click()
    variantDrawerPage.variantDrawer.fillSpace.type(
      'MS, 11/10/21: more common in Ashkenazi Jews than in other populations, is not present in ClinVar',
    )
    cy.intercept('POST', `${ApiEndpoints.wsTags}?ds=${autoDataset}&rec=**`).as(
      'addNote',
    )
    variantDrawerPage.variantDrawer.saveNote.forceClick()
    cy.wait('@addNote').its('response.statusCode').should('eq', 200)
    variantDrawerPage.variantDrawer.addNote.getChildren('svg')
  })

  it('should add tag to the variant | test #10/1', () => {
    loginWithPreset()
    mainTablePage.mainTable.addGene.click()
    mainTablePage.mainTable.searchFilter.type('KCNQ1')
    cy.waitUntil(() =>
      mainTablePage.mainTable.checkboxListElement.element.then(el => {
        return el.text() === 'KCNQ1'
      }),
    )
    mainTablePage.mainTable.geneCheckbox.eq(1).check({ force: true })
    mainTablePage.mainTable.applyButton.click()
    mainTablePage.mainTable.numVariants.haveText('Variants: 1')
    mainTablePage.mainTable.tableRow.getButtonByText('KCNQ1').click()
    variantDrawerPage.variantDrawer.addTag.eq(1).click()
    cy.waitUntil(() =>
      variantDrawerPage.variantDrawer.tagCheckbox.element.then(
        () => Cypress.$(CommonSelectors.tagNameInDrawer).length,
      ),
    )
    variantDrawerPage.variantDrawer.tagCheckbox.checkTagInDrawer(
      'Likely Benign',
      Timeouts.TenSecondsTimeout,
    )
    cy.intercept('POST', ApiEndpoints.wsTags).as('addTags')
    variantDrawerPage.variantDrawer.saveTags.forceClick()
    cy.wait('@addTags').its('response.statusCode').should('eq', 200)
    variantDrawerPage.variantDrawer.addedTag.contains('Likely Benign')
  })

  it('should add note to the variant | test #10/2', () => {
    loginWithPreset()
    mainTablePage.mainTable.addGene.click()
    mainTablePage.mainTable.searchFilter.type('KCNQ1')
    cy.waitUntil(() =>
      mainTablePage.mainTable.checkboxListElement.element.then(el => {
        return el.text() === 'KCNQ1'
      }),
    )
    mainTablePage.mainTable.geneCheckbox.eq(1).check({ force: true })
    mainTablePage.mainTable.applyButton.click()
    mainTablePage.mainTable.numVariants.haveText('Variants: 1')
    mainTablePage.mainTable.tableRow
      .getButtonByText('KCNQ1')
      .click({ force: true })
    variantDrawerPage.variantDrawer.addNote.click()
    variantDrawerPage.variantDrawer.fillSpace.type(
      'MS, 11/10/21: DM in HGMD but benign in ClinVar, common in AS',
    )
    cy.intercept('POST', `${ApiEndpoints.wsTags}?ds=${autoDataset}&rec=**`).as(
      'addNote',
    )
    variantDrawerPage.variantDrawer.saveNote.forceClick()
    cy.wait('@addNote').its('response.statusCode').should('eq', 200)
    variantDrawerPage.variantDrawer.addNote.getChildren('svg')
  })

  it('should add tag to the variant | test #11/1', () => {
    loginWithPreset()
    mainTablePage.mainTable.addGene.click()
    mainTablePage.mainTable.searchFilter.type('KBTBD4')
    cy.waitUntil(() =>
      mainTablePage.mainTable.checkboxListElement.element.then(el => {
        return el.text() === 'KBTBD4'
      }),
    )
    mainTablePage.mainTable.geneCheckbox.check()
    mainTablePage.mainTable.applyButton.click()
    mainTablePage.mainTable.numVariants.haveText('Variants: 1')
    mainTablePage.mainTable.tableRow.getButtonByText('p.E85D').click()
    variantDrawerPage.variantDrawer.addTag.eq(1).click()
    cy.waitUntil(() =>
      variantDrawerPage.variantDrawer.tagCheckbox.element.then(
        () => Cypress.$(CommonSelectors.tagNameInDrawer).length,
      ),
    )
    variantDrawerPage.variantDrawer.tagCheckbox.checkTagInDrawer(
      'For_secondary_review',
      Timeouts.TenSecondsTimeout,
    )
    cy.intercept('POST', ApiEndpoints.wsTags).as('addTags')
    variantDrawerPage.variantDrawer.saveTags.forceClick()
    cy.wait('@addTags').its('response.statusCode').should('eq', 200)
    variantDrawerPage.variantDrawer.addedTag.contains('For_secondary_review')
  })

  it('should add note to the variant | test #11/2', () => {
    loginWithPreset()
    mainTablePage.mainTable.addGene.click()
    mainTablePage.mainTable.searchFilter.type('KBTBD4')
    cy.waitUntil(() =>
      mainTablePage.mainTable.checkboxListElement.element.then(el => {
        return el.text() === 'KBTBD4'
      }),
    )
    mainTablePage.mainTable.geneCheckbox.check()
    mainTablePage.mainTable.applyButton.click()
    mainTablePage.mainTable.numVariants.haveText('Variants: 1')
    mainTablePage.mainTable.tableRow.getButtonByText('p.E85D').click()
    variantDrawerPage.variantDrawer.addNote.click()
    variantDrawerPage.variantDrawer.fillSpace.type(
      'MS, 11/10/21:  coding in NDUFS3 only, a very rare variant that does not have any clinical annotations, but  It does have damaging in-silico predictions from Polyphen and SIFT',
    )
    cy.intercept('POST', `${ApiEndpoints.wsTags}?ds=${autoDataset}&rec=**`).as(
      'addNote',
    )
    variantDrawerPage.variantDrawer.saveNote.forceClick()
    cy.wait('@addNote').its('response.statusCode').should('eq', 200)
    variantDrawerPage.variantDrawer.addNote.getChildren('svg')
  })

  it('should add tag to the variant | test #12', () => {
    loginWithPreset()
    mainTablePage.mainTable.addGene.click()
    mainTablePage.mainTable.searchFilter.type('CABP2')
    cy.waitUntil(() =>
      mainTablePage.mainTable.checkboxListElement.element.then(el => {
        return el.text() === 'CABP2'
      }),
    )
    mainTablePage.mainTable.geneCheckbox.check()
    mainTablePage.mainTable.applyButton.click()
    mainTablePage.mainTable.numVariants.haveText('Variants: 1')
    mainTablePage.mainTable.tableRow.getButtonByText('CABP2').click()
    variantDrawerPage.variantDrawer.addTag.eq(1).click()
    cy.waitUntil(() =>
      variantDrawerPage.variantDrawer.tagCheckbox.element.then(
        () => Cypress.$(CommonSelectors.tagNameInDrawer).length,
      ),
    )
    variantDrawerPage.variantDrawer.tagCheckbox.checkTagInDrawer(
      'Likely Benign',
      Timeouts.TenSecondsTimeout,
    )
    cy.intercept('POST', ApiEndpoints.wsTags).as('addTags')
    variantDrawerPage.variantDrawer.saveTags.forceClick()
    cy.wait('@addTags').its('response.statusCode').should('eq', 200)
    variantDrawerPage.variantDrawer.addedTag.contains('Likely Benign')
  })

  it('should add custom tag | test #13/1', () => {
    loginWithPreset()
    mainTablePage.mainTable.addGene.click()
    mainTablePage.mainTable.searchFilter.type('RNF10')
    cy.waitUntil(() =>
      mainTablePage.mainTable.checkboxListElement.element.then(el => {
        return el.text() === 'RNF10'
      }),
    )
    mainTablePage.mainTable.geneCheckbox.check()
    mainTablePage.mainTable.applyButton.click()
    mainTablePage.mainTable.numVariants.haveText('Variants: 1')
    mainTablePage.mainTable.tableRow.getButtonByText('RNF10').click()
    variantDrawerPage.variantDrawer.addTag.eq(1).click()
    cy.waitUntil(() =>
      variantDrawerPage.variantDrawer.tagCheckbox.element.then(
        () => Cypress.$(CommonSelectors.tagNameInDrawer).length,
      ),
    )
    variantDrawerPage.variantDrawer.tagInput.type(polyphenHDIV)
    variantDrawerPage.variantDrawer.addCustomTag.forceClick()
    variantDrawerPage.variantDrawer.tagCheckbox.checkTagInDrawer(
      'Likely Benign',
      Timeouts.TenSecondsTimeout,
    )

    cy.intercept('POST', ApiEndpoints.wsTags).as('addTags')
    variantDrawerPage.variantDrawer.saveTags.forceClick()
    cy.wait('@addTags').its('response.statusCode').should('eq', 200)
    variantDrawerPage.variantDrawer.addedTag.contains('Likely Benign')
    variantDrawerPage.variantDrawer.addedTag.contains(polyphenHDIV)
  })

  it('should add note to the variant | test #13/2', () => {
    loginWithPreset()
    mainTablePage.mainTable.addGene.click()
    mainTablePage.mainTable.searchFilter.type('RNF10')
    cy.waitUntil(() =>
      mainTablePage.mainTable.checkboxListElement.element.then(el => {
        return el.text() === 'RNF10'
      }),
    )
    mainTablePage.mainTable.geneCheckbox.check()
    mainTablePage.mainTable.applyButton.click()
    mainTablePage.mainTable.numVariants.haveText('Variants: 1')
    mainTablePage.mainTable.tableRow.getButtonByText('RNF10').click()
    variantDrawerPage.variantDrawer.addNote.click()
    variantDrawerPage.variantDrawer.fillSpace.type(
      'MS, 11/10/21:  a damaging prediction by Polyphen HDIV',
    )
    cy.intercept('POST', `${ApiEndpoints.wsTags}?ds=${autoDataset}&rec=**`).as(
      'addNote',
    )
    variantDrawerPage.variantDrawer.saveNote.forceClick()
    cy.wait('@addNote').its('response.statusCode').should('eq', 200)
    variantDrawerPage.variantDrawer.addNote.getChildren('svg')
  })

  it('should add tag "Likely Bening" to the variant | test #14', () => {
    loginWithPreset()
    mainTablePage.mainTable.addGene.click()
    mainTablePage.mainTable.searchFilter.type('ACTG1')
    cy.waitUntil(() =>
      mainTablePage.mainTable.checkboxListElement.element.then(el => {
        return el.text() === 'ACTG1'
      }),
    )
    mainTablePage.mainTable.geneCheckbox.check()
    mainTablePage.mainTable.applyButton.click()
    mainTablePage.mainTable.numVariants.haveText('Variants: 1')
    mainTablePage.mainTable.tableRow.getElement().eq(1).click()
    variantDrawerPage.variantDrawer.addTag.eq(1).click()
    cy.waitUntil(() =>
      variantDrawerPage.variantDrawer.tagCheckbox.element.then(
        () => Cypress.$(CommonSelectors.tagNameInDrawer).length,
      ),
    )
    variantDrawerPage.variantDrawer.tagCheckbox.checkTagInDrawer(
      'Likely Benign',
      Timeouts.TenSecondsTimeout,
    )
    cy.intercept('POST', ApiEndpoints.wsTags).as('addTags')
    variantDrawerPage.variantDrawer.saveTags.forceClick()
    cy.wait('@addTags').its('response.statusCode').should('eq', 200)
    variantDrawerPage.variantDrawer.addedTag.contains('Likely Benign')
  })

  it('should create a new "Benign" tag and apply it to the variant | test #15/1', () => {
    loginWithPreset()
    mainTablePage.mainTable.addGene.click()
    mainTablePage.mainTable.searchFilter.type('JAG1')
    cy.waitUntil(() =>
      mainTablePage.mainTable.checkboxListElement.element.then(el => {
        return el.text() === 'JAG1'
      }),
    )
    mainTablePage.mainTable.geneCheckbox.check()
    mainTablePage.mainTable.applyButton.click()
    mainTablePage.mainTable.numVariants.haveText('Variants: 1')
    mainTablePage.mainTable.tableRow.getButtonByText('p.Y255=').click()
    variantDrawerPage.variantDrawer.addTag.eq(1).click()
    cy.waitUntil(() =>
      variantDrawerPage.variantDrawer.tagCheckbox.element.then(
        () => Cypress.$(CommonSelectors.tagNameInDrawer).length,
      ),
    )
    variantDrawerPage.variantDrawer.tagInput.type(benign)
    variantDrawerPage.variantDrawer.addCustomTag.forceClick()
    cy.intercept('POST', ApiEndpoints.wsTags).as('addTags')
    variantDrawerPage.variantDrawer.saveTags.forceClick()
    cy.wait('@addTags').its('response.statusCode').should('eq', 200)
    variantDrawerPage.variantDrawer.addedTag.contains(benign)
  })

  it('should add note to the variant | test #15/2', () => {
    loginWithPreset()
    mainTablePage.mainTable.addGene.click()
    mainTablePage.mainTable.searchFilter.type('JAG1')
    cy.waitUntil(() =>
      mainTablePage.mainTable.checkboxListElement.element.then(el => {
        return el.text() === 'JAG1'
      }),
    )
    mainTablePage.mainTable.geneCheckbox.check()
    mainTablePage.mainTable.applyButton.click()
    mainTablePage.mainTable.numVariants.haveText('Variants: 1')
    mainTablePage.mainTable.tableRow.getButtonByText('p.Y255=').click()
    variantDrawerPage.variantDrawer.addNote.click()
    variantDrawerPage.variantDrawer.fillSpace.type(
      'MS, 11/10/21: it is possibly de-novo',
    )
    cy.intercept('POST', `${ApiEndpoints.wsTags}?ds=${autoDataset}&rec=**`).as(
      'addNote',
    )
    variantDrawerPage.variantDrawer.saveNote.forceClick()
    cy.wait('@addNote').its('response.statusCode').should('eq', 200)
    variantDrawerPage.variantDrawer.addNote.getChildren('svg')
  })

  it('should add tag to the main table | test #16', () => {
    loginWithPreset()
    mainTablePage.mainTable.addTag.first().click()
    mainTablePage.mainTable.searchFilter.type('Benign/Likely benign')
    mainTablePage.mainTable.checkbox.variantMainTableCheckbox(
      'Benign/Likely benign',
    )
    cy.intercept('POST', ApiEndpoints.wsList).as('addTag')
    mainTablePage.mainTable.applyButton.forceClick()
    cy.wait('@addTag').its('response.statusCode').should('eq', 200)
    mainTablePage.mainTable.tableRow.element
      .its('length')
      .should('be.not.gt', 7)
  })

  it('should save Excel file | test #17', () => {
    mainTablePage.visit(`/ws?ds=${autoDataset}`)
    mainTablePage.mainTable.selectPreset.click()
    cy.intercept('POST', ApiEndpoints.tabReport).as('loadPreset')
    mainTablePage.mainTable.preset
      .getButtonByText('⏚SEQaBOO_Hearing_Quick')
      .click()
    cy.wait('@loadPreset')
    cy.intercept('GET', `${ApiEndpoints.excel}/${autoDataset}_**.xlsx`).as(
      'reportDownload',
    )
    mainTablePage.mainTable.exportReport.click()
    mainTablePage.mainTable.exportExcel.click()
    cy.wait('@reportDownload')
    cy.readFile(`./cypress/downloads/${autoDataset}.xlsx`).should('exist')
  })

  function loginWithPreset() {
    mainTablePage.visit(`/ws?ds=${autoDataset}`)
    cy.intercept('POST', ApiEndpoints.wsList).as('wsList')
    cy.intercept('POST', ApiEndpoints.tabReport).as('tabReport')
    cy.wait('@wsList')

    mainTablePage.mainTable.selectPreset.click()
    mainTablePage.mainTable.selectPreset.contains(presetName).click()
    cy.wait('@tabReport')
    mainTablePage.mainTable.numVariants.haveText(variants2)
  }
})
