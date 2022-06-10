Feature: Main table, Filter by Tag
    As the Anfisa user I want to filter variants list by Tag

Scenario: 01 Open the Main Table page

	Given The Main page was open
	When User clicks a WS dataset
	And clicks the "Open in viewer" button
	And clicks the "Main Table" sub-menu
	Then The "Main Table" page should be opened
    ​
Scenario: 02 Tags are correspond to the dataset

	Given The "Main table" for WS dataset was open
	When User clicks the "+ Add Tag" button
	Then List of Tags should be displayed
	And Tags should correspond to the dataset

Scenario: 03 Open Main Table page to another dataset

	Given The "Main table" for WS dataset was open
	When user goes back to the Main page screen
	And clicks another WS dataset
	And clicks the "Open in viewer" button
	And clicks the "Main Table" sub-menu
	Then The "Main Table" page should be opened
    ​
Scenario: 04 Tags are correspond to the dataset

	Given The "Main table" for WS dataset was open
	When User clicks the "+ Add Tag" button
	Then List of tags should be displayed
	And Tags should correspond to the dataset
    ​
Scenario: 05 Select a tag without applying

	Given The "Main table" of the WS dataset was open
	When User clicks the "+ Add Tag" button
	And "Tag" dialog is opened
	And user chooses a few Tags
	Then Chosen Tags should be checked but should not be added to the panel

Scenario: 06 Add filter by one tag

	Given The "Main table" of the WS dataset was open
	When User clicks the "+ Add Tag" button
	And the "Tag" dialog is opened
	And user clicks any existed tag
	And clicks the "Apply" button
	Then Variants list should be filtered by selected tag
    ​
Scenario: 07 Add filter by a few tags

	Given The "Main table" of the WS dataset was open
	When User clicks the "+ Add Tag" button
	And the "Tag" dialog is opened
	And user clicks a few Tags
	And clicks the "Apply" button
	Then Variants list should be filtered by selected tags.
    ​
Scenario: 08 Edit filter

	Given Some Tags were added to the "Tag"
	When User clicks "+" button near "Tag"
	And adds/removes some tags from the "Tag"
	And clicks the "Apply" button
	Then Variants list should be filtered by newly selected tags

Scenario: 09 NOT mode

	Given The "Main table" of the WS dataset was open
	When User clicks the "+ Add Tag" button
	And the "Tag" dialog is opened
	And User clicks "NOT Mode"
	And clicks a tag
	And clicks the "Apply" button
	Then Variants without selected tag should be displayed

Scenario: 10 Variants with notes only

	Given The "Main table" of the WS dataset was open
	When User clicks the "+ Add Tag" button
	And the "Tag" dialog is opened
	And User clicks "Variants with notes only"
	And clicks the "Apply" button
	Then Only variants with notes should be displayed
    ​
Scenario: 11 Variants with notes only + Not mode

	Given The "Main table" of the WS dataset was open
	When User clicks the "+ Add Tag" button
	And the "Tag" dialog is opened
	And User clicks "Variants with notes only"
	And clicks "NOT Mode"
	And clicks a tag
	And clicks the "Apply" button
	Then Only variants without notes and checked variant should be displayed
    ​
Scenario: 12 Clear All

	Given Some tags were added to the "Tag"
	When User clicks "+" button near "Tag"
	And clicks the "Clear all" button
	And clicks the "Apply" button
	Then All chosen tags should be cleared

Scenario: 13 Cancel or "X"

	Given The "Main table" of the WS dataset was open
	When User clicks the "+ Add Tag" button
	And the "Tag" dialog is opened
	And User adds a few tags
	And clicks the "Cancel" or "X" button
	Then variants should not be filtered by tags (no filter's changed)

Scenario: 14 Search by Tag

	Given The "Main table" of the WS dataset was open
	When User clicks the "+ Add Tag" button
	And the "Tag" dialog is opened
	And User enters existed Tag in the Search field
	Then The Tag should be found
    ​
Scenario: 15 Search by Tag (substring)

	Given The "Main table" of the WS dataset was open
	When User clicks the "+ Add Tag" button
	And the "Tag" dialog is opened
	And User enters existed Tag substring in the Search field
	Then The Tag should be found

Scenario: 16 Search by Tag (lower-case)

	Given The "Main table" of the WS dataset was open
	When User clicks the "+ Add Tag" button
	And the "Tag" dialog is opened
	And User enters existed Tag with lowercase in the Search field
	Then The Tag should be found
    ​
Scenario: 17 Search by Tag (upper-case)

	Given The "Main table" of the WS dataset was open
	When User clicks the "+ Add Tag" button
	And the "Tag" dialog is opened
	And User enters existed Tag with uppercase in the Search field
	Then The Tag should be found
    ​
Scenario: 18 Search by random row

	Given The "Main table" of the WS dataset was open
	When User clicks the "+ Add Tag" button
	And Tag  dialog is opened
	And User enters non-existed Tag in the search field
	Then Entered Tag should not be found
