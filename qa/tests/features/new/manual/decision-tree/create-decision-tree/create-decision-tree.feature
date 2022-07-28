Feature: Decision Tree Panel, Decision Trees
	As the Anfisa user I want to create custom decision trees and be able to modify and delete them

Background:
	Given user opens the "Decision Tree Panel" for the "xl_PGP3140_wgs_NIST-4_2" dataset

@regression
Scenario: 01 Create Decision Tree without attributes
	When user doesn't add attributes
	Then "Create Decision Tree" button should not be visible

@regression
Scenario: 02 "Create Decision Tree" button appears only after adding the attribute
	Given no attributes were added to the tree
	When user clicks "+ Add Attribute" button on the first step
	And clicks the "Callers" attribute
	And selects the "BGM_AUTO_DOM" Value
	And clicks the "+ Add Attribute" button
	Then "Create Decision Tree" button should appear at the top of the page

@regression
@smoke
Scenario Outline: 03 Create new Decision Tree with valid "<ValidName>" name
	Given the attribute was added to the first step of Decision Tree
	When user clicks "Create Decision Tree" button
	And "Create Decision Tree" dialog is displayed
	And user writes "<ValidName>" in the name field
	And clicks "Create" button
	Then custom Decision Tree should be created
	And validation message should appear

Examples:
	| ValidName |
	| Anfisa    |
	| test-tree |

@regression
Scenario Outline: 04 Create new Decision Tree with invalid "<InvalidName>" name
	Given the attribute was added to the first step of Decision Tree
	When user clicks "Create Decision Tree" button
	And "Create Decision Tree" dialog is displayed
	And user writes "<InvalidName>" in the name field
	And clicks "Create" button
	Then custom Decision Tree should not be created
	And validation message about invalid name should appear

Examples:
	| InvalidName |
	| 12345       |
	| !@#$%       |
	| an fisa     |

Scenario: 05 Create new Decision Tree with empty name
	Given the attribute was added to the first step of Decision Tree
	When user clicks "Create Decision Tree" button
	And "Create Decision Tree" dialog is displayed
	And user doesn't write anything in the name field
	Then "Create" button should be disabled

Scenario: 06 Cancel custom Decision Tree creation
	Given the attribute was added to the first step of Decision Tree
	When user clicks "Create Decision Tree" button
	And "Create Decision Tree" dialog is displayed
	And user writes valid name in the name field
	And clicks "Cancel" or "x" button
	Then custom Decision Tree should not be created

Scenario: 07 Create new Decision Tree with duplicated name
	Given attribute was added to the first step
	When clicks "Create Decision Tree" button
	And writes already existing decision tree name
	Then validation message should be displayed
	And "Create" button should be disabled

@regression
@smoke
Scenario: 08 Modify custom Decision Tree
	Given custom Decision Tree was added to Decision Tree
	When user adds an attribute to the first step
	And clicks "Select Decision tree" drop-down
	And clicks tree dots near custom tree
	And clicks "Modify" option
	And "Modify Decision Tree" dialog is shown
	And user clicks "Modify" button
	Then custom tree should be modified

Scenario: 09 Cancel custom Decision Tree modification
	Given custom Decision Tree was loaded
	When user adds an attribute to the first step
	And clicks "Select Decision tree" drop-down
	And clicks tree dots near custom tree
	And clicks "Modify" option
	And "Modify Decision Tree" dialog is shown
	And user clicks "Close" or "x" button
	Then custom Decision Tree should not be modified

Scenario: 10 Modify custom Decision Tree without changes
	Given custom Decision Tree was loaded
	When user clicks "Select Decision tree" drop-down
	And clicks tree dots near custom tree
	Then "Modify" button should be disabled

@regression
@smoke
Scenario: 11 Delete custom Decision Tree
	Given custom Decision Tree was loaded
	When user clicks "Select Decision tree" drop-down
	And clicks tree dots near custom tree
	And clicks "Delete" option
	And "Delete Decision Tree" dialog is shown
	And user clicks "Yes, Delete Decision Tree" button
	Then custom decision tree should be deleted
	And validation message should be displayed

Scenario: 12 Cancel custom Decision Tree deletion
	Given custom Decision Tree was loaded
	When user clicks "Select Decision tree" drop-down
	And clicks tree dots near custom tree
	And clicks "Delete" option
	And "Delete Decision Tree" dialog is shown
	And user clicks "No, Keep Decision Tree" or "x" button
	Then custom Decision Tree should not be deleted
