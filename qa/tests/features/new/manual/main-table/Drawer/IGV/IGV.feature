@regression
Feature: Main table, Drawer, IGV
As the Anfisa user I want to see Variants IGV

@tc:114151
Scenario Outline: 01 Open IGV in a new tab for "<dataset_list>"

	Given Main table of any derived dataset of "<dataset_list>" parent dataset was opened
	And Variant drawer for the first variant was opened
	When  Clicks "Open IGV" button at the end of "GENERAL" section
	And User clicks "Open in a new tab" button
	Then New tab should be opened
	And IGV should be shown in new tab

Examples: 
	| dataset_list            |
	| PGP3140_wgs_panel_hl    |
	| xl_PGP3140_wgs_panel_hl |
	| xl_PGP3140_wgs_NIST-4_2 |

Scenario: 02 Open IGV in a modal window

	Given Main table of "PGP3140_wgs_panel_hl" dataset was opened
	And Variant drawer for the first variant was opened
	When  Clicks "Open IGV" button at the end of "GENERAL" section
	And User clicks "Open in a modal window" button
	Then Modal window should be opened locally on anfisa page
	And IGV should be shown

@tc:114152
Scenario Outline: 03 The "Open IGV" button is not present for "<parent_dataset>"

	Given Main table of any derived dataset of "<parent_dataset>" parent dataset was opened
	And Variant drawer was opened
	When  User looks at the header of the "General" section
	Then "Open IGV" button should not be presented

Examples: 
	| parent_dataset            |
	| xl_NA12878_wgs            |
	| xl_PGP3140_wgs_NIST-3_3_2 |
	| xl_PF0003_wes             |

