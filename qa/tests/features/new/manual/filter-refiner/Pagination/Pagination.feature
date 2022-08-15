@regression
Feature: Filter Refiner, Pagination

Background:
	Given user opens "Filter refiner" for "xl_PGP3140_wgs_NIST-4_2" dataset

@tc:114394
Scenario Outline: 01 No pagination
	When user clicks the "<Attribute Name>" with number of values less than or equal to 8
	Then the pagination should not be present in the middle part of the screen
	And full list of values should be displayed

Examples:
	| Attribute Name |
	| Callers        |
	| Region_Worst   |

@tc:114395
Scenario Outline: 02 Pagination
	When user clicks the "<Attribute Name>" with number of values more than 8
	Then the pagination should be present in the middle part of the screen

Examples:
	| Attribute Name |
	| Symbol         |
	| Chromosome     |

@tc:114396
Scenario: 03 Search with pagination
	When user clicks the "Symbol" attribute
	And clicks the "Next Page" button three times
	And the attribute number "25-32" is displayed
	And user enters "10" in the "Search" field
	Then the page should be returned from "25-32" to "1-8"
	And list of values with "10" should be displayed

@tc:114397
Scenario: 04 Next/Previous pages
	When user clicks the "Symbol" attribute
	And the pagination is displayed
	Then user should be able to click the "Next page" button
	And the "Previous page" button
