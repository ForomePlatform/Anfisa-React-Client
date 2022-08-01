Feature: Main Table
#    Main table should be opened

@tc:113161
Scenario: 01 Open Main Table (1)
	Given Anfisa main page was loaded
	When User clicks "PGP3140_wgs_panel_hl" dataset on the left panel
	And clicks "Open" drop-down
	And clicks "Main Table" in "Open" drop-down
	Then Main Table should be opened

@tc:113162
Scenario: 02 Apply preset and make sure list is not empty
	Given Main Table was opened
	When User clicks Preset drop-down
	And chooses proper present
	Then present is applied

@tc:113163
Scenario: 03 Chosen gene should be applied
	Given Main Table was opened
	When User chooses present with variants inside
	And Clicks "+ Add Gene" 
	And Chooses gene
	And Clicks "Apply" button
	Then Chosen gene should be applied

@tc:113164
Scenario: 04 Custom tag should be added to the variant
	Given Main Table was opened
	When User Clicks on Variant
	And Clicks on "+ Add" button near Tags in variants Table
	And Writes new Tag name in the field
	And Clicks "Add custom tag" button
	And Clicks "Save Tags" button
	Then The custom tag should be applied to the variant

@tc:113165
Scenario: 05 Note should be added to the variant
	Given Main Table was opened
	When User Clicks on Variant
	And Clicks on "+ Add" button near Notes in variants Table
	And Writes new note
	And Clicks on "Save note" button
	Then note should be added to variant

@tc:113166
Scenario: 06 Main Table should be filtered by custom tag
	Given Custom tag was created
	When User clicks "+ Add Tag"
	And Choses custom tag which is created
	And Clicks on "Apply" button
	Then Main table should be filtered by custom tag

@tc:113167
Scenario Outline: 07 <Middle> column should be turned off
	Given Main Table was opened
	When User clicks on "Customize Table" drop-down
	And toggles off "<Middle>" column
	And Clicks "Apply" button
	Then "<Middle>" column should be turned off

Examples:
	| <Middle>       |
	| Protein Change |
	| In-Silico      |

@tc:113168
Scenario Outline: 08 <Middle> column should be returned on its previous place
	Given Main Table was opened
	When User clicks on "Customize Table" drop-down
	And toggles on "<Middle>" column
	And Clicks "Apply" button
	Then "<Middle>" column should be turned on

Examples:
	| <Middle>       |
	| Protein Change |
	| In-Silico      |

@tc:113169
Scenario: 09 Main Table view should be changed to compact view
	Given Main Table was opened
	When Clicks on "Customize Table" drop-down
	And Choses "Compact view"
	And Clicks "Apply" button
	Then Main Table view should be changed to compact

@tc:113170
Scenario: 10 The report should be exported is excel format
	Given Main Table was opened
	When user clicks "Export Report" drop-down
	And clicks on "Excel"
	Then Excel file should be downloaded

@tc:113171
Scenario: 11 The report should be exported is CSV format
	Given Main Table was opened
	When user clicks "Export Report" drop-down
	And clicks on "CSV"
	Then CSV file should be downloaded
