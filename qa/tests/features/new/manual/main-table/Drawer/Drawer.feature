@regression
Feature: Main table, Drawer
  As the Anfisa user I want to see details of a variant


  Scenario: 01 Open variant drawer

	Given Anfisa main page was opened
	When User clicks "PGP3140_wgs_panel_hl" dataset
	And Clicks "Open" drop down menu
	And Clicks "Main table" on drop down menu
	Then Main table should be opened
	And Variant drawer of first variant should be opened

	Scenario: 02 Add already existing tag

	Given Variant drawer was opened 
	When User clicks "+ Add" button near Tags
	And Checks one of the already existing tags
	And Clicks "Save tags" button
	Then Chosen tag should be added
	
Scenario: 03 Cancel tag's adding

	Given Tag adding dialog was opened 
	When Checks one of the already existing tags
	And clicks the "Cancel" button
	Then Adding should be canceled

Scenario: 04 Add custom tag

	Given Tag adding dialog was opened 
	When Types valid name for the custom tag (e.g., "Custom Tag, date: <MMDDYYYY>")
	And Clicks "Add custom tag" button
	And Clicks "Save tags" button
	Then Custom tag should be added

Scenario: 05 Delete custom tag

	Given Custom tag was added to the variant
	When User clicks "+ Add" button near tags
	And Unchecks a custom tag
	And Clicks "Save tags" button
	Then Custom tag should be deleted

Scenario: 06 Cancel custom tag

	Given Tag adding dialog was opened 
	When Types valid name for the custom tag (e.g., "Custom Tag, date: <MMDDYYYY>")
	And Clicks "Add custom tag" button
	And Clicks "Cancel" button
	Then Custom tag should not be added

Scenario: 07 Custom tag is too long

	Given Tag adding dialog was opened 
	When Types name of the custom tag with length > 30 characters
	Then "Add custom tag" button should be disabled
	And Validation message should be shown

Scenario: 08 Save note

	Given Variant drawer was opened 
	When User clicks "+ Add" button near Notes
	And Types the note
	And Clicks "Save note"
	Then The note should be saved
	
Scenario: 09 Delete note

	Given Note was saved
	When User clicks the button near notes
	And Already saved note is shown
	And Clicks "Delete" button
	Then The note should be deleted

Scenario: 10 Open Gnomad URL

	Given Variant drawer was opened 
	When User expands "GNOMAD" section using a button at the end of the section header
	And Clicks the value of the URL parameter
	Then https://gnomad.broadinstitute.org/ should be opened for the selected variant

Scenario: 11 Expand all sections

	Given Variant drawer was opened 
	When  User clicks the Expand button (four side-directed arrows) 
	Then All sections should be expanded

Scenario: 12 Collapse all sections

	Given All sections were expanded
	When User clicks the Collapse button (Four inside-directed arrows) 
	Then Expanded sections should be collapsed

Scenario: 13 Replace a section

	Given Variant drawer was opened 
	When User drag-and-drops a section by clicking the section
	And Moves the section to another place
	Then Section place should be changed

Scenario: 14 Change section size

	Given Variant drawer was opened 
	When User drags the button at the right bottom corner of the section
	And Moves the cursor to the left
	Then Section size should be changed

Scenario: 15 Change variant drawers with Up-down arrows

    Given Variant drawer was opened 
	When User clicks Up/down arrow near the variant name
	Then User should be able to change variant drawers

Scenario: 16 Change Sections layout

    Given Variant drawer was opened
	When User clicks square-shaped sign near "X" button
	Then Sections layout should be changed

Scenario: 17 Change section layout to list again

    Given Sections layout was changed
	When User clicks down-arrow sign near the "X" button
	And Drop down menu is open
	And User clicks "List" 
	Then Sections layout should be changed to list

Scenario: 18 Save sections preset

    Given Variant drawer was opened
	When User expands one of the sections using a button at the end of the section header
	And Clicks "Save preset"
	And Writes valid name for preset
	And Clicks "Save" button
	Then Section preset should be saved

Scenario: 19 Open Saved section preset

    Given Section preset was saved
	And Variant drawer was opened
	When User clicks down-arrow sign near the "X" button
	And Drop down menu is open
	And User clicks saved preset
	Then Preset should be loaded
	And Saved section should be opened again

Scenario: 20 Open IGV

    Given Main table of "PGP3140_BGM_RedButton" dataset was opened
	And "PRAMEF7" variant drawer was opened
	When  Clicks "Open IGV" button at the end of "GENERAL" section
	Then IGV should be opened in a new tab

Scenario: 21 The "Open IGV" button is not present for variant without IGV

	Given Main Table of "PGP3140_wgs_panel_hl" dataset was opened
	And "ESPN,HES2" variant drawer was opened
	When  User looks at the header of the "General" section
	Then "Open IGV" button should not be present

Scenario: 22 Close variant drawer

    Given Variant drawer was opened
	When User clicks "X" button
	Then Variant drawer should be closed