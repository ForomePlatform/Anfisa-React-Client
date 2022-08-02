Feature: Decision Tree Panel, Create dataset
	As the Anfisa user I want to create new datasets on the "Decision Tree Panel" page

Background:
	Given user opens the "Decision Tree Panel" for the "xl_PGP3140_wgs_NIST-4_2" dataset

@regression
@smoke
@tc:113792
Scenario: 01 Create dataset
	Given "@Hearing Loss, v.5" decision tree was loaded
	When clicks "Create Derive DS" button
	And "Add new dataset" dialog is displayed
	And user enters valid name for a dataset
	And clicks "Add dataset" button
	Then dataset should be created
	And validation message should be displayed in bottom right corner

@regression
@smoke
@tc:113793
Scenario: 02 The "Open it" button
	Given derived dataset with "@Hearing Loss, v.5" decision tree was created 
	And "Add new dataset" dialog was displayed
	When user clicks "Open it" button 
	Then the "Main Table" should be opened
	And number of variants should be equal to 41

@regression
@tc:113794
Scenario: 03 Create dataset: empty name
	Given "@Hearing Loss, v.5" decision tree was loaded
	When user clicks "Create Derive DS" button
	And "Add new dataset" dialog is displayed
	And user doesn't enter a name for the dataset
	Then "Add dataset" button should be disabled

@regression
@tc:113795
Scenario: 04 Create dataset: duplicated name
	Given "@Hearing Loss, v.5" decision tree was loaded
	When user clicks "Create Derive DS" button
	And "Add new dataset" dialog is displayed
	And user enters already existing dataset name
	And clicks "Add dataset"
	Then dataset should not be created with a duplicated name
	And the validation message should be displayed

@regression
@tc:113796
Scenario: 05 Create dataset: long name
	Given "@Hearing Loss, v.5" decision tree was loaded
	When user clicks "Create Derive DS" button
	And "Add new dataset" dialog is displayed
	And user inputs 250+ characters in name field
	Then "Add dataset" button should be disabled
	And the validation message should be displayed

@regression
@tc:113797
Scenario: 06 Create dataset with invalid "<InvalidDatasetName>"
	Given "@Hearing Loss, v.5" decision tree was loaded
	When user clicks "Create Derive DS" button
	And "Add new dataset" dialog is displayed
	And user inputs "<InvalidDatasetName>"
	Then "Add dataset" button should be disabled
	And the validation message should be displayed

Examples:
	| InvalidDatasetName |
	| 1test_dataset      |
	| !test_dataset      |
	| te st da ta set    |

@regression
@tc:113798
Scenario: 07 Create dataset: too many variants
	When user clicks "+ Add Attribute" button
	And clicks "Callers" attribute
	And checks the "GATK_DE_NOVO" check-box
	And clicks "+ Add Attribute" button
	And clicks "Create Derive DS" button
	And inputs a valid dataset name
	And clicks "Add dataset" button
	Then "Add dataset" button should be disabled
	And the validation message should be displayed

@tc:113799
Scenario: 08 Cancel dataset creation
	Given "@Hearing Loss, v.5" decision tree was loaded
	When user clicks "Create Derive DS" button
	And "Add new dataset" dialog is displayed
	And user inputs a valid dataset name
	And clicks "x" or "Cancel" button
	Then dataset should be saved
	And message in bottom right corner should be displayed

@tc:113800
Scenario: 09 Close Create Dataset dialog during creation
	Given "@Hearing Loss, v.5" decision tree was loaded
	When user clicks "Create Derive DS" button
	And "Add new dataset" dialog is displayed
	And user inputs a valid dataset name
	And clicks "Add dataset"
	And clicks "x" or "Cancel" button
	Then dataset creation should not be canceled

@regression
@smoke
@tc:113801
Scenario: 10 Save Dataset with more than 2000 Variants
	When user clicks "+ Add attribute" button on the first step
	And clicks"Callers" attribute
	And checks the "GATK_HOMOZYGOUS" check-box
	And clicks "+ Add Attribute" button
	And clicks "Create Derive DS" button
	And inputs a valid dataset name
	And clicks "Add dataset" button
	Then dataset should be saved after 10-15 seconds
	And validation message should be displayed in bottom right corner
