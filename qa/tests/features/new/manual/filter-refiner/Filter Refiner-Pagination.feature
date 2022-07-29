﻿@regression
@smoke
Feature: Filter Refiner Pagination

Background:
	Given "Filter refiner" for "xl_PGP3140_wgs_NIST-4_2" dataset was opened

Scenario: 01 Search with pagination
	When user clicks the "Symbol" attribute
	And clicks the "Next Page" button three times
	And the fourth page is displayed
	And user enters "10" in the "Search" field
	Then the page should be returned from 4 to 1
	And list of values with "10" should be displayed

Scenario Outline: 02 No pagination
	When user clicks the "<Attribute Name>" with number of values <= 8
	Then the pagination should not be present in the middle part of the screen
	And full list of values should be displayed

Examples:
	| Attribute Name |
	| Callers        |
	| Region_Worst   |

Scenario Outline: 03 Pagination
	When user clicks the "<Attribute Name>" with number of values > 8
	Then the pagination should be present in the middle part of the screen

Examples:
	| Attribute Name |
	| Symbol         |
	| Chromosome     |

Scenario: 04 Next/Previous pages
	When user clicks the "Symbol" attribute
	And the pagination is displayed
	Then user should be able to click the "Next page" button
	And the "Previous page" button