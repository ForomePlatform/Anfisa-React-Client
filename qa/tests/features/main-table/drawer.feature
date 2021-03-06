Feature: Main table, Drawer
  As the Anfisa user I want to see details of a variant
  
	Scenario: Open URL
		Given "Main table" for the "PGP3140_wgs_panel_hl" dataset is open
		When User clicks one of the variants
		and Drawer is open
		and user finds the "GNOMAD" section
		and clicks the value of the URL parameter
		Then https://gnomad.broadinstitute.org/ should be open for the selected variant.
​
	Scenario: Add already existed tag
		Given "Main table" for the "PGP3140_wgs_panel_hl" dataset is open
		When User clicks one of the variants
		and Drawer is open
		and user clicks "+ Add" near Tags
		and chooses one of the already existing tags
		and clicks the "Save tags" button
		Then chosen tag should be added
​
	Scenario: Cancel tag's adding
		Given "Main table" for the "PGP3140_wgs_panel_hl" dataset is open
		When User clicks one of the variants
		and Drawer is open
		and clicks "+ Add" near Tags
		and chooses one of the already existing tags
		and clicks the "Cancel" button
		Then adding should be canceled
​
	Scenario: Add custom tag
		Given "Main table" for the "PGP3140_wgs_panel_hl" dataset is open
		When User clicks one of the variants
		and Drawer is open
		and clicks "+ Add" near Tags
		and types the valid name of the custom tag (e.g., "Custom Tag, date: <MMDDYYYY>"
		and clicks the "Add custom tag" button
		and clicks the "Save tags" button
		Then Custom tag should be added.
​
	Scenario: Cancel custom tag
		Given "Main table" for the "PGP3140_wgs_panel_hl" dataset is open
		When User clicks one of the variants
		and Drawer is open
		and clicks "+ Add" near Tags
		and types the valid name of the custom tag (e.g., "Custom Tag, date: <MMDDYYYY>"
		and clicks the "Add custom tag" button
		and clicks the "Cancel" button
		Then Custom tag should not be added.
​
	Scenario: Too long custom tag
		Given "Main table" for the "PGP3140_wgs_panel_hl" dataset is open
		When User clicks one of the variants
		and Drawer is open
		and clicks "+ Add" near Tags
		and types name of the custom tag with length>30 chars
		Then the "Add custom tag" button should be disabled
		and nothing should happen if the user tries to click it.
​
	Scenario: Save note
		Given "Main table" for the "PGP3140_wgs_panel_hl" dataset is open
		When User clicks one of the variants
		and Drawer is open
		And clicks the "Notes" button
		And types the note
		And clicks "Save note"
		Then the note should be saved
​
	Scenario: Delete note
		Given "Main table" for the "PGP3140_wgs_panel_hl" dataset is open
		When User clicks one of the variants
		and Drawer is open
		And clicks the "Notes" button
		And already saved note is shown
		And clicks "Delete"
		Then the note should be deleted
​
	Scenario: "Save note" without any changes
		Given "Main table" for the "PGP3140_wgs_panel_hl" dataset is open
		When User clicks one of the variants
		and Drawer is open
		And clicks the "Notes" button
		And already saved note is shown
		And clicks "Save note" without any changes
		Then Note dialog should be closed without any changes.
​
	Scenario: Collapse all sections
		Given "Main table" for the "PGP3140_wgs_panel_hl" dataset is open
		When User clicks one of the variants
		and Drawer is open
		and user clicks Collapse button
		Then expanded sections should be collapsed
​
	Scenario: Expand all sections
		Given "Main table" for the "PGP3140_wgs_panel_hl" dataset is open
		When User clicks one of the variants
		and Drawer is open
		and user clicks Expand button
		Then All sections should be expanded
​
	Scenario: Replace a section
		Given "Main table" for the "PGP3140_wgs_panel_hl" dataset is open
		When User clicks one of the variants
		and Drawer is open
		and user drag'n'drops a section using the special button (right side of the section header)
		and moves the section to another place
		Then section place should be changed
​
	Scenario: Change section size
		Given "Main table" for the "PGP3140_wgs_panel_hl" dataset is open
		When User clicks one of the variants
		and Drawer is open
		and user changes the section button (right bottom corner of the section)
		Then section size should be changed