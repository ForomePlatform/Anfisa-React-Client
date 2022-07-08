@regression
Feature: Main table, Filters
  As the Anfisa user I want to apply filters to the variants list on the Main Table page
  
	Scenario: 01 Open the "Filter Refiner" from the "Main Table" 

		Given Main table for the "PGP3140_wgs_panel_hl" dataset was opened
		When  User clicks "Edit Filters" button
		Then Filter Refiner should be opened.
		
	Scenario: 02 Apply filter

		Given "Filter Refiner" was opened from the "Main Table"
		When  User chooses "Callers" filter
		And Chooses "INHERITED_FROM: Father" value
		And Clicks "+ Add Attribute" button
		And clicks "View variants" button
		And Clicks "OK" on data saving message
		Then Main table should be opened
		And Variants should be filtered
		
	Scenario: 03 Apply a few filters

		Given "Filter Refiner" was opened from the "Main Table"
		When User clicks "Callers" filter
		And Chooses "INHERITED_FROM: Father" value
		And Clicks "+ Add Attribute" button
		And Clicks the "Variant_Class" filter
		And Chooses the "deletion" value
		And Clicks "+ Add Attribute" button
		And clicks "View variants" button
		And Clicks "OK" on data saving message
		Then Main table should be opened
		And Variants should be filtered by chosen filters

	Scenario: 04 Close Filter Refiner without applying

		Given Filters were added in filter refiner
		When  User clicks the Close button "X"
		And Clicks "OK" on data saving message
		Then Main table should be opened
		And Chosen filters should not be applied