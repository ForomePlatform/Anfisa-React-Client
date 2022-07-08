@regression
Feature: Main table, Filter by Sample
    As the Anfisa user I want to filter variants list by Sample

    Scenario: 01 Samples correspond to the dataset

	Given "Main Table" for the WS dataset was opened
	When user clicks "+ Add Sample" button 
	Then "Sample" dialog should be displayed
	And Samples should correspond to the dataset


Scenario: 02 Select a Sample without applying

	Given Sample dialog was opened
	When User checks one sample
	And "Sample" dialog is opened
	And User clicks on of the sample
	Then Sample should be checked but should not be added to the panel


Scenario: 03 Add filter by one sample

	Given Sample dialog was opened
	When User checks any existing sample
	And Clicks "Apply" button
	Then Variants list should be filtered by selected sample


Scenario: 04  Add filter by a few samples

	Given Sample dialog was opened
	When User checks few existing samples
	And Clicks "Apply" button
	Then Variants list should be filtered by selected samples

Scenario: 05 Edit filter

	Given A few samples were added
	When User clicks "+" button near selected samples
	And Adds or removes some samples from the "Sample" dialog
	And Clicks "Apply" button
	Then Variants list should be filtered by newly selected samples

Scenario: 06 Clear All

	Given A few samples were added
	When User clicks "+" button near selected samples
	And Clicks "Clear all" button
	And Clicks "Apply" button
	Then All chosen samples should be cleared

Scenario: 07 Cancel or "X"

	Given Sample dialog was opened
	When User checks few existing samples 
	And Clicks "Cancel" or "X" button
	Then Variants should not be filtered by samples (no filter's changed)

Scenario: 08 Clear applied sample with "X" button

    Given One sample was applied
	When User Clicks "X" button near the sample
	Then Applied sample should be cleared
	And Variants should be filtered

Scenario: 09 Search by valid sample name

	Given Sample dialog was opened
	When User writes valid sample name in the Search field
	Then The sample should be searched

Scenario: 10 Search by sample (substring)

	Given Sample dialog was opened
	When User writes substring of the valid sample name in the Search field
	Then The sample should be searched

Scenario: 11 Search by sample (lower-case)

	Given Sample dialog was opened
	When User writes valid sample name with lower-case in the Search field
	Then The sample should be searched

Scenario: 12 Search by sample (upper-case)

	Given Sample dialog was opened
	When User writes valid sample name with upper-case in the Search field
	Then The sample should be searched

Scenario: 13 Search by random row

	Given Sample dialog was opened
	When User writes non-existing sample in the Search field
	Then The sample should not be searched
