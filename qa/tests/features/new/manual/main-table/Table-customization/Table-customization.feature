@regression
Feature: Main table, Table customization
  As the Anfisa user I want to customize Main Table
 
 Background: 
	Given Main table of "PGP3140_wgs_panel_hl" dataset was opened
	And Variant drawer was closed with "X" button

@tc:114143
Scenario: 01 No "Gene" and "Variants" columns

	When Clicks "Customize table" button
	Then Customize table dialog should be opened
    And "Gene" And "Variant" columns should not be presented

@tc:114144
Scenario: 02 Compact view

	Given Customize table dialog was opened
	When  User checks "Compact view"
	And Clicks "Apply" button
	Then Compact View should be shown.

@tc:114145
Scenario: 03 Cozy view

	Given Customize table dialog was opened
	When  User checks "Cozy view"
	And clicks "Apply" button
	Then Cozy View should be shown.

@smoke
@tc:114146
Scenario: 04 Clear all columns

	Given Customize table dialog was opened
	When  User clicks "Clear all" button
	And Clicks "Apply" button
	Then All columns should be cleared, only "Gene" And "Variant" columns should be displayed.

@smoke
@tc:114147
Scenario: 05 Select all columns

	Given Customize table dialog was opened
	And All columns were cleared except "Gene" and "Variant" columns
	When  User clicks "Select all" button
	And Clicks "Apply" button
	Then All columns should be displayed on the screen.

@tc:114148
Scenario: 06 Turn off one column

	Given Customize table dialog was opened
	When  User turns off one of the columns
	And Clicks "Apply" button
	Then chosen column should not be shown on screen

@tc:114149
Scenario: 07 Turn on one column

	Given Customize table dialog was opened
	And One column was turned off
	When  User turns on the column again
	And Clicks "Apply" button
	Then chosen column should be turned on

@tc:114150
Scenario: 08 Move column

	Given Customize table dialog was opened
	When  User moves the "Filter" column to the first place
	And Clicks "Apply" button
	Then The "Filter" column should be in the third place
	And "Gene" And "Varian" columns should be in the first And second places.
