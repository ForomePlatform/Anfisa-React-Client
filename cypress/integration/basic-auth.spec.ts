import { datasetPage } from "../page-objects/app/datasets-page";

describe("Basic browser auth", () => {

  it("should login into webApp", () => {
    datasetPage.visit();
    datasetPage.leftPanel.leftPanelHeader;
  });

  it("type in the input the name of a dataset", () => {
    datasetPage.visit();
    datasetPage.leftPanel.searchInput.type('xl_PGP3140_wgs_NIST-4_2');
  })
});