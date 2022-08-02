@regression
Feature: Main table, Apply filter and cross pages

@tc:113857
Scenario: 01 Save a new dataset with applied filters

	Given Main table of "PGP3140_wgs_panel_hl" dataset was opened
	And "@SEQaBOO_Hearing_Loss_v_5" preset was applied
	When User clicks "Edit filters" button
	And Clicks "Callers" attribute
	And Chooses "BGM_CMPD_HET" value
	And Clicks "+Add Attribute" button
	And Clicks "View variants" button
	And Clicks "OK" on data saving message 
	And Main table is opened
	And User clicks "Create Derive DS"
	And Writes valid name for the dataset
	And Clicks "Add dataset"
	Then Dataset should be saved
