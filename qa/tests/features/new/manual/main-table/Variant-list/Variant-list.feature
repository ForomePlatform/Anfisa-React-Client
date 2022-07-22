@regression
Feature: Main table, variants list
  As the Anfisa user I want to see variants list on the Main Table page

Scenario: 01 Choose secondary dataset with drop down menu

	Given "Main table" for the "PGP3140_wgs_panel_hl" dataset was opened
	When User clicks "Select secondary..." drop-down menu
	And List of secondary datasets of the "PGP3140_wgs_panel_hl" dataset is displayed
	And User clicks any of secondary dataset
	Then Main Table page should be updated for the selected secondary dataset
	And Variants should be filtered according to secondary dataset
	
Scenario: 02 Change secondary dataset with drop down menu

	Given "Main table" for the secondary dataset was opened
	When User clicks the dataset name in the drop-down
	And List of secondary datasets of the "PGP3140_wgs_panel_hl" dataset is displayed
	And User clicks other secondary dataset
	Then Main Table page should be updated for the selected dataset

Scenario: 03 Copy URL

	Given "Main table" for the secondary dataset was opened
	When user clicks the chain icon near the dataset name
	Then URL should be copied