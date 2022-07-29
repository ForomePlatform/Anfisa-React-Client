@regression
Feature: Filter Refiner, Filter by Locus (GeneRegion)

@smoke
Scenario: 01 Add "GeneRegion" functional attribute
	Given "Filter Refiner" for "PGP3140_wgs_panel_hl" dataset was opened
	When user clicks on "+" button near functional units
	And selects "GeneRegion" functional attribute
	Then "GeneRegion" functional attribute should be displayed

@smoke
Scenario Outline: 02 Add a <Valid Locus> - Secondary dataset
	Given the Filter Refiner for the "PGP3140_wgs_panel_hl" dataset was opened
	And "GeneRegion" functional attribute was displayed
	When user enters "<Valid Locus>" value in the input field
	And clicks on "+ Add Attribute" button
	Then the filter by Locus should be added
	And variants list should be filtered
	And variants number should be equal to <Total Variants>

Examples:
	| Valid Locus   | Total Variants |
	| chr1:6500660  | 1              |
	| chr1:27481530 | 1              |
	| chr1:65058247 | 0              |

@smoke
Scenario Outline: 03 Add a <Valid Locus> - Primary dataset
	Given the Filter Refiner for the "xl_PGP3140_wgs_NIST-4_2" dataset was opened
	And "GeneRegion" functional attribute was displayed
	When user enters "<Valid Locus>" value in the input field
	And clicks the "+ Add Attribute" button
	Then the filter by Locus should be added
	And variants list should be filtered
	And variants number should be equal to "<Total Variants>"

Examples:
	| Valid Locus  | Total Variants |
	| chr18:25165  | 1              |
	| chr19:251070 | 1              |

Scenario Outline: 04 Add an <Invalid Locus> locus
	Given the Filter Refiner for the "PGP3140_wgs_panel_hl" dataset was opened
	And "GeneRegion" functional attribute was displayed
	When user enters "<Invalid Locus>" value in the input field
	Then the "+ Add Attribute" button should be disabled
	And the validation message should be displayed

Examples:
	| Invalid Locus  |
	| chr1:6500he660 |
	| chr1:64@84880  |
	| chr32:6505824  |
	| 1              |
	| qwerty         |

Scenario: 05 Add an Empty locus
	Given the Filter Refiner for the "PGP3140_wgs_panel_hl" dataset was opened
	And "GeneRegion" functional attribute was displayed
	When user enters nothing to the "Locus" field
	Then the "+ Add Attribute" button should be disabled
	And the validation message should be displayed

Scenario Outline: 06 Clear button
	Given the Filter Refiner for the "PGP3140_wgs_panel_hl" dataset was opened
	And "GeneRegion" functional attribute was displayed
	When user inputs "<Valid Locus>"
	And clicks on "+ Add Attribute" button
	And clicks on "Clear all" button
	Then the filter by Locus should be cleared
	And Variants number should be updated

Examples:
	| Valid Locus  |
	| chr1:6500660 |
	| chr1:6484880 |
	| chr1:6505824 |

Scenario Outline: 07 Not mode
	Given the Filter Refiner for the "PGP3140_wgs_panel_hl" dataset was opened
	And "GeneRegion" functional attribute was displayed
	When user enters "<Valid Locus>" value in the input field
	And selects "Not" Check-box
	And clicks on "+ Add Attribute" button
	Then the filter by Locus should be added
	And variants list should be filtered
	And variants number should be equal to "<Total Variants>"

Examples:
	| Valid Locus   | Total Variants |
	| chr1:6500660  | 2,591          |
	| chr1:27481530 | 2,591          |
	| chr1:65058247 | 2,592          |

Scenario Outline: 08 Save changes
	Given the Filter Refiner for the "PGP3140_wgs_panel_hl" dataset was opened
	And "GeneRegion" functional attribute was added with "<locus1>"
	When user changes "<locus1>" with "<locus2>"
	And clicks on "Save Changes" button
	Then All changes should be saved
	And locus name should be changed in Results section

Examples:
	| locus1       | locus2        |
	| chr1:6500660 | chr1:65058247 |

Scenario: 09 Delete "GeneRegion" functional attribute
	Given the Filter Refiner for the "PGP3140_wgs_panel_hl" dataset was opened
	And "GeneRegion" functional attribute was added
	When user clicks on Kebab Menu in Results section
	And selects "Delete" button
	Then "GeneRegion" functional attribute should be deleted