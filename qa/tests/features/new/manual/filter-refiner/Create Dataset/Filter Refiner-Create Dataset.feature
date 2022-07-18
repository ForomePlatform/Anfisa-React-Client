@regression
Feature: Filter Refiner Dataset Creation
@smoke
Scenario: 01 Open filter refiner for Secondary dataset
	Given Anfisa main page was loaded
	When User clicks "PGP3140_wgs_panel_hl" dataset on the left panel
	And clicks "Open" drop-down
	And clicks "Filter Refiner" in "Open" drop-down
	Then Filter Refiner for Secondary dataset should be opened

Scenario: 02 Create dataset: empty name
	Given Filter Refiner for "xl_PGP3140_wgs_NIST-4_2" dataset was opened
	And Some Filter with less than 9000 variants was loaded
	And "Add new dataset" dialog was displayed
	When user doesn't enter a name for the dataset
	Then "Add dataset" button should be disabled

Scenario: 03 Create dataset: duplicated name
	Given Filter Refiner for "xl_PGP3140_wgs_NIST-4_2" dataset was opened
	And Some Filter with less than 9000 variants was loaded
	And "Add new dataset" dialog was displayed
	When user enters name for the dataset that already exists
	And clicks on "Add dataset" button
	Then "Add dataset" button should be disabled

Scenario: 04  Create dataset: long name
	Given Filter Refiner for "xl_PGP3140_wgs_NIST-4_2" dataset was opened
	And Some Filter with less than 9000 variants was loaded
	And "Add new dataset" dialog was displayed
	When user enters name for a dataset with more than 255 characters.
	And clicks on "Add dataset" button
	Then "Add dataset" button should be disabled
	And validation message should be displayed

Scenario: 05 Create dataset: start with numeric
	Given Filter Refiner for "xl_PGP3140_wgs_NIST-4_2" dataset was opened
	And Some Filter with less than 9000 variants was loaded
	And "Add new dataset" dialog was displayed
	When user enters name for a dataset with name "1anfisa"
	Then "Add dataset" button should be disabled
	And validation message should be displayed

Scenario: 06 Create dataset: start with special character
	Given Filter Refiner for "xl_PGP3140_wgs_NIST-4_2" dataset was opened
	And Some Filter with less than 9000 variants was loaded
	And "Add new dataset" dialog was displayed
	When user enters name for a dataset with name "!anfisa"
	Then "Add dataset" button should be disabled
	And validation message should be displayed

Scenario: 07 Create dataset: name with spaces
	Given Filter Refiner for "xl_PGP3140_wgs_NIST-4_2" dataset was opened
	And Some Filter with less than 9000 variants was loaded
	And "Add new dataset" dialog was displayed
	When user enters name for a dataset with name "an fisa"
	Then "Add dataset" button should be disabled
	And validation message should be displayed

Scenario: 08 Create dataset: too many variants
	Given Filter Refiner for "xl_PGP3140_wgs_NIST-4_2" dataset was opened
	And Some Filter with more than 9000 variants was loaded
	And "Add new dataset" dialog was displayed
	When user enters name for a dataset
	And clicks on "Add dataset" button
	Then Dataset should not be created
	And Validation message should appear

Scenario: 10 Cancel dataset creation
	Given Filter Refiner for "xl_PGP3140_wgs_NIST-4_2" dataset was opened
	And Some Filter with less than 9000 variants was loaded
	And "Add new dataset" dialog was displayed
	When user enters name for dataset
	And clicks on "Cancel" button
	Then Dataset creation should be canceled

Scenario: 11 Close "Add new dataset" dialog during creation
	Given Filter Refiner for "xl_PGP3140_wgs_NIST-4_2" dataset was opened
	And Some Filter with less than 9000 variants was loaded
	And "Add new dataset" dialog was displayed
	When user enters name for dataset
	And clicks on "Add dataset" button
	And clicks on "X" button
	Then creation process should not be canceled
	And Validation message should appear





#Scenario: 02 Create dataset: empty name
#	Given Filter Refiner for "xl_PGP3140_wgs_NIST-4_2" dataset was opened
#	When The user loads some Filters
#	And clicks on "Create Derived DS" button
#	And user doesn't enter a name for the dataset
#	Then "Add dataset" button should be disabled
#
#Scenario: 03 Create dataset: duplicated name
#	Given Filter Refiner for "xl_PGP3140_wgs_NIST-4_2" dataset was opened
#	When The user loads some Filters
#	And clicks on "Create Derived DS" button
#	And enters name for the dataset that already exists
#	And clicks "Add dataset" button
#	Then dataset should not be created with a duplicated name
#	And validation message should be displayed
#
#Scenario: 04  Create dataset: long name
#	Given Filter Refiner for "xl_PGP3140_wgs_NIST-4_2" dataset was opened
#	When The user loads some Filters
#	And clicks on "Create Derived DS" button
#	And enters name for a dataset with more than 255 characters.
#	Then "Add dataset" button should be disabled
#	And validation message should be displayed
#
#Scenario: 05 Create dataset: start with numeric
#	Given Filter Refiner for "xl_PGP3140_wgs_NIST-4_2" dataset was opened
#	When The user loads some Filters
#	And clicks on "Create Derived DS" button
#	And enters name for a dataset with name "1anfisa"
#	Then "Add dataset" button should be disabled
#	And validation message should be displayed


