@regression
Feature: Filter Refiner, Filter by Locus (GeneRegion)

@tc:114359
Scenario: 01 Add "GeneRegion" functional attribute
	Given the "Filter Refiner" for "PGP3140_wgs_panel_hl" dataset was opened
	When user clicks the "+" button near "Functional Units"
	And selects "GeneRegion" functional attribute
	Then "GeneRegion" functional attribute should be displayed

@smoke
@tc:114360
Scenario Outline: 02 Add a "<Valid Locus>" - Secondary dataset
	Given the "Filter Refiner" for the "PGP3140_wgs_panel_hl" dataset was opened
	When user clicks the "+" button near "Functional Units"
	And selects "GeneRegion" functional attribute
	And enters "<Valid Locus>" value in the input field
	And clicks the "Apply condition" button
	Then the filter by Locus should be added to the right part of the page
	And variants number should equal "<Total Variants>"

Examples:
	| Valid Locus   | Total Variants |
	| chr1:6500660  | 1              |
	| chr1:27481530 | 1              |
	| chr1:65058247 | 0              |

@smoke
@tc:114361
Scenario Outline: 03 Add a "<Valid Locus>" - Primary dataset
	Given the "Filter Refiner" for the "xl_PGP3140_wgs_NIST-4_2" dataset was opened
	When user clicks the "+" button near "Functional Units"
	And selects "GeneRegion" functional attribute
	And enters "<Valid Locus>" value in the input field
	And clicks the "Apply condition" button
	Then the filter by Locus should be added to the right part of the page
	And variants number should equal "<Total Variants>"

Examples:
	| Valid Locus  | Total Variants |
	| chr18:25165  | 1              |
	| chr19:251070 | 1              |

@tc:114362
Scenario Outline: 04 Add an "<Invalid Locus>" locus
	Given the "Filter Refiner" for the "PGP3140_wgs_panel_hl" dataset was opened
	When user clicks the "+" button near "Functional Units"
	And selects "GeneRegion" functional attribute
	And enters "<Invalid Locus>" value in the input field
	Then the "Apply condition" button should be disabled
	And the validation message should be displayed

Examples:
	| Invalid Locus  |
	| chr1:6500he660 |
	| chr1:64@84880  |
	| chr32:6505824  |
	| 1              |
	| qwerty         |

@tc:114363
Scenario: 05 Add an Empty locus
	Given the "Filter Refiner" for the "PGP3140_wgs_panel_hl" dataset was opened
	When user clicks the "+" button near "Functional Units"
	And selects "GeneRegion" functional attribute
	And enters nothing to the "Locus" field
	Then the "Apply condition" button should be disabled
	And the validation message should be displayed

@tc:114364
Scenario Outline: 06 "<Valid Locus>" value and "Not" mode
	Given the "Filter Refiner" for the "PGP3140_wgs_panel_hl" dataset was opened
	When user clicks the "+" button near "Functional Units"
	And selects "GeneRegion" functional attribute
	And enters "<Valid Locus>" value in the input field
	And checks the "Not" Check-box
	And clicks the "Apply condition" button
	Then the filter by Locus should be added to the right part of the page with "not" flag
	And variants number should equal "<Total Variants>"

Examples:
	| Valid Locus   | Total Variants |
	| chr1:6500660  | 2,591          |
	| chr1:27481530 | 2,591          |
	| chr1:65058247 | 2,592          |
