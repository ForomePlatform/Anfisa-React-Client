@regression
Feature: Filter Refiner, View

Background: 
	Given user opens the "Filter Refiner" for the "xl_PGP3140_wgs_NIST-4_2" dataset

Scenario: 01 Select Secondary dataset
	When user clicks the "Select Secondary" drop-down
	And selects dataset
	Then selected dataset should be displayed

Scenario: 02 Copy link
	When user clicks the chain icon near "Select Secondary" drop-down
	Then the link should be copied
	And validation message should appear

Scenario: 03 Collapse all
	When user clicks the Collapse all button
	Then all filters should be collapsed

Scenario: 04 Expand all
	Given the filters were collapsed
	When user clicks the Expand all button
	Then all filters should be Expanded

@smoke
Scenario: 06 Export Excel
	Given an attribute with less then 300 variants was added
	When user clicks the "Export Report" drop-down
	And selects the "Excel" option
	Then the dataset should be exported with less then 300 variants

@smoke
Scenario: 07 Export CSV
	Given an attribute with less then 300 variants was added
	When user clicks the "Export Report" drop-down
	And selects the "CSV" option
	Then the dataset should be exported with less then 300 variants

Scenario: 08 Excel: Too many variants to export
	Given an attribute with more then 300 variants was added
	When user clicks the "Export Report" drop-down
	And selects the "Excel" option
	Then Excel should not be exported
	And "There are too many variants to export. The number of variants should be less than 300" error message should be displayed

Scenario: 09 CSV: Too many variants to export
	Given an attribute with more then 300 variants was added
	When user clicks the "Export Report" drop-down
	And selects the "CSV" option
	Then CSV should not be exported
	And "There are too many variants to export. The number of variants should be less than 300" error message should be displayed

Scenario: 10 undo button
	Given filters were added
	When user clicks the "undo" button
	Then the changes that were made before should be undone

Scenario: 11 redo button
	Given the changes were undone
	When user clicks the "redo" button
	Then the changes should be re-done