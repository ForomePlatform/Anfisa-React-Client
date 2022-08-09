@regression
Feature: Filter Refiner, Dataset Creation

Background: 
	Given user opens the "Filter Refiner" for the "xl_PGP3140_wgs_NIST-4_2" dataset

@smoke
@tc:114387
Scenario: 01 Create dataset: valid name
	Given a filter with less than 9000 variants was loaded
	And "Add new dataset" dialog was displayed
	When user enters valid name for the dataset
	And clicks "Add dataset" button
	Then dataset should be created

@tc:114388
Scenario: 02 Create dataset: empty name
	Given a filter with less than 9000 variants was loaded
	And "Add new dataset" dialog was displayed
	When user doesn't enter a name for the dataset
	Then "Add dataset" button should be disabled

@tc:114389
Scenario: 03 Create dataset: duplicated name
	Given a filter with less than 9000 variants was loaded
	And "Add new dataset" dialog was displayed
	When user enters name for the dataset that already exists
	And clicks "Add dataset" button
	Then "Add dataset" button should be disabled

@tc:114390
Scenario Outline: 04 Create dataset: invalid "<InvalidDatasetName>" name
	Given a filter with less than 9000 variants was loaded
	And "Add new dataset" dialog was displayed
	When user inputs "<InvalidDatasetName>" in the name field
	Then error message "Incorrect dataset name" should be displayed 
	And "Add dataset" button should be disabled

Examples:
	| InvalidDatasetName    |
	| 1test_dataset         |
	| !test_dataset         |
	| test dataset          |
	| 251_random_characters | #type 251 random symbols here

@tc:114391
Scenario: 05 Create dataset: too many variants
	Given a filter with more than 9000 variants was loaded
	And "Add new dataset" dialog was displayed
	When user enters name for a dataset
	And clicks "Add dataset" button
	Then dataset should not be created
	And validation message should appear

@tc:114392
Scenario: 06 Cancel dataset creation
	Given a filter with less than 9000 variants was loaded
	And "Add new dataset" dialog was displayed
	When user enters name for dataset
	And clicks "Cancel" button
	Then dataset creation should be canceled

@tc:114393
Scenario: 07 Close "Add new dataset" dialog during creation
	Given a filter with less than 9000 variants was loaded
	And "Add new dataset" dialog was displayed
	When user enters name for dataset
	And clicks "Add dataset" button
	And clicks "X" button
	Then creation process should not be canceled
	And validation message should appear
