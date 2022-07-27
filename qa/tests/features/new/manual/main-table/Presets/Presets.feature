Feature: Main table, Presets
  As the Anfisa user I want to apply presets to the variants list on the Main Table page

Background: 
	Given Main table of "PGP3140_wgs_panel_hl" dataset was opened

Scenario: 01 List of presets

	When  User clicks "Select Filter Preset" drop down menu
	Then The list of presets should be displayed

@regression
@smoke
Scenario: 02 Apply a preset

	Given Presets drop-down menu was opened
	When User clicks "@SEQaBOO_Hearing_Loss_v_5" preset
	Then Preset name should be written instead of "Select Filter Preset"
	And Number of displayed variants in table should be changed to 22
	And Number of variants/transcripts in top right corner changes to 22/211

Scenario: 03 Apply the same preset

	Given "@SEQaBOO_Hearing_Loss_v_5" preset was applied
	When User clicks "Select Filter Preset" drop down menu
	And Clicks the "@SEQaBOO_Hearing_Loss_v_5" preset again
	Then Preset should stay applied

@regression		
Scenario: 04 Apply another preset

	Given "@SEQaBOO_Hearing_Loss_v_5" preset was applied
	When User clicks "Select Filter Preset" drop down menu
	And User Clicks "@BGM_Autosomal_Dominant" preset
	Then Preset should be applied


@regression
Scenario: 05 No data

	When User clicks "Select Filter Preset" drop down menu
	And Clicks "@BGM_Compound_Het" preset
	Then Empty variants list should be displayed
	And "There are no results. Try to reset filters And try again" message should be displayed
	And "Reset filters" button should be presented

@regression
Scenario: 06 Reset filters

	Given "@BGM_Compound_Het" preset was applied
	And "Reset filters" button was presented
	When User clicks "Reset filters" button
	Then Filters should be reseted
	And Whole amount of variant number for the dataset should be shown