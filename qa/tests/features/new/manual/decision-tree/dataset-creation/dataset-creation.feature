@regression
Feature: Decision Tree Panel, Create dataset
  As the Anfisa user I want to create new datasets on the "Decision Tree Panel" page

	Scenario: 01 Create dataset: empty name
		Given the "Decision Tree Panel" for the "xl_PGP3140_wgs_NIST-4_2" dataset was opened
		And "@Hearing Loss, v.5" decision tree was loaded
		When user clicks "Create Derive DS" button
		And "Add new dataset" dialog is displayed
		And user doesn't enter a name for the dataset
		Then "Add dataset" button should be disabled

	Scenario: 02 Create dataset: duplicated name
		Given the "Decision Tree Panel" for the "xl_PGP3140_wgs_NIST-4_2" dataset was opened
		And "@Hearing Loss, v.5" decision tree was loaded
		When user clicks "Create Derive DS" button
		And "Add new dataset" dialog is displayed
		And user enters already existing dataset name
		And clicks "Add dataset"
		Then dataset should not be created with a duplicated name
		And the validation message should be displayed

	Scenario: 03 Create dataset: long name
		Given the "Decision Tree Panel" for the "xl_PGP3140_wgs_NIST-4_2" dataset was opened
		And "@Hearing Loss, v.5" decision tree was loaded
		When user clicks "Create Derive DS" button
		And "Add new dataset" dialog is displayed
		And user inputs 250+ characters in name field
		Then "Add dataset" button should be disabled
		And the validation message should be displayed

	Scenario: 04 Create dataset: start with numeric
		Given the "Decision Tree Panel" for the "xl_PGP3140_wgs_NIST-4_2" dataset was opened
		And "@Hearing Loss, v.5" decision tree was loaded
		When user clicks "Create Derive DS" button
		And "Add new dataset" dialog is displayed
		And user inputs a dataset name starting with a number
		Then "Add dataset" button should be disabled
		And the validation message should be displayed

	Scenario: 05 Create dataset: start with special character 
		Given the "Decision Tree Panel" for the "xl_PGP3140_wgs_NIST-4_2" dataset was opened
		And "@Hearing Loss, v.5" decision tree was loaded
		When user clicks "Create Derive DS" button
		And "Add new dataset" dialog is displayed
		And user inputs a dataset name starting with a special character
		Then "Add dataset" button should be disabled
		And the validation message should be displayed

	Scenario: 06 Create dataset: with spaces in name
		Given the "Decision Tree Panel" for the "xl_PGP3140_wgs_NIST-4_2" dataset was opened
		And "@Hearing Loss, v.5" decision tree was loaded
		When user clicks "Create Derive DS" button
		And "Add new dataset" dialog is displayed
		And user inputs dataset name with space in the middle
		Then "Add dataset" button should be disabled
		And the validation message should be displayed

	Scenario Outline: 07 Create dataset: too many variants
		Given the "Decision Tree Panel" for the "xl_PGP3140_wgs_NIST-4_2" dataset was opened
		When user clicks "+ Add Attribute" button 
		And clicks <Attribute Name>
		And clicks <Attribute Value>
		And clicks "+ Add Attribute" button
		And clicks "Create Derive DS" button
		And inputs a valid dataset name
		And clicks "Add dataset" button
		Then "Add dataset" button should be disabled
		And the validation message should be displayed

		Examples: 
		| <Attribute Name> | <Attribute Value> |
		| Callers          | GATK_DE_NOVO      |
		| Proband_Zygosity | False             |

	Scenario: 08 Cancel dataset creation
		Given the "Decision Tree Panel" for the "xl_PGP3140_wgs_NIST-4_2" dataset was opened
		And "@Hearing Loss, v.5" decision tree was loaded
		When user clicks "Create Derive DS" button
		And "Add new dataset" dialog is displayed
		And user inputs a valid dataset name
		And clicks "x" or "Cancel" button
		Then dataset creation should be canceled

	Scenario: 09 Close Create Dataset dialog during creation
		Given the "Decision Tree Panel" for the "xl_PGP3140_wgs_NIST-4_2" dataset was opened
		And "@Hearing Loss, v.5" decision tree was loaded
		When user clicks "Create Derive DS" button
		And "Add new dataset" dialog is displayed
		And user inputs a valid dataset name
		And clicks "Add dataset"
		And clicks "x" or "Cancel" button 
		Then dataset creation should not be canceled

	Scenario Outline: 10 Save Dataset with more than 2000 Variants
		Given the "Decision Tree Panel" for the "xl_PGP3140_wgs_NIST-4_2" dataset was opened
		When user clicks "+ Add attribute" button on the first step
		And clicks <Attribute Name>
		And clicks <Attribute Value>
		And clicks "+ Add Attribute" button
		And clicks "Create Derive DS" button
		And inputs a valid dataset name
		And clicks "Add dataset" button
		Then dataset should be saved

		Examples:
		| <Attribute Name> | <Attribute Value> |
		| Callers          | GATK_HOMOZYGOUS   |
