@regression
@smoke
Feature: Filter Refiner Pagination

Scenario: 01 Select Secondary dataset
	Given the "Filter Refiner" for the "xl_PGP3140_wgs_NIST-4_2" was opened
	When user clicks on "Select Secondary" drop-down
	And selects dataset
	Then Selected dataset should be displayed

Scenario: 02 Copy link
	Given the "Filter Refiner" for the "xl_PGP3140_wgs_NIST-4_2" was opened
	When user clicks on chain icon near drop-down
	Then the link should be copied
	And Validation message should be appear

Scenario: 03 Collapse all
	Given the "Filter Refiner" for the "xl_PGP3140_wgs_NIST-4_2" was opened
	When user clicks on Collapse all button
	Then all filters should be collapsed

Scenario: 04 Expand all
	Given the "Filter Refiner" for the "xl_PGP3140_wgs_NIST-4_2" was opened
	And filters were collapsed
	When user clicks on Expand all button
	Then all filters should be Expanded

Scenario: 06 Export Excel
	Given the "Filter Refiner" for the "xl_PGP3140_wgs_NIST-4_2" was opened
	And Attribute with less then 300 variants was added
	When user clicks on "Export Report" drop-down
	And Selects "Excel"
	Then Dataset should be exported with less then 300 variants.

Scenario: 07 Export CSV
	Given the "Filter Refiner" for the "xl_PGP3140_wgs_NIST-4_2" was opened
	And Attribute with less then 300 variants was added
	When user clicks on "Export Report" drop-down
	And Selects "CSV"
	Then Dataset should be exported with less then 300 variants.

Scenario: 08 Excel: Too many variants to export
	Given the "Filter Refiner" for the "xl_PGP3140_wgs_NIST-4_2" was opened
	And Attribute with more then 300 variants was added
	When user clicks on "Export Report" drop-down
	And Selects "Excel"
	Then Excel should not be exported
	And "There are too many variants to export. The number of variants should be less than 300" error message should be displayed.

Scenario: 09 CSV: Too many variants to export
	Given the "Filter Refiner" for the "xl_PGP3140_wgs_NIST-4_2" was opened
	And Attribute with more then 300 variants was added
	When user clicks on "Export Report" drop-down
	And Selects "CSV"
	Then CSV should not be exported
	And "There are too many variants to export. The number of variants should be less than 300" error message should be displayed.

Scenario: 10 undo button
	Given the "Filter Refiner" for the "xl_PGP3140_wgs_NIST-4_2" was opened
	And user added some filter
	When user clicks on "undo" button
	Then changes that were made before should be undone

Scenario: 11 redo button
	Given the "Filter Refiner" for the "xl_PGP3140_wgs_NIST-4_2" was opened
	And Changes were undone
	When user clicks on "redo" button
	Then Changes should be re-done

