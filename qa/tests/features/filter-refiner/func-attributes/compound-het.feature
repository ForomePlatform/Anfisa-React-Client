Feature: Filter Refiner, Filter by Compound_Het
#	As a user, I want to have an ability to filter variants by Compound Het

Scenario Outline: 01 Secondary dataset
	Given the Filter Refiner for the "PGP3140_wgs_panel_hl" was opened
	When the user clicks "+" button near Functional Units
	And selects the <Compound Het Value> in the drop-down
	And clicks the "+ Add Attribute" button
	Then Compound_Het should be added to the right part of the page
	And variants list should be filtered by <Compound Het Value>
	And number of variants should be equal to <Variants Number>

Examples:
	| <Compound Het Value>         | <Variants Number> |
	| shared transcripts           | 252               |
	| shared gene                  | 260               |
	| non-intersecting transcripts | 248               |

Scenario Outline: 02 Secondary dataset - Go to Main Table
	Given the Filter Refiner for the "PGP3140_wgs_panel_hl" was opened
	When the user clicks "+" button near Functional Units
	And selects the <Compound Het Value> in the drop-down
	And clicks the "+ Add Attribute" button
	And the filter is applied
	And user clicks the "Apply" button
	Then the "Main Table" page should be open
	And number of variants equal to <Variants Number>

Examples:
	| <Compound Het Value>         | <Variants Number> |
	| shared transcripts           | 252               |
	| shared gene                  | 260               |
	| non-intersecting transcripts | 248               |

Scenario Outline: 03 Secondary Dataset - Not Mode
	Given the Filter Refiner for the "PGP3140_wgs_panel_hl" was opened
	When the user clicks "+" button near Functional Units
	And selects the <Compound Het Value> in the drop-down
	And Clicks on "Not" check-box
	And clicks the "+ Add Attribute" button
	Then Compound_Het should be added to the right part of the page
	And variants list should be filtered by <Compound Het Value>
	And number of variants should be equal to <Variants Number with NOT mode>

Examples:
	| <Compound Het Value>         | <Variants Number with Note Mode> |
	| shared transcripts           | 2,442                            |
	| shared gene                  | 2,366                            |
	| non-intersecting transcripts | 2,344                            |

Scenario: 04 Secondary Dataset - Clear button
	Given the Filter Refiner for the "PGP3140_wgs_panel_hl" was opened
	When the user clicks "+" button near Functional Units
	And selects the "Shared gene" value in the drop-down
	And Clicks on "Not" check-box
	And Clicks the "+ Add Attribute" button
	And the "Compound_Het" filter is applied
	And Clicks on  "Clear" button
	And Clicks on "Save Changes" button
	Then the "Compound_Het" filter should be cleared
	And number of variants should be reset to 260

Scenario: 05 Primary dataset
	Given the Filter Refiner for the "xl_PGP3140_wgs_NIST-4_2" was opened
	When the user clicks "+" button near Functional Units
	And Selects Compound_het
	Then the approx drop-down should be disabled
	And should contain only "non-intersecting transcripts" value