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

Scenario: 05 Delete custom tag
	Given the "Main table" for the "PGP3140_wgs_panel_hl" dataset was opened
	And the Drawer was opened 
	And custom tag was added to a variant
	When user clicks "+ Add" button near tags
	And unchecks a custom tag
	And clicks "Save tags" button
	Then "Tags" dialog should be closed 
	And custom tag should be deleted
​
Scenario: 06 Cancel custom tag
	Given the "Main table" for the "PGP3140_wgs_panel_hl" dataset was opened
	When user clicks one of the variants
	And the Drawer is open
	And user clicks "+ Add" button near Tags
	And types the valid name for the custom tag (e.g., "Custom Tag, date: <MMDDYYYY>")
	And clicks the "Add custom tag" button
	And clicks the "Cancel" button
	Then Custom tag should not be added
​
Scenario: 07 Custom tag is too long
	Given the "Main table" for the "PGP3140_wgs_panel_hl" dataset was opened
	When user clicks one of the variants
	And the Drawer is open
	And user clicks "+ Add" button near Tags
	And types name of the custom tag with length > 30 characters
	Then the "Add custom tag" button should be disabled
	And nothing should happen if user tries to click it
​
Scenario: 08 Save note
	Given the "Main table" for the "PGP3140_wgs_panel_hl" dataset was opened
	When user clicks one of the variants
	And the Drawer is open
	And user clicks the "+ Add" button near Notes
	And types the note
	And clicks "Save note"
	Then the note should be saved
​
Scenario: 09 Delete note
	Given the "Main table" for the "PGP3140_wgs_panel_hl" dataset was opened
	When user clicks one of the variants with a note
	And the Drawer is open
	And user clicks the button neat notes
	And already saved note is shown
	And clicks "Delete" button
	Then the note should be deleted
​
Scenario: 10 "Save note" without any changes
	Given the "Main table" for the "PGP3140_wgs_panel_hl" dataset was opened
	When user clicks one of the variants with a note
	And the Drawer is open
	And user clicks the button neat notes
	And already saved note is shown
	And clicks "Save note" without any changes
	Then the Note dialog should be closed without any changes

Scenario: 11 Expand all sections
	Given the "Main table" for the "PGP3140_wgs_panel_hl" dataset was opened
	When user clicks one of the variants
	And the Drawer is open
	And user clicks the Expand button
	Then All sections should be expanded
	
Scenario: 12 Collapse all sections
	Given the "Main table" for the "PGP3140_wgs_panel_hl" dataset was opened
	And the Drawer was opened
	And all sections were expanded
	When user clicks the Collapse button
	Then expanded sections should be collapsed

Scenario: 13 Replace a section
	Given the "Main table" for the "PGP3140_wgs_panel_hl" dataset was opened
	When user clicks one of the variants
	And the Drawer is open
	And user drag'n'drops a section by clicking the section
	And moves the section to another place
	Then section place should be changed

Scenario: 14 Change section size
	Given the "Main table" for the "PGP3140_wgs_panel_hl" dataset was opened
	When user clicks one of the variants
	And the Drawer is open
	And user drags the button at the right bottom corner of the section
	Then section size should be changed
