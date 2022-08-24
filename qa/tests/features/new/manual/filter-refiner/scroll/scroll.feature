@regression
Feature: Filter Refiner, scroll

Background:
	Given user opens "Filter refiner" for "xl_PGP3140_wgs_NIST-4_2" dataset

@tc:114394
Scenario Outline: 01 No scroll
	When user clicks the "<Attribute Name>" with number of values less than or equal to 9
	Then the scroll should not be present in the middle part of the screen
	And full list of values should be displayed

Examples:
	| Attribute Name       |
	| Callers              |
	| Region_Worst         |
	| gnomAD_PopMax_Inbred |

@tc:114395
Scenario Outline: 02 Scroll
	When user clicks the "<Attribute Name>" with number of values more than 9
	Then the scroll should be present in the middle part of the screen

Examples:
	| Attribute Name               |
	| Symbol                       |
	| Chromosome                   |
	| Clinvar_Trusted_Significance |

@tc:114396
Scenario: 03 Search with scroll
	When user clicks the "Symbol" attribute
	And scrolls down
	And enters "10" in the "Search" field
	Then the page should be returned to the top 
	And list of values with "10" should be displayed
