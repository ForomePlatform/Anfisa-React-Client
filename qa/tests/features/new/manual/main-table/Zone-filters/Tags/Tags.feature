Feature: Main table, Filter by "Tag"
As the Anfisa user I want to filter variants list by "Tag"

Background:
	Given "Main Table" of "PGP3140_wgs_panel_hl" dataset was opened

Scenario: 01 Select a "Tag" without applying

	When User clicks "+ Add Tag" button
	And User checks one "Tag"
	And "Tag" dialog is opened
	And User clicks a "Tag"
	Then Chosen "Tag" should be checked but should not be added to the panel

@smoke
@regression
Scenario: 02 Add filter by one "Tag"

	Given "+ Add Tag" dialog was opened
	When User checks any existing "Tag"
	And Clicks "Apply" button
	Then Variants list should be filtered by selected "Tag"
	And Selected "Tag" should be shown instead of "+ Add Tag" button

@regression
Scenario: 03  Add filter by a few "Tag"s

	Given "+ Add Tag" dialog was opened
	When User checks few existing "Tag"s
	And Clicks "Apply" button
	Then Variants list should be filtered by selected "Tag"s

@regression
Scenario: 04 Edit filter

	Given Few "Tag"s were added
	When User clicks "+" button near selected "Tag"s
	And Adds or removes some "Tag"s from the "Tag" dialog
	And Clicks "Apply" button
	Then Variants list should be filtered by newly selected "Tag"s

@regression
Scenario: 05 Clear All

	Given Few "Tag"s were added
	When User clicks "+" button near selected "Tag"s
	And Clicks "Clear all" button
	And Clicks "Apply" button
	Then All chosen "Tag"s should be cleared
	And All variants from dataset should be shown

@regression
Scenario: 06 Cancel or "X"

	Given "+ Add Tag" dialog was opened
	When User checks few existing "Tag"s 
	And Clicks "Cancel" or "X" button
	Then Variants should not be filtered by "Tag"s (no filter's changed)

@regression
Scenario: 07 Clear applied "Tag" with "X" button

    Given One "Tag" was applied
	When User Clicks "X" button near the "Tag"
	Then Applied "Tag" should be cleared
	And Variants should be filtered

@regression
Scenario: 08 Search by valid "Tag" name

	Given "+ Add Tag" dialog was opened
	When User writes valid "Tag" name in the Search field
	Then The "Tag" should be searched

@regression
Scenario: 09 Search by "Tag" (substring)

	Given "+ Add Tag" dialog was opened
	When User writes substring of the valid "Tag" name in the Search field
	Then The "Tag" should be searched

@regression
Scenario: 10 Search by "Tag" (lower-case)

	Given "+ Add Tag" dialog was opened
	When User writes valid "Tag" name with lower-case in the Search field
	Then The "Tag" should be searched

@regression
Scenario: 11 Search by "Tag" (upper-case)

	Given "+ Add Tag" dialog was opened
	When User writes valid "Tag" name with upper-case in the Search field
	Then The "Tag" should be searched

@regression
Scenario: 12 Search by random row

	Given "+ Add Tag" dialog was opened
	When User writes non-existing "Tag" in the Search field
	Then The "Tag" should not be searched

@smoke
@regression
Scenario: 13 "NOT mode"

	Given "+ Add Tag" dialog was opened
	When User clicks "NOT Mode"
	And clicks one of existing "Tag"s
	And clicks "Apply" button
	Then Variants without selected "Tag" should be displayed

@smoke
@regression
Scenario: 15 Variants with notes only

	Given "+ Add Tag" dialog was opened
	When User clicks "Variants with notes only"
	And clicks "Apply" button
	Then Only variants with notes should be displayed

@regression
Scenario:  16 "Variants with notes only" + "Not mode"

	Given "+ Add Tag" dialog was opened
	When User clicks "Variants with notes only"
	And Clicks "NOT Mode"
	And Clicks "Apply" button
	Then Only variants without notes should be displayed
