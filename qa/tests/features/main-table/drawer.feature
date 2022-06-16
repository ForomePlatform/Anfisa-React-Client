Feature: Main table, Drawer
  As the Anfisa user I want to see details of a variant
  
Scenario: 01 Open URL
	Given the "Main table" for the "PGP3140_wgs_panel_hl" dataset was opened
	When user clicks one of the variants
	And the Drawer is open
	And user expands the "GNOMAD" section using a button at the end of the section header
	And clicks the value of the URL parameter
	Then https://gnomad.broadinstitute.org/ should be open for the selected variant
​
Scenario: 02 Add already existing tag
	Given the "Main table" for the "PGP3140_wgs_panel_hl" dataset was opened
	When user clicks one of the variants
	And the Drawer is open
	And user clicks "+ Add" button near Tags
	And chooses one of the already existing tags
	And clicks the "Save tags" button
	Then chosen tag should be added
​
Scenario: 03 Cancel tag's adding
	Given the "Main table" for the "PGP3140_wgs_panel_hl" dataset was opened
	When user clicks one of the variants
	And the Drawer is open
	And user clicks "+ Add" button near Tags
	And chooses one of the already existing tags
	And clicks the "Cancel" button
	Then adding should be canceled
​
Scenario: 04 Add custom tag
	Given the "Main table" for the "PGP3140_wgs_panel_hl" dataset was opened
	When user clicks one of the variants
	And the Drawer is open
	And user clicks "+ Add" button near Tags
	And types the valid name for the custom tag (e.g., "Custom Tag, date: <MMDDYYYY>")
	And clicks the "Add custom tag" button
	And clicks the "Save tags" button
	Then Custom tag should be added
​
Scenario: 05 Cancel custom tag
	Given the "Main table" for the "PGP3140_wgs_panel_hl" dataset was opened
	When user clicks one of the variants
	And the Drawer is open
	And user clicks "+ Add" button near Tags
	And types the valid name for the custom tag (e.g., "Custom Tag, date: <MMDDYYYY>")
	And clicks the "Add custom tag" button
	And clicks the "Cancel" button
	Then Custom tag should not be added
​
Scenario: 06 Custom tag is too long
	Given the "Main table" for the "PGP3140_wgs_panel_hl" dataset was opened
	When user clicks one of the variants
	And the Drawer is open
	And user clicks "+ Add" button near Tags
	And types name of the custom tag with length > 30 characters
	Then the "Add custom tag" button should be disabled
	And nothing should happen if user tries to click it
​
Scenario: 07 Save note
	Given the "Main table" for the "PGP3140_wgs_panel_hl" dataset was opened
	When user clicks one of the variants
	And the Drawer is open
	And user clicks the "+ Add" button near Notes
	And types the note
	And clicks "Save note"
	Then the note should be saved
​
Scenario: 08 Delete note
	Given the "Main table" for the "PGP3140_wgs_panel_hl" dataset was opened
	When user clicks one of the variants with a note
	And the Drawer is open
	And user clicks the button neat notes
	And already saved note is shown
	And clicks "Delete" button
	Then the note should be deleted
​
Scenario: 09 "Save note" without any changes
	Given the "Main table" for the "PGP3140_wgs_panel_hl" dataset was opened
	When user clicks one of the variants with a note
	And the Drawer is open
	And user clicks the button neat notes
	And already saved note is shown
	And clicks "Save note" without any changes
	Then the Note dialog should be closed without any changes

Scenario: 10 Expand all sections
	Given the "Main table" for the "PGP3140_wgs_panel_hl" dataset was opened
	When user clicks one of the variants
	And the Drawer is open
	And user clicks the Expand button
	Then All sections should be expanded
	
Scenario: 11 Collapse all sections
	Given the "Main table" for the "PGP3140_wgs_panel_hl" dataset was opened
	And the Drawer was opened
	And all sections were expanded
	When user clicks the Collapse button
	Then expanded sections should be collapsed

Scenario: 12 Replace a section
	Given the "Main table" for the "PGP3140_wgs_panel_hl" dataset was opened
	When user clicks one of the variants
	And the Drawer is open
	And user drag'n'drops a section by clicking the section
	And moves the section to another place
	Then section place should be changed

Scenario: 13 Change section size
	Given the "Main table" for the "PGP3140_wgs_panel_hl" dataset was opened
	When user clicks one of the variants
	And the Drawer is open
	And user drags the button at the right bottom corner of the section
	Then section size should be changed
