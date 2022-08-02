@regression
Feature: Main table, Drawer, IGV
As the Anfisa user I want to see Variants IGV

@tc:113916
Scenario: 01 Open IGV

	Given Main table of "PGP3140_BGM_RedButton" dataset was opened
	And "PRAMEF7" variant drawer was opened
	When  Clicks "Open IGV" button at the end of "GENERAL" section
	Then IGV should be opened in a new tab

@tc:113917
Scenario: 02 The "Open IGV" button is not present for variant without IGV

	Given Main Table of "PGP3140_wgs_panel_hl" dataset was opened
	And "ESPN,HES2" variant drawer was opened
	When  User looks at the header of the "General" section
	Then "Open IGV" button should not be present
