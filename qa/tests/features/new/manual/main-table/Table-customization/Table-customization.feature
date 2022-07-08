@regression
Feature: Main table, Table customization
  As the Anfisa user I want to customize Main Table
 

Scenario: 01 No "Gene" and "Variants" columns

	Given Main Table for the "PGP3140_wgs_panel_hl" dataset was opened
	When  User clicks "X" button on variant drawer
	And user clicks "Customize table" button
	Then Customize table dialog should be opened
    And "Gene" And "Variant" columns should not be presented

Scenario: 02 Compact view

	Given Customize table dialog was opened
	When  Checks "Compact view"
	And clicks "Apply" button
	Then Compact View should be shown.

Scenario: 03 Cozy view

	Given Customize table dialog was opened
	When  Checks "Cozy view"
	And clicks "Apply" button
	Then Cozy View should be shown.

Scenario: 04 Clear all columns

	Given Customize table dialog was opened
	When  User clicks "Clear all" button
	And clicks "Apply" button
	Then All columns should be cleared, only "Gene" And "Variant" columns should be displayed.

Scenario: 05 Select all columns

	Given Customize table dialog was opened
	And All columns were cleared except "Gene" and "Variant" columns
	When  User clicks "Select all" button
	And clicks "Apply" button
	Then All columns should be displayed on the screen.

Scenario: 06 Turn off one column

	Given Customize table dialog was opened
	When  User turns off one of the columns
	And clicks "Apply" button
	Then chosen column should not be shown on screen

Scenario: 07 Turn on one column

	Given Customize table dialog was opened
	And One column was turned off
	When  User turns on the column again
	And clicks "Apply" button
	Then chosen column should be turned on

Scenario: 08 Move column

	Given Customize table dialog was opened
	When  User moves the "Filter" column to the first place
	And clicks "Apply" button
	Then The "Filter" column should be in the third place
	And "Gene" And "Varian" columns should be in the first And second places.