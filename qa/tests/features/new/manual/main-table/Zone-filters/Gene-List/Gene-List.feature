Feature: Main table, Filter by "Gene list"
As the Anfisa user I want to filter variants list by "Gene list"

Background:
	Given "Main Table" of "PGP3140_wgs_panel_hl" dataset was opened

@tc:114164
Scenario: 01 Select a "Gene list" without applying

	When User clicks "+ Add Gene List" button
	And User checks one "Gene list"
	And "Gene list" dialog is opened
	And User clicks one of the "Gene list"
	Then Chosen "Gene list" should be checked but should not be added to the panel

@smoke
@regression
@tc:114165
Scenario: 02 Add filter by one "Gene list"

	Given "+ Add Gene list" dialog was opened
	When User checks any existing "Gene list"
	And Clicks "Apply" button
	Then Variants list should be filtered by selected "Gene list"
	And Selected "Gene list" should be shown instead of "+ Add Gene list" button

@regression
@tc:114166
Scenario: 03  Add filter by a few "Gene list"-s

	Given "+ Add Gene list" dialog was opened
	When User checks few existing "Gene list"-s
	And Clicks "Apply" button
	Then Variants list should be filtered by selected "Gene list"s

@regression
@tc:114167
Scenario: 04 Edit filter

	Given Few "Gene list"-s were added
	When User clicks "+" button near selected "Gene list"
	And Adds or removes some "Gene list" from the dialog
	And Clicks "Apply" button
	Then Variants list should be filtered by newly selected "Gene list"

@regression
@tc:114168
Scenario: 05 Clear All

	Given Few "Gene list"s were added
	When User clicks "+" button near selected "Gene list"s
	And Clicks "Clear all" button
	And Clicks "Apply" button
	Then All chosen "Gene list" should be cleared
	And All variants from dataset should be shown

@regression
@tc:114169
Scenario: 06 Cancel or "X"

	Given "+ Add Gene list" dialog was opened
	When User checks few existing "Gene list"
	And Clicks "Cancel" or "X" button
	Then Variants should not be filtered by "Gene list" (no filter's changed)

@regression
@tc:114170
Scenario: 07 Clear applied "Gene list" with "X" button

    Given One "Gene list" was applied
	When User Clicks "X" button near the "Gene list"
	Then Applied "Gene list" should be cleared
	And Variants should be filtered

@regression
@tc:114171
Scenario: 08 Search by valid "Gene list" name

	Given "+ Add Gene list" dialog was opened
	When User writes valid "Gene list" name in the Search field
	Then The "Gene list" should be searched

@regression
@tc:114172
Scenario: 09 Search by "Gene list" (substring)

	Given "+ Add Gene list" dialog was opened
	When User writes substring of the valid "Gene list" name in the Search field
	Then The "Gene list" should be searched

@regression
@tc:114173
Scenario: 10 Search by "Gene list" (lower-case)

	Given "+ Add Gene list" dialog was opened
	When User writes valid "Gene list" name with lower-case in the Search field
	Then The "Gene list" should be searched

@regression
@tc:114174
Scenario: 11 Search by "Gene list" (upper-case)

	Given "+ Add Gene list" dialog was opened
	When User writes valid "Gene list" name with upper-case in the Search field
	Then The "Gene list" should be searched

@regression
@tc:114175
Scenario: 12 Search by random row

	Given "+ Add Gene list" dialog was opened
	When User writes non-existing "Gene list" in the Search field
	Then The "Gene list" should not be searched
