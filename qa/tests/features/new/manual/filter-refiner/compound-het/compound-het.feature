@regression
Feature: Filter Refiner, Filter by Compound_Het

@smoke
@tc:114294
Scenario Outline: 01 Filtering by "<Compound_Het Value>" in WS dataset
	Given the "Filter Refiner" for the "PGP3140_wgs_panel_hl" dataset was opened
	When user clicks the "+" button near "Functional Units"
	And selects "Compound_Het" functional attribute
	And selects the "<Compound_Het Value>" in the drop-down
	And clicks the "Apply condition" button
	Then Compound_Het should be added to the right part of the page
	And number of variants should equal "<Variants Number>"

Examples:
	| Compound_Het Value           | Variants Number |
	| shared transcripts           | 252             |
	| shared gene                  | 260             |
	| non-intersecting transcripts | 248             |

@tc:114295
Scenario Outline: 02 Filtering by "<Compound_Het Value>" in secondary Dataset - Not Mode
	Given the "Filter Refiner" for the "PGP3140_wgs_panel_hl" dataset was opened
	When user clicks the "+" button near "Functional Units"
	And selects "Compound_het" functional attribute
	And selects the "<Compound_Het Value>" in the drop-down
	And checks the "Not" check-box
	And clicks the "Apply condition" button
	Then Compound_Het should be added to the right part of the page with "not" flag
	And number of variants should equal "<Variants Number with NOT mode>"

Examples:
	| Compound_Het Value           | Variants Number with NOT Mode |
	| shared transcripts           | 2,340                         |
	| shared gene                  | 2,332                         |
	| non-intersecting transcripts | 2,344                         |

@smoke
@tc:114297
Scenario: 03 Primary dataset
	Given the "Filter Refiner" for the "xl_PGP3140_wgs_NIST-4_2" dataset was opened
	When user clicks the "+" button near "Functional Units"
	And selects the "Compound_Het" Functional attribute
	Then the "Approx" drop-down should be disabled
	And should contain only "non-intersecting transcripts" value
