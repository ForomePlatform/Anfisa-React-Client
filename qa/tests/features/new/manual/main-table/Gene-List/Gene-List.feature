@regression
Feature: Main table, Filter by Gene Lists
    As the Anfisa user I want to filter variants list by Gene lists

    Scenario: 01 Gene lists correspond to the dataset

	Given The "Main Table" for the WS dataset was opened
	When user clicks "+ Add Gene List" button 
	Then "Gene List" dialog should be displayed
	And Gene List should correspond to the dataset


Scenario: 02 Select a gene list without applying

	Given Gene List dialog was opened
	When User checks one gene list
	And "Gene List" dialog is opened
	And User clicks one of the gene lists
	Then Gene list should be checked but should not be added to the panel


Scenario: 03 Add filter by one gene list

	Given Gene List dialog was opened
	When User checks any existing gene list
	And Clicks "Apply" button
	Then Variants list should be filtered by selected gene list


Scenario: 04  Add filter by a few gene lists

	Given Gene List dialog was opened
	When User checks few existing gene lists
	And Clicks "Apply" button
	Then Variants list should be filtered by selected gene lists

Scenario: 05 Edit filter

	Given A few gene lists were added
	When User clicks "+" button near selected Gene Lists
	And Adds or removes some Gene List from the "Gene List" dialog
	And Clicks "Apply" button
	Then Variants list should be filtered by newly selected gene lists

Scenario: 06 Clear All

	Given A few gene lists were added
	When User clicks "+" button near selected Gene lists
	And Clicks "Clear all" button
	And Clicks "Apply" button
	Then All chosen gene lists should be cleared

Scenario: 07 Cancel or "X"

	Given Gene list dialog was opened
	When User checks few existing gene lists
	And Clicks "Cancel" or "X" button
	Then Variants should not be filtered by gene lists (no filter's changed)

Scenario: 08 Clear applied gene list with "X" button

    Given One Gene List was applied
	When User Clicks "X" button near the gene list
	Then Applied gene list should be cleared
	And Variants should be filtered

Scenario: 09 Search by valid gene list name

	Given Gene list dialog was opened
	When User writes valid gene list name in the Search field
	Then The gene list should be searched

Scenario: 10 Search by gene list (substring)

	Given Gene list dialog was opened
	When User writes substring of the valid gene list name in the Search field
	Then The gene list should be searched

Scenario: 11 Search by gene list (lower-case)

	Given Gene list dialog was opened
	When User writes valid gene list name with lower-case in the Search field
	Then The gene list should be searched

Scenario: 12 Search by gene list (upper-case)

	Given Gene list dialog was opened
	When User writes valid gene list name with upper-case in the Search field
	Then The gene list should be searched

Scenario: 13 Search by random row

	Given Gene list dialog was opened
	When User writes non-existing gene list in the Search field
	Then The gene list should not be searched
