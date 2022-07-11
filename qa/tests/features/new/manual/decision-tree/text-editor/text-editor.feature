@regression
Feature: Decision Tree Panel, Text Editor
  As the Anfisa user I want to edit a decision tree via Text Editor dialog

	Scenario: 01 Text editor can be opened without data in the tree
		Given the "Decision Tree Panel" for XL dataset was opened
		When user clicks "Text editor" button 
		Then the "Text editor" dialog should be opened
		And "return False" row should be present in the dialog

	Scenario: 02 Dark mode can be turned on 
		Given the "Decision Tree Panel" for XL dataset was opened
		And "Text editor" was opened
		When user pushes the "dark mode" switch
		Then the "dark mode" should be turned on in the dialog

	Scenario: 03 Dark mode is saved after dialog is closed
		Given the "Decision Tree Panel" for XL dataset was opened
		And "dark mode" was turned on in "Text editor" dialog 
		When user closes "Text editor" dialog
		And opens it again
		Then "dark mode" should be turned on

	Scenario: 04 Dark mode can be turned off
		Given the "Decision Tree Panel" for XL dataset was opened
		And "dark mode" was turned on in "Text editor" dialog
		When user pushes the "dark mode" switch again
		Then "dark mode" should be off 

	Scenario: 05 Light mode is saved after dialog is closed
		Given the "Decision Tree Panel" for XL dataset was opened
		And "dark mode" was turned off
		When user closes "Text editor" dialog
		And opens it again
		Then "dark mode" should be turned off

	Scenario: 06 Close via Cross button
		Given the "Decision Tree Panel" for XL dataset was opened
		And "Text editor" was opened
		When user adds an additional valid attribute condition value manually
		And closes the dialog via "x" button
		Then the dialog should be closed
		And changes should not be saved

	Scenario Outline: 07 Add attribute to the first step via Decision Tree
		Given the "Decision Tree Panel" for XL dataset was opened
		When user clicks the "+ Add attribute" button on the first step
		And clicks <Attribute Name>
		And clicks <Attribute Value>
		And clicks "+ Add Attribute" button
		And clicks "Text editor" button
		Then "Text editor" dialog should be opened
		And three rows with text "if <Attribute Name> in {<Attribute Value>}: return True return False" are present in the dialog

		Examples:
		| <Attribute Name> | <Attribute Value> |
		| Callers          | GATK_DE_NOVO      |

	Scenario Outline: 08 "Drop changes" button
		Given the "Decision Tree Panel" for XL dataset was opened
		And <Attribute Name> attribute was added to the first step with <Attribute Value>
		And "Text editor" was opened
		When user inputs <New Value> in the attribute condition manually
		And clicks the "Drop changes" button
		Then the <New Value> should be cleared

		Examples:
		| <Attribute Name> | <Attribute Value> | <New Value>     |
		| Callers          | GATK_DE_NOVO      | GATK_HOMOZYGOUS | 

	Scenario Outline: 09 Save changes locally via Done button
		Given the "Decision Tree Panel" for XL dataset was opened
		And <Attribute Name> attribute was added to the first step with <Attribute Value>
		And "Text editor" was opened
		When user inputs <New Value> in the attribute condition manually
		And clicks the "Done" button
		Then the dialog should be closed
		And changes should be saved locally
		And attributes list in the Algorithm section should not be updated

		Examples:
		| <Attribute Name> | <Attribute Value> | <New Value>     |
		| Callers          | GATK_DE_NOVO      | GATK_HOMOZYGOUS |

	Scenario Outline: 10 Save changes 
		Given the "Decision Tree Panel" for XL dataset was opened
		And <Attribute Name> attribute was added to the first step with <Attribute Value>
		And <New Value> was written manually in the attribute condition
		And was saved via "Done" button
		When user clicks "Text editor" button
		And clicks "Save" button 
		Then <New Value> should be added to the tree

		Examples:
		| <Attribute Name> | <Attribute Value> | <New Value>     |
		| Callers          | GATK_DE_NOVO      | GATK_HOMOZYGOUS |

	Scenario: 11 Saving with invalid boolean value (True, False)
		Given the "Decision Tree Panel" for XL dataset was opened
		And attribute was added to the first step
		And "Text editor" was opened
		When user changes a boolean value (True or False) with invalid value
		Then the error message should be displayed
		And "Save" and "Done" buttons should be disabled

	Scenario: 12 Saving with invalid word instead of "return"
		Given the "Decision Tree Panel" for XL dataset was opened
		And attribute was added to the first step
		And "Text editor" was opened
		When user changes "return" word with invalid value
		Then the error message should be displayed
		And "Save" and "Done" buttons should be disabled

	Scenario: 13 Return the valid value back 
		Given the "Decision Tree Panel" for XL dataset was opened
		And attribute was added to the first step
		And "Text editor" was opened
		And "return" word was replaced with invalid value
		When user changes invalid value with "return" 
		Then the error message should be hidden 
		And "Save" and "Done" buttons should be enabled

	Scenario: 14 Add non-existed value to the attribute
		Given the "Decision Tree Panel" for XL dataset was opened
		And attribute was added to the first step
		And "Text editor" was opened
		When user adds an invalid value to the attribute condition (e.g., "qwerty")
		And click the "Save" button
		Then changes should be saved
		And entered value should be displayed in "Algorithm" section source code

	Scenario: 15 Clear all data manually: invalid case
		Given the "Decision Tree Panel" for XL dataset was opened
		And "Text editor" dialog was opened
		When user clears all data in the dialog manually
		Then the error message should be displayed
		And "Save" and "Done" buttons should be disabled

	Scenario: 16 Clear all data manually: Valid case
		Given the "Decision Tree Panel" for XL dataset was opened
		And "Text editor" dialog was opened
		When user clears all data in the dialog except "return False" row
		And clicks "Save" button
		Then changes should be saved
		And steps should be empty in the "Algorithm" section

	Scenario: 17 Copy 100 rows
		Given the "Decision Tree Panel" for XL dataset was opened
		And attribute was added to the first step
		And "Text editor" was opened
		When user copies the attribute condition
		And pastes it before "return False" row until row number reaches 100
		And clicks the "Save" button
		Then changes should be saved
		And new steps should be added in "Algorithm" section
