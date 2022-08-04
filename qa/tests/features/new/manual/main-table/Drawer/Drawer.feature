Feature: Main table, Drawer
As the Anfisa user I want to see details of a variant

Background: 
	Given Main Table for "PGP3140_wgs_panel_hl" dataset was opened
	And Variant drawer for the first variant was opened

@smoke
@regression
@tc:114113
Scenario: 01 Add already existing tag

	When User clicks "+ Add" button near Tags
	And Checks one of the already existing tags
	And Clicks "Save tags" button
	Then Chosen tag should be added
	And Added tag should be shown near "Tags"
	
@tc:114114
Scenario: 02 Cancel tag's adding

	When User Clicks "+Add" button near "Tags"
	And Checks one of the already existing tags
	And Clicks the "Cancel" button
	Then Adding dialog should be closed
	And Tag should not be added

@smoke
@regression
@tc:114115
Scenario Outline:03 Add custom tag with valid "<Name_one>"

	When User Clicks "+Add" button near "Tags"
	And Types valid "<Name_one>" for the custom tag
	And Clicks "Add custom tag" button
	And Clicks "Save tags" button
	Then Custom tag should be added

Examples: 
	| Name_one  |
	| Forome    |
	| Forome123 |
	| For ome   |

@regression
@tc:114116
Scenario Outline:04 Custom tag with invalid "<Name_tag>"

	When User Clicks "+Add" button near "Tags"
	And Types invalid "<Name_tag>" 
	Then "Add custom tag" button should be disabled
	And Validation message should be shown

Examples: 
	| Name_tag             |
	| 31_random_characters | #type 31 random symbols here
	| @forome              |


@regression
@tc:114117
Scenario: 05 Delete custom tag

	Given Custom tag was added to the first variant only
	When User clicks "+ Add" button near tags
	And Unchecks a custom tag
	And Clicks "Save tags" button
	Then Tag should not be shown near "Tags"
	And Custom tag should be deleted from tag list also

@tc:114118
Scenario:06 Cancel custom tag

	Given Tag adding dialog was opened 
	When Types valid name for the custom tag
	And Clicks "Add custom tag" button
	And Clicks "Cancel" button
	Then Custom tag should not be added

@smoke
@regression
@tc:114119
Scenario: 07 Save note

	When User clicks "+ Add" button near "Notes"
	And Types the note
	And Clicks "Save note"
	Then The note should be saved
	And Near "Notes" should appear document sign instead of "+ Add" button

@regression
@tc:114120
Scenario: 08 View saved note

	Given Note was saved
	When User clicks document sign near "Notes"
	Then Saved note should be shown

@regression	
@tc:114121
Scenario: 09 Delete note

	Given Note was saved
	When User clicks the document sign near notes
	And Already saved note is shown
	And Clicks "Delete" button
	Then The note should be deleted
	And "+ Add" button should be shown near "Notes" instead of document sign

@regression
@tc:114122
Scenario Outline: 10 Search with valid "<Parameter_Name>" in variant drawer

	When User writes "<Parameter_Name>" in the variant drawer search field
	Then Searched parameter should be highlighted in yellow

Examples: 
	| Parameter_Name |
	| Gene           |
	| GENE           |
	| worst anno     |
	| Canon          |

@regression
Scenario Outline: 11 Search with invalid "<Invalid_Name>" in variant drawer

	When User writes "<Invalid_Name>" in the variant drawer search field
	Then All section should stay closed
	And Nothing should be found

Examples: 
	| Invalid_Name |
	| Genne        |
	| Cannonical   |
	| @asdd        |
	| 123          |

@regression
Scenario: 12 Delete searched parameter in variant drawer

	Given Parameter was searched in variant drawer 
	When User clicks "X" button at the end of search field
	Then Written parameter should be deleted


@regression
@tc:114123
Scenario: 11 Open Gnomad URL

	When User expands "GNOMAD" section using a button at the end of the section header
	And Clicks the value of the URL parameter
	Then https://gnomad.broadinstitute.org/ should be opened for the selected variant

@regression
@tc:114124
Scenario: 12 Expand all sections

	When  User clicks the "Expand" button (four side-directed arrows) 
	Then All sections should be expanded

@regression
@tc:114125
Scenario: 13 Collapse all sections

	Given All sections were expanded
	When User clicks the "Collapse" button (Four inside-directed arrows) 
	Then Expanded sections should be collapsed

@regression
@tc:114126
Scenario: 14 Replace a section

	When User drag-and-drops a section by clicking the section
	And Moves the section to another place
	Then Section place should be changed

@regression
@tc:114127
Scenario: 15 Change section size

	When User drags the button at the right bottom corner of the section
	And Moves the cursor to the left
	Then Section size should be changed

@regression
@tc:114128
Scenario: 16 Change variant drawers with Up-down arrows

	When User clicks Up/down arrow near the variant name
	Then User should be able to change variant drawers

@regression
@tc:114129
Scenario: 17 Close variant drawer

	When User clicks "X" button at the end of header
	Then Variant drawer should be closed
	And Expanded main table view should be shown
