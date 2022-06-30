Feature: Main table, Presets
  As the Anfisa user I want to apply presets to the variants list on the Main Table page
​
	Scenario: 01 List of presets
		Given Main Table for the "PGP3140_wgs_panel_hl" dataset was opened
		When  user clicks "Select Filter Preset" drop down menu
		Then The list of presets should be displayed.
​
	Scenario: 02 Apply a preset
		Given Main Table for the "PGP3140_wgs_panel_hl" dataset was opened
		When user clicks "Select Filter Preset" drop down menu
		And user clicks the "@SEQaBOO_Hearing_Loss_v_5" preset
		Then the preset should be applied.
​
	Scenario: 03 Apply the same preset
		Given Main Table for the "PGP3140_wgs_panel_hl" dataset was opened
		And the "@SEQaBOO_Hearing_Loss_v_5" preset was applied
		When user clicks "Select Filter Preset" drop down menu
		And user clicks the "@SEQaBOO_Hearing_Loss_v_5" preset again
		Then the preset should stay applied
		
	Scenario: 04 Apply another preset
		Given Main Table for the "PGP3140_wgs_panel_hl" dataset was opened
		When user clicks "Select Filter Preset" drop down menu
		And user clicks the "@BGM_Autosomal_Dominant" preset
		Then the preset should be applied.
​
	Scenario: 05 No data
		Given Main Table for the "PGP3140_wgs_panel_hl" dataset was opened
		When user clicks "Select Filter Preset" drop down menu
		And user chooses the "@BGM_Compound_Het" preset
		Then Empty variants list should be displayed
		And the "There are no results. Try to reset filters And try again" message should be displayed
		And the "Reset filters" button should be present
​
	Scenario: 06 Reset filters
		Given Main Table for the "PGP3140_wgs_panel_hl" dataset was opened
		And the "@BGM_Compound_Het" preset was applied
		When clicks "Reset filters" button
		Then filters should be reseted
		And Total amount of numbers should be shown