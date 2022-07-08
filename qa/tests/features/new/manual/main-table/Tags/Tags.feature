@regression
Feature: Main table, Filter by Tag
    As the Anfisa user I want to filter variants list by Tag


Scenario: 01 Tags correspond to the dataset

	Given The "Main Table" for the WS dataset was opened
	When User clicks "+ Add Tag" button 
	Then "Tag" dialog should be displayed
	And Tags should correspond to the dataset


Scenario: 02 Select a tag without applying

	Given Tag dialog was opened
	When User checks one tag
	And "Tag" dialog is opened
	And User clicks a tag
	Then Tag should be checked but should not be added to the panel


Scenario: 03 Add filter by one tag

	Given Tag dialog was opened
	When User checks any existing tag
	And Clicks "Apply" button
	Then Variants list should be filtered by selected tag


Scenario: 04  Add filter by a few tags

	Given Tag dialog was opened
	When User checks few existing tags
	And Clicks "Apply" button
	Then Variants list should be filtered by selected tags

Scenario: 05 Edit filter

	Given A few tags were added
	When User clicks "+" button near selected tags
	And Adds or removes some tags from the "Tag" dialog
	And Clicks "Apply" button
	Then Variants list should be filtered by newly selected tags

Scenario: 06 Clear All

	Given A few tags were added
	When User clicks "+" button near selected tags
	And Clicks "Clear all" button
	And Clicks "Apply" button
	Then All chosen tags should be cleared

Scenario: 07 Cancel or "X"

	Given Tag dialog was opened
	When User checks few existing tags 
	And Clicks "Cancel" or "X" button
	Then Variants should not be filtered by tags (no filter's changed)

Scenario: 08 Clear applied tag with "X" button

    Given One tag was applied
	When User Clicks "X" button near the tag
	Then Applied tag should be cleared
	And Variants should be filtered

Scenario: 09 Search by valid tag name

	Given Tag dialog was opened
	When User writes valid tag name in the Search field
	Then The tag should be searched

Scenario: 10 Search by tag (substring)

	Given Tag dialog was opened
	When User writes substring of the valid tag name in the Search field
	Then The tag should be searched

Scenario: 11 Search by tag (lower-case)

	Given Tag dialog was opened
	When User writes valid tag name with lower-case in the Search field
	Then The tag should be searched

Scenario: 12 Search by tag (upper-case)

	Given Tag dialog was opened
	When User writes valid tag name with upper-case in the Search field
	Then The tag should be searched

Scenario: 13 Search by random row

	Given Tag dialog was opened
	When User writes non-existing tag in the Search field
	Then The tag should not be searched

Scenario: 14 NOT mode

	Given "Tag" dialog was opened
	When User clicks "NOT Mode"
	And clicks one of existing tags
	And clicks "Apply" button
	Then Variants without selected tag should be displayed

Scenario: 15 Variants with notes only

	Given "Tag" dialog was opened
	When User clicks "Variants with notes only"
	And clicks "Apply" button
	Then Only variants with notes should be displayed

Scenario:  16 Variants with notes only + Not mode

	Given "Tag" dialog was opened
	When User clicks "Variants with notes only"
	And Clicks "NOT Mode"
	And Clicks "Apply" button
	Then Only variants without notes should be displayed
