@regression
Feature: Filter Refiner, Filter by Compound_Request

Scenario: 01 XL dataset - "Approx" is disabled for XL dataset
	Given the Filter Refiner for the "xl_PGP3140_wgs_NIST-4_2" was opened
	When user clicks on "+" button near functional Units
	And selects "Compound_Request" functional attribute
	Then the "Approx" drop-down should be disabled
	And should be equal to "non-intersecting transcripts"

Scenario: 02 XL dataset - 1 empty row
	Given the Filter Refiner for the "xl_PGP3140_wgs_NIST-4_2" was opened
	And "Compound_Request" functional attribute was displayed
	When user doesn't fill any data
	Then "+ Add Attribute" button should be disabled

Scenario: 03 XL dataset - 1 row, MIN count = 1
	Given the Filter Refiner for the "xl_PGP3140_wgs_NIST-4_2" was opened
	And "Compound_Request" functional attribute was displayed
	When user selects "Compensational" check-box
	And enters "1" in the "Minimal count of events" input
	And clicks on "+ Add Attribute" button
	Then "Compound_Request" should be added to the right part of the page
	And variants list should be filtered by Compensational reset
	And number of variants should be equal to 108891

Scenario: 04 XL dataset - 1 row, MIN count = 10
	Given the Filter Refiner for the "xl_PGP3140_wgs_NIST-4_2" was opened
	And "Compound_Request" functional attribute was displayed
	When user selects "Compensational" check-box
	And enters "500" in the "Minimal count of events" input
	And clicks on "+ Add Attribute" button
	Then "Compound_Request" should be added to the right part of the page
	And variants list should be filtered by Compensational reset
	And number of variants should be equal to 1070

Scenario: 05 XL dataset - 1 row, MIN count = 1000
	Given the Filter Refiner for the "xl_PGP3140_wgs_NIST-4_2" was opened
	And "Compound_Request" functional attribute was displayed
	When user selects "Compensational" check-box
	And enters "1000" in the "Minimal count of events" input
	And clicks on "+ Add Attribute" button
	Then "Compound_Request" should be added to the right part of the page
	And variants list should be filtered by Compensational reset
	And number of variants should be equal to 0

Scenario: 06 XL dataset - 2 rows
	Given the Filter Refiner for the "xl_PGP3140_wgs_NIST-4_2" was opened
	And "Compound_Request" functional attribute was displayed
	When user selects "Compensational" check-box
	And enters "1" in the "Minimal count of events" input
	And selects "Homozygous Recessive / X-Linked" check-box
	And enters "2" in the "Minimal count of events" input
	And clicks "+Add Attribute" button
	Then "Compound_Request" should be added to the right part of the page
	And variants list should be filtered
	And number of variants should be equal to 110102

Scenario: 07 XL dataset - 5 rows
	Given the Filter Refiner for the "xl_PGP3140_wgs_NIST-4_2" was opened
	And "Compound_Request" functional attribute was displayed
	When user selects "Homozygous Recessive / X-Linked" check-box
	And enters "1" in the "Minimal count of events" input
	And clicks "Add" button to add the second row
	And selects the "Autosomal Dominant" check-box
	And enters "2" in the "Minimal count of events" input
	And clicks "Add" button to add the third row
	And selects the "Compensational" check-box
	And enters "3" in the "Minimal count of events" input
	And clicks "Add" button to add the fourth row
	And selects the "Homozygous Recessive / X-Linked" check-box
	And enters "4" in the "Minimal count of events" input
	And clicks "Add" button to add the fifth row
	And selects the "Autosomal Dominant" check-box
	And enters "5" in the "Minimal count of events" input
	And clicks on "+Add attribute" button to apply the filter
	Then "Compound_Request" should be added to the right part of the page
	And variants list should be filtered by Compound_Request
	And number of variants should be equal to 115096

Scenario: 08 XL dataset - impossible to add 6 rows
	Given the Filter Refiner for the "xl_PGP3140_wgs_NIST-4_2" was opened
	And "Compound_Request" functional attribute was displayed
	When user adds 5 rows
	Then the "Add" button should be disabled
	And the sixth row should not be added

Scenario: 09 XL dataset - Remove row
	Given the Filter Refiner for the "xl_PGP3140_wgs_NIST-4_2" was opened
	And "Compound_Request" functional attribute was displayed
	When user clicks on "Add" button to add the second row
	And clicks on first row
	And clicks on "Remove" button
	Then the first row should be deleted
	And only the second row should be displayed

Scenario: 10 XL dataset - Not mode
	Given the Filter Refiner for the "xl_PGP3140_wgs_NIST-4_2" was opened
	And "Compound_Request" functional attribute was displayed
	When user selects "Not" check-box
	And selects "Compensational" check-box
	And clicks on "+Add attribute" button to apply the filter
	Then "Compound_Request" should be added to the right part of the page
	And variants list should be filtered by Not (Compensational)
	And number of variants should be equal to 5519862

Scenario: 11 XL dataset - Clear all button
	Given the Filter Refiner for the "xl_PGP3140_wgs_NIST-4_2" was opened
	And "Compound_Request" functional attribute was added
	When user clicks on "Clear all" button
	Then the "Compound_Request" filter should be cleared
	And number of variants should be reset to 5628753

Scenario: 12 XL dataset - Reset button
	Given the Filter Refiner for the "xl_PGP3140_wgs_NIST-4_2" was opened
	And "Compound_Request" functional attribute was displayed
	When user selects any Inheritance mode check-box
	And clicks on "reset" button
	Then Inheritance mode should be unchecked

Scenario: 13 XL dataset - Clear button
	Given the Filter Refiner for the "xl_PGP3140_wgs_NIST-4_2" was opened
	And "Compound_Request" functional attribute was displayed
	When user add some rows
	And clicks on "Clear" button
	Then added rows should be removed
	And everything should be back to default

Scenario Outline: 14 Secondary dataset - shared gene
	Given the Filter Refiner for the "PGP3140_wgs_panel_hl" was opened
	And "Compound_Request" functional attribute was displayed
	When user selects <approx drop-down value>
	And selects <Inheritance mode> check-box
	And clicks on "+ Add Attribute" button
	Then variants list should be filtered by Compound_Request
	And number of variants should be equal to <Variants Number>

Examples:
	| approx drop-down value       | Inheritance mode              | Variants Number |
	| shared gene                  | Compensational                | 121             |
	| shared transcripts           | Autosomal Dominant            | 30              |
	| non-intersecting transcripts | Homozygous Recessive/X-linked | 92              |

