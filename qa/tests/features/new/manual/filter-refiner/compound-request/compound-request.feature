@regression
Feature: Filter Refiner, Filter by Compound_Request

@smoke
@tc:114320
Scenario: 01 XL dataset - "Approx" is disabled
	Given the "Filter Refiner" for the "xl_PGP3140_wgs_NIST-4_2" dataset was opened
	When user clicks the "+" button near "Functional Units"
	And selects "Compound_Request" functional attribute
	Then the "Approx" drop-down should be disabled
	And should be equal to "non-intersecting transcripts"

@tc:114321
Scenario: 02 XL dataset - 1 empty row
	Given the "Filter Refiner" for the "xl_PGP3140_wgs_NIST-4_2" dataset was opened
	When user clicks the "+" button near "Functional Units"
	And selects "Compound_Request" functional attribute
	And doesn't fill any data
	Then "Apply condition" button should be disabled

@tc:114322
Scenario: 03 XL dataset - 1 row, MIN count = 1
	Given the "Filter Refiner" for the "xl_PGP3140_wgs_NIST-4_2" dataset was opened
	When user clicks the "+" button near "Functional Units"
	And selects "Compound_Request" functional attribute
	And checks the "Compensational" check-box
	And enters "1" in the "Scenario" input
	And clicks the "Apply condition" button
	Then "Compound_Request" should be added to the right part of the page
	And number of variants should equal 108,891

@tc:114323
Scenario: 04 XL dataset - 1 row, MIN count = 10
	Given the "Filter Refiner" for the "xl_PGP3140_wgs_NIST-4_2" dataset was opened
	When user clicks the "+" button near "Functional Units"
	And selects "Compound_Request" functional attribute
	And checks the "Compensational" check-box
	And enters "10" in the "Scenario" input
	And clicks the "Apply condition" button
	Then "Compound_Request" should be added to the right part of the page
	And number of variants should equal 95,159

@tc:114324
Scenario: 05 XL dataset - 1 row, MIN count = 1000
	Given the "Filter Refiner" for the "xl_PGP3140_wgs_NIST-4_2" dataset was opened
	When user clicks the "+" button near "Functional Units"
	And selects "Compound_Request" functional attribute
	And checks the "Compensational" check-box
	And enters "1000" in the "Scenario" input
	And clicks the "Apply condition" button
	Then "Compound_Request" should be added to the right part of the page
	And number of variants should equal 0

@tc:114325
Scenario: 06 XL dataset - 2 rows
	Given the "Filter Refiner" for the "xl_PGP3140_wgs_NIST-4_2" dataset was opened
	When user clicks the "+" button near "Functional Units"
	And selects "Compound_Request" functional attribute
	And checks the "Compensational" check-box
	And enters "1" in the "Scenario" input
	And clicks the "Add" button to add the second row
	And checks the "Homozygous Recessive/X-Linked" check-box
	And enters "2" in the "Scenario" input
	And clicks "Apply condition" button
	Then "Compound_Request" should be added to the right part of the page
	And variants list should be filtered
	And number of variants should equal 110,102

@tc:114326
Scenario: 07 XL dataset - 5 rows
	Given the "Filter Refiner" for the "xl_PGP3140_wgs_NIST-4_2" dataset was opened
	When user clicks the "+" button near "Functional Units"
	And selects "Compound_Request" functional attribute
	And checks the "Homozygous Recessive/X-Linked" check-box
	And enters "1" in the "Scenario" input
	And clicks the "Add" button to add the second row
	And checks the "Autosomal Dominant" check-box
	And enters "2" in the "Scenario" input
	And clicks the "Add" button to add the third row
	And checks the "Compensational" check-box
	And enters "3" in the "Scenario" input
	And clicks the "Add" button to add the fourth row
	And checks the "Homozygous Recessive/X-Linked" check-box
	And enters "4" in the "Scenario" input
	And clicks the "Add" button to add the fifth row
	And checks the "Autosomal Dominant" check-box
	And enters "5" in the "Scenario" input
	And clicks the "Apply condition" button to apply the filter
	Then "Compound_Request" should be added to the right part of the page
	And number of variants should equal 115,096

@tc:114327
Scenario: 08 XL dataset - impossible to add 6 rows
	Given the "Filter Refiner" for the "xl_PGP3140_wgs_NIST-4_2" dataset was opened
	When user clicks the "+" button near "Functional Units"
	And selects "Compound_Request" functional attribute
	And adds 5 rows
	Then the "Add" button should be disabled

@tc:114328
Scenario: 09 XL dataset - Remove row
	Given the "Filter Refiner" for the "xl_PGP3140_wgs_NIST-4_2" dataset was opened
	When user clicks the "+" button near "Functional Units"
	And selects "Compound_Request" functional attribute
	And clicks the "Add" button to add the second row
	And clicks on first row
	And clicks the "Remove" button
	Then the first row should be deleted
	And only the second row should be displayed

@tc:114329
Scenario: 10 XL dataset - Not mode
	Given the "Filter Refiner" for the "xl_PGP3140_wgs_NIST-4_2" dataset was opened
	When user clicks the "+" button near "Functional Units"
	And selects "Compound_Request" functional attribute
	And checks the "Compensational" check-box
	And checks the "Not" check-box
	And clicks the "Apply condition" button to apply the filter
	Then "Compound_Request" should be added to the right part of the page with "not" flag
	And number of variants should equal 5,519,862

@tc:114330
Scenario: 11 XL dataset - "Reset" button
	Given the "Filter Refiner" for the "xl_PGP3140_wgs_NIST-4_2" dataset was opened
	When user clicks the "+" button near "Functional Units"
	And selects "Compound_Request" functional attribute
	And checks any "Inheritance mode" check-box
	And clicks the "Reset" button
	Then "Inheritance mode" should be un-checked

@tc:114331
Scenario: 12 XL dataset - "Clear" button
	Given the "Filter Refiner" for the "xl_PGP3140_wgs_NIST-4_2" dataset was opened
	When user clicks the "+" button near "Functional Units"
	And selects "Compound_Request" functional attribute
	And adds some rows
	And clicks the "Clear" button
	Then added rows should be removed
	And everything should be back to default

@smoke
@tc:114332
Scenario Outline: 13 Secondary dataset - filter by "<approx drop-down value>"
	Given the "Filter Refiner" for the "PGP3140_wgs_panel_hl" dataset was opened
	When user clicks the "+" button near "Functional Units"
	And selects "Compound_Request" functional attribute
	And clicks the "Approx" drop-down
	And selects "<approx drop-down value>"
	And checks the "<Inheritance mode>" check-box
	And clicks the "Apply condition" button
	Then "Compound_Request" should be added to the right part of the page
	And number of variants should equal "<Variants Number>"

Examples:
	| approx drop-down value       | Inheritance mode              | Variants Number |
	| shared gene                  | Compensational                | 121             |
	| shared transcripts           | Autosomal Dominant            | 30              |
	| non-intersecting transcripts | Homozygous Recessive/X-linked | 92              |

