@regression
Feature: Main table, Filters
  As the Anfisa user I want to apply filters to the variants list on the Main Table page

Background: 
	Given Main table of "PGP3140_wgs_panel_hl" dataset was opened

@tc:114109
Scenario: 01 Open the "Filter Refiner" from the "Main Table" 

	When  User clicks "Edit Filters" button
	Then Filter Refiner should be opened.
		
@tc:114110
Scenario: 02 Apply filter

	Given "Filter Refiner" was opened from the "Main Table"
	When  User chooses "Callers" filter
	And Chooses "INHERITED_FROM: Father" value
	And Clicks "Add condition" button
	And clicks "View variants" button
	And Clicks "OK" on data saving message
	Then Main table should be opened
	And Variants should be filtered
		
@tc:114111
Scenario: 03 Apply few filters

	Given "Filter Refiner" was opened from the "Main Table"
	When User clicks "Callers" filter
	And Chooses "INHERITED_FROM: Father" value
	And Clicks "Add condition" button
	And Clicks the "Variant_Class" filter
	And Chooses the "deletion" value
	And Clicks "Add condition" button
	And clicks "View variants" button
	And Clicks "OK" on data saving message
	Then Main table should be opened
	And Variants should be filtered by chosen filters

@tc:114112
Scenario: 04 Close Filter Refiner without applying

	Given "Filter Refiner" was opened from the "Main Table"
	And Filters were added in filter refiner
	When  User clicks the Close button "X"
	And Clicks "OK" on data saving message
	Then Main table should be opened
	And Chosen filters should not be applied
