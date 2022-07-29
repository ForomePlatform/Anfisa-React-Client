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
	And Clicks "Apply" button
	Then Sections layout should be changed to list

@regression
Scenario Outline: 03 Save sections preset with valid "<Name_Preset>"

	When User expands one of the sections using a down-arrow button at the end of the section header
	And Clicks "Save preset"
	And Writes "<Name_Preset>" for preset
	And Clicks "Save" button
	Then Message about section preset saving should be shown
	And It should be shown in the list drop-down menu

Examples: 
	| Name_Preset |
	| !Forome     |
	| 12332       |
	| Anfisa      |

@regression
Scenario Outline: 04 Try to save section preset with invalid "<Invalid_Preset_Name>"

	When User expands one of the sections using a down-arrow button at the end of the section header
	And Clicks "Save preset"
	And Writes "<Invalid_Preset_Name>" 
	Then Save button should be disabled
	And Validation message should be shown

Examples: 
	| Invalid_Preset_Name  |
	| 21_random_characters | #type 21 random symbols here
	| Already_existed_name | #type already existed preset name

@regression
Scenario: 05 Open Saved section preset

	Given Section preset was saved
	When User clicks down-arrow sign near the "X" button
	And User clicks saved preset
	And Clicks "Apply" button
	Then Preset should be loaded
	And Saved section should be opened again

@regression
Scenario: 06 Delete saved section preset

	Given Section preset was saved
	When User clicks down-arrow sign near the "X" button
	And Clicks three dots button at the end of preset
	And Clicks "Delete" button
	Then Message about preset deletion should be shown
	And Preset should not be in the list anymore

@regression
Scenario: 07 Modify section preset

	Given Section preset was saved
	When User clicks down-arrow sign near the "X" button
	And Clicks one of the preset
	And Clicks "Apply" button
	And Makes any changes in section layout
	And Clicks down-arrow sign near the "X" button again
	And Clicks three dots button for the same preset
	And Clicks "Modify" button
	Then Message about preset modifying should be shown