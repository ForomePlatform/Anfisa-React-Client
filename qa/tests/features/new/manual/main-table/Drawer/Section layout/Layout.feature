Feature: Main table, Drawer, Section layout
As the Anfisa user I want to see details of a variant

Background: 
	Given Main Table for "PGP3140_wgs_panel_hl" dataset was opened
	And Variant drawer for the first variant was opened

@regression
Scenario: 01 Change Sections layout

	When User clicks square-shaped sign near "X" button
	Then Sections layout should be changed

@regression
Scenario: 02 Change section layout to list-form again

	Given Sections layout was changed from list-form to expanded view
	When User clicks down-arrow sign near the "X" button
	And Drop down menu is open
	And User clicks "List" 
	Then Sections layout should be changed to list

@regression
Scenario: 03 Save sections preset

	When User expands one of the sections using a down-arrow button at the end of the section header
	And Clicks "Save preset"
	And Writes name for preset
	And Clicks "Save" button
	Then Section preset should be saved
	And It should be shown in the list drop-down menu

@regression
Scenario: 04 Open Saved section preset

	Given Section preset was saved
	When User clicks down-arrow sign near the "X" button
	And User clicks saved preset
	Then Preset should be loaded
	And Saved section should be opened again