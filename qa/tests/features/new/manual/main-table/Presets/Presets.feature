@regression
Feature: Main table, Presets
  As the Anfisa user I want to apply presets to the variants list on the Main Table page

	Scenario: 01 List of presets

		Given Main Table for the "PGP3140_wgs_panel_hl" dataset was opened
		When  User clicks "Select Filter Preset" drop down menu
		Then The list of presets should be displayed

	Scenario: 02 Apply a preset

		Given The list of presets was displayed
		When User clicks "@SEQaBOO_Hearing_Loss_v_5" preset
		Then Preset should be applied

	Scenario: 03 Apply the same preset

		Given "@SEQaBOO_Hearing_Loss_v_5" preset was applied
		When user clicks "Select Filter Preset" drop down menu
		And Clicks the "@SEQaBOO_Hearing_Loss_v_5" preset again
		Then Preset should stay applied
		
	Scenario: 04 Apply another preset

		Given "@SEQaBOO_Hearing_Loss_v_5" preset was applied
		When User clicks "Select Filter Preset" drop down menu
		And User Clicks "@BGM_Autosomal_Dominant" preset
		Then Preset should be applied


	Scenario: 05 No data

		Given Preset drop-down menu was opened
		When User clicks "@BGM_Compound_Het" preset
		Then Empty variants list should be displayed
		And the "There are no results. Try to reset filters And try again" message should be displayed
		And the "Reset filters" button should be presented

	Scenario: 06 Reset filters

		Given "@BGM_Compound_Het" preset was applied
		And "Reset filters" button was presented
		When User clicks "Reset filters" button
		Then Filters should be reseted
		And Whole amount of variant number should be shown