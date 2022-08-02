Feature: Main table, Filter by "Samples"
As the Anfisa user I want to filter variants list by "Samples"

Background:
	Given "Main Table" of "PGP3140_wgs_panel_hl" dataset was opened

Scenario: 01 Select a "Samples" without applying

	When User clicks "+ Add Samples" button
	And User checks one "Samples"
	And "Samples" dialog is opened
	And User clicks on of the "Samples"
	Then Chosen "Sample" should be checked but should not be added to the panel

@smoke
@regression
Scenario: 02 Add filter by one "Samples"

	Given "+ Add Samples" dialog was opened
	When User checks any existing "Samples"
	And Clicks "Apply" button
	Then Variants list should be filtered by selected "Samples"
	And Selected "Samples" should be shown instead of "+ Add Samples" button

@regression
Scenario: 03  Add filter by a few "Samples"s

	Given "+ Add Samples" dialog was opened
	When User checks few existing "Samples"s
	And Clicks "Apply" button
	Then Variants list should be filtered by selected "Samples"s

@regression
Scenario: 04 Edit filter

	Given Few "Samples"s were added
	When User clicks "+" button near selected "Samples"s
	And Adds or removes some "Samples"s from the "Samples" dialog
	And Clicks "Apply" button
	Then Variants list should be filtered by newly selected "Samples"s

@regression
Scenario: 05 Clear All

	Given Few "Samples"s were added
	When User clicks "+" button near selected "Samples"s
	And Clicks "Clear all" button
	And Clicks "Apply" button
	Then All chosen "Samples"s should be cleared
	And All variants from dataset should be shown

@regression
Scenario: 06 Cancel or "X"

	Given "+ Add Samples" dialog was opened
	When User checks few existing "Samples"s 
	And Clicks "Cancel" or "X" button
	Then Variants should not be filtered by "Samples"s (no filter's changed)

@regression
Scenario: 07 Clear applied "Samples" with "X" button

    Given One "Samples" was applied
	When User Clicks "X" button near the "Samples"
	Then Applied "Samples" should be cleared
	And Variants should be filtered

@regression
Scenario: 08 Search by valid "Samples" name

	Given "+ Add Samples" dialog was opened
	When User writes valid "Samples" name in the Search field
	Then The "Samples" should be searched

@regression
Scenario: 09 Search by "Samples" (substring)

	Given "+ Add Samples" dialog was opened
	When User writes substring of the valid "Samples" name in the Search field
	Then The "Samples" should be searched

@regression
Scenario: 10 Search by "Samples" (lower-case)

	Given "+ Add Samples" dialog was opened
	When User writes valid "Samples" name with lower-case in the Search field
	Then The "Samples" should be searched

@regression
Scenario: 11 Search by "Samples" (upper-case)

	Given "+ Add Samples" dialog was opened
	When User writes valid "Samples" name with upper-case in the Search field
	Then The "Samples" should be searched

@regression
Scenario: 12 Search by random row

	Given "+ Add Samples" dialog was opened
	When User writes non-existing "Samples" in the Search field
	Then The "Samples" should not be searched
