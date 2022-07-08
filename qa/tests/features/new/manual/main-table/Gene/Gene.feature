@regression
Feature: Main table, Filter by Gene
    As the Anfisa user I want to filter variants list by Gene


Scenario: 01 Genes correspond to the dataset

	Given The "Main Table" for the WS dataset was opened
	When user clicks "+ Add Gene" button 
	Then "Gene" dialog should be displayed
	And Genes should correspond to the dataset


Scenario: 02 Select a gene without applying

	Given Gene dialog was opened
	When User checks one gene
	And "Gene" dialog is opened
	And User clicks one of the genes
	Then Gene should be checked but should not be added to the panel


Scenario: 03 Add filter by one gene

	Given Gene dialog was opened
	When User checks any existing gene
	And Clicks "Apply" button
	Then Variants list should be filtered by selected gene


Scenario: 04  Add filter by a few genes

	Given Gene dialog was opened
	When User checks few existing genes
	And Clicks "Apply" button
	Then Variants list should be filtered by selected genes

Scenario: 05 Edit filter

	Given A few genes were added
	When User clicks "+" button near selected Genes
	And Adds or removes some Genes from the "Gene" dialog
	And Clicks "Apply" button
	Then Variants list should be filtered by newly selected genes

Scenario: 06 Clear All

	Given A few genes were added
	When User clicks "+" button near selected Genes
	And Clicks "Clear all" button
	And Clicks "Apply" button
	Then All chosen genes should be cleared

Scenario: 07 Cancel or "X"

	Given Gene dialog was opened
	When User checks few existing genes 
	And Clicks "Cancel" or "X" button
	Then Variants should not be filtered by genes (no filter's changed)

Scenario: 08 Clear applied gene with "X" button

    Given One Gene was applied
	When User Clicks "X" button near the gene
	Then Applied gene should be cleared
	And Variants should be filtered

Scenario: 09 Search by valid gene name

	Given Gene dialog was opened
	When User writes valid gene name in the Search field
	Then The gene should be searched

Scenario: 10 Search by gene (substring)

	Given Gene dialog was opened
	When User writes substring of the valid gene name in the Search field
	Then The gene should be searched

Scenario: 11 Search by gene (lower-case)

	Given Gene dialog was opened
	When User writes valid gene name with lower-case in the Search field
	Then The gene should be searched

Scenario: 12 Search by gene (upper-case)

	Given Gene dialog was opened
	When User writes valid gene name with upper-case in the Search field
	Then The gene should be searched

Scenario: 13 Search by random row

	Given Gene dialog was opened
	When User writes non-existing gene in the Search field
	Then The gene should not be searched
