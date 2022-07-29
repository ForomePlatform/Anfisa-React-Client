@regression
@smoke
Feature: Filter Refiner, Filter by Compound_Het

Scenario Outline: 01 Filtering by Compound_Het Value in WS dataset
	Given the Filter Refiner for the "PGP3140_wgs_panel_hl" dataset was opened
	When the user clicks "+" button near Functional Units
	And selects "Compound_Het" functional attribute
	And selects the "<Compound_Het Value>" in the drop-down
	And clicks the "+ Add Attribute" button
	Then Compound_Het should be added to the right part of the page
	And variants list should be filtered by "<Compound_Het Value>"
	And number of variants should be equal to "<Variants Number>"

Examples:
	| Compound_Het Value           | Variants Number |
	| shared transcripts           | 252             |
	| shared gene                  | 260             |
	| non-intersecting transcripts | 248             |

Scenario Outline: 02 Secondary Dataset - Not Mode
	Given the Filter Refiner for the "PGP3140_wgs_panel_hl" dataset was opened
	And user clicks "+" button near Functional Units
	And selects "Compound_het" functional attribute
	When user selects the "<Compound_Het Value>" in the drop-down
	And clicks on "Not" check-box
	And clicks on "+ Add Attribute" button
	Then Compound_Het should be added to the right part of the page
	And it has "not" flag
	And variants list should be filtered by "<Compound Het Value>"
	And number of variants should be equal to "<Variants Number with NOT mode>"

Examples:
	| Compound_Het Value           | Variants Number with NOT Mode |
	| shared transcripts           | 2,340                         |
	| shared gene                  | 2,332                         |
	| non-intersecting transcripts | 2,344                         |

Scenario: 03 Secondary Dataset - Clear button
	Given the Filter Refiner for the "PGP3140_wgs_panel_hl" dataset was opened
	And "Compound_Het" Functional attribute was displayed
	When user selects the "Shared gene" value in the drop-down
	And clicks on "Not" check-box
	And clicks on "+ Add Attribute" button
	And clicks on  "Clear" button
	And clicks on "Save Changes" button
	Then "Not" check-box should be discarded

Scenario: 04 Primary dataset
	Given the Filter Refiner for the "xl_PGP3140_wgs_NIST-4_2" dataset was opened
	When the user clicks "+" button near Functional Units
	And selects "Compound_Het" Functional attribute
	Then the approx drop-down should be disabled
	And should contain only "non-intersecting transcripts" value