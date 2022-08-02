Feature: Decision Tree Panel, Text Editor
	As the Anfisa user I want to edit a decision tree via Text Editor dialog

Background:
	Given user opens the "Decision Tree Panel" for XL dataset

@regression
@smoke
@tc:114038
Scenario: 01 Text editor can be opened without data in the tree
	When user clicks "Text editor" button
	Then the "Text editor" dialog should be opened
	And "return False" row should be present in the dialog

@regression
@tc:114039
Scenario: 02 Dark mode can be turned on
	Given "Text editor" was opened
	When user pushes the "dark mode" switch
	Then the "dark mode" should be turned on in the dialog

@regression
@tc:114040
Scenario: 03 Dark mode is saved after dialog is closed
	Given "dark mode" was turned on in "Text editor" dialog
	When user closes "Text editor" dialog
	And opens it again
	Then "dark mode" should be turned on

@regression
@tc:114041
Scenario: 04 Dark mode can be turned off
	Given "dark mode" was turned on in "Text editor" dialog
	When user pushes the "dark mode" switch again
	Then "dark mode" should be off

@regression
@tc:114042
Scenario: 05 Light mode is saved after dialog is closed
	Given "dark mode" was turned off
	When user closes "Text editor" dialog
	And opens it again
	Then "dark mode" should be turned off

@regression
@tc:114043
Scenario: 06 Close via Cross button
	Given "Text editor" was opened
	When user enters the following source code manually
		"""
		if Callers in {GATK_DE_NOVO}:
		return True
		"""
	And closes the dialog via "x" button
	Then the dialog should be closed
	And changes should not be saved

@regression
@smoke
@tc:114044
Scenario Outline: 07 Add attribute to the first step via Decision Tree
	When user clicks the "+ Add attribute" button on the first step
	And clicks "<AttributeName>"
	And clicks "<AttributeValue>"
	And clicks "+ Add Attribute" button
	And clicks "Text editor" button
	Then "Text editor" dialog should be opened
	And three rows with text "if "<AttributeName>" in {"<AttributeValue>"}: return True return False" are present in the dialog

Examples:
	| AttributeName | AttributeValue |
	| Callers       | GATK_DE_NOVO   |

@regression
@tc:114045
Scenario Outline: 08 "Drop changes" button
	Given "<AttributeName>" attribute was added to the first step with "<AttributeValue>"
	And "Text editor" was opened
	When user inputs "<NewValue>" in the attribute condition manually
	And clicks the "Drop changes" button
	Then the "<NewValue>" should be cleared

Examples:
	| AttributeName | AttributeValue | NewValue        |
	| Callers       | GATK_DE_NOVO   | GATK_HOMOZYGOUS |

@regression
@tc:114046
Scenario Outline: 09 Save changes in text editor via Done button
	Given "<AttributeName>" attribute was added to the first step with "<AttributeValue>"
	And "Text editor" was opened
	When user inputs "<NewValue>" in the attribute condition manually
	And clicks the "Done" button
	Then the dialog should be closed
	And changes should be saved in text editor
	And attributes list in the "Algorithm" section should not be updated

Examples:
	| AttributeName | AttributeValue | NewValue        |
	| Callers       | GATK_DE_NOVO   | GATK_HOMOZYGOUS |

@regression
@tc:114047
Scenario Outline: 10 Save changes
	Given "<AttributeName>" attribute was added to the first step with "<AttributeValue>"
	And "<NewValue>" was written manually in the attribute condition
	And was saved via "Done" button
	When user clicks "Text editor" button
	And clicks "Save" button
	Then "<NewValue>" should be added in "Algorithm" section

Examples:
	| AttributeName | AttributeValue | NewValue        |
	| Callers       | GATK_DE_NOVO   | GATK_HOMOZYGOUS |

@tc:114048
Scenario: 11 Saving with invalid boolean value (True, False)
	Given attribute was added to the first step
	And "Text editor" was opened
	When user changes a boolean value (True or False) with invalid value
	Then the error message should be displayed
	And "Save" and "Done" buttons should be disabled

@tc:114049
Scenario: 12 Saving with invalid word instead of "return"
	Given attribute was added to the first step
	And "Text editor" was opened
	When user changes "return" word with invalid value
	Then the error message should be displayed
	And "Save" and "Done" buttons should be disabled

@regression
@tc:114050
Scenario: 13 Return the valid value back
	Given attribute was added to the first step
	And "Text editor" was opened
	And "return" word was replaced with invalid value
	When user changes invalid value with "return"
	Then the error message should be hidden
	And "Save" and "Done" buttons should be enabled

@regression
@tc:114051
Scenario: 14 Add non-existed value to the attribute
	Given attribute was added to the first step
	And "Text editor" was opened
	When user adds an invalid value to the attribute condition (e.g., "qwerty")
	And click the "Save" button
	Then changes should be saved
	And entered value should be displayed in "Algorithm" section source code

@regression
@tc:114052
Scenario: 15 Clear all data manually: invalid case
	Given "Text editor" dialog was opened
	When user clears all data in the dialog manually
	Then the error message should be displayed
	And "Save" and "Done" buttons should be disabled

@regression
@tc:114053
Scenario: 16 Clear all data manually: Valid case
	Given "Text editor" dialog was opened
	When user clears all data in the dialog except "return False" row
	And clicks "Save" button
	Then changes should be saved
	And steps should be empty in the "Algorithm" section
