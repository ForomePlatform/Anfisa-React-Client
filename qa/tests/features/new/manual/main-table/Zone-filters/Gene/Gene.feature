Feature: Main table, Filter by "Gene"
As the Anfisa user I want to filter variants list by "Gene"

Background:
	Given "Main Table" of "PGP3140_wgs_panel_hl" dataset was opened

@tc:113941
Scenario: 01 Select a "Gene" without applying

	When User clicks "+ Add Gene" button
	And User checks one "Gene"
	And "Gene" dialog is opened
	And User clicks one of the "Gene"s
	Then Chosen "Gene" should be checked but should not be added to the panel

@smoke
@regression
@tc:113942
Scenario: 02 Add filter by one "Gene"

	Given "+ Add Gene" dialog was opened
	When User checks any existing "Gene"
	And Clicks "Apply" button
	Then Variants list should be filtered by selected "Gene"
	And Selected "Gene" should be shown instead of "+ Add Gene" button

@regression
@tc:113943
Scenario: 03  Add filter by a few "Gene"s

	Given "+ Add Gene" dialog was opened
	When User checks few existing "Gene"s
	And Clicks "Apply" button
	Then Variants list should be filtered by selected "Gene"s

@regression
@tc:113944
Scenario: 04 Edit filter

	Given Few "Gene"s were added
	When User clicks "+" button near selected "Gene"s
	And Adds or removes some "Gene"s from the "Gene" dialog
	And Clicks "Apply" button
	Then Variants list should be filtered by newly selected "Gene"s

@regression
@tc:113945
Scenario: 05 Clear All

	Given Few "Gene"s were added
	When User clicks "+" button near selected "Gene"s
	And Clicks "Clear all" button
	And Clicks "Apply" button
	Then All chosen "Gene"s should be cleared
	And All variants from dataset should be shown

@regression
@tc:113946
Scenario: 06 Cancel or "X"

	Given "+ Add Gene" dialog was opened
	When User checks few existing "Gene"s 
	And Clicks "Cancel" or "X" button
	Then Variants should not be filtered by "Gene"s (no filter's changed)

@regression
@tc:113947
Scenario: 07 Clear applied "Gene" with "X" button

    Given One "Gene" was applied
	When User Clicks "X" button near the "Gene"
	Then Applied "Gene" should be cleared
	And Variants should be filtered

@regression
@tc:113948
Scenario: 08 Search by valid "Gene" name

	Given "+ Add Gene" dialog was opened
	When User writes valid "Gene" name in the Search field
	Then The "Gene" should be searched

@regression
@tc:113949
Scenario: 09 Search by "Gene" (substring)

	Given "+ Add Gene" dialog was opened
	When User writes substring of the valid "Gene" name in the Search field
	Then The "Gene" should be searched

@regression
@tc:113950
Scenario: 10 Search by "Gene" (lower-case)

	Given "+ Add Gene" dialog was opened
	When User writes valid "Gene" name with lower-case in the Search field
	Then The "Gene" should be searched

@regression
@tc:113951
Scenario: 11 Search by "Gene" (upper-case)

	Given "+ Add Gene" dialog was opened
	When User writes valid "Gene" name with upper-case in the Search field
	Then The "Gene" should be searched

@regression
@tc:113952
Scenario: 12 Search by random row

	Given "Gene" dialog was opened
	When User writes non-existing "Gene" in the Search field
	Then The "Gene" should not be searched
