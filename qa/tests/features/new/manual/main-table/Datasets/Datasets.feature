@regression
Feature: Main table, Dataset Creation
    As the Anfisa user I want to create a new dataset based on the variants on the Main Table page

Scenario: 01 Save a new dataset

	Given Main Table for "PGP3140_wgs_panel_hl" dataset was opened
	When User clicks "Select Filter Preset"
	And Clicks "@SEQaBOO_Hearing_Loss_v_5" preset
	And User clicks "Create Derive DS"
	And Writes valid name for the dataset
	And clicks "Add dataset"
	Then Dataset should be saved

Scenario: 02 Save a new dataset with applied filters

	Given "@SEQaBOO_Hearing_Loss_v_5" preset was applied
	When User clicks "Edit filters" button
	And Clicks "Callers" attribute
	And Chooses "BGM_CMPD_HET" value
	And Clicks "+Add Attribute" button
	And Clicks "View variants" button
	And Clicks "OK" on data saving message 
	And User clicks "Create Derive DS"
	And Writes valid name for the dataset
	And Clicks "Add dataset"
	Then Dataset should be saved

Scenario: 03 Save dataset with more than 2000 variants

	Given Main table of "PGP3140_wgs_panel_hl" dataset was opened
	When User clicks "Edit filters" button
	And Clicks "Variant_Class" attribute
	And Checks "SNV" value
	And Clicks "+Add Attribute" button
	And Clicks "View variants" button
	And Clicks "OK" on data saving message 
	And Clicks "Create Derive DS"
	And Writes valid name for the dataset
	And Clicks "Add dataset"
	Then Dataset should be saved.

Scenario: 04 Save a new dataset without any applied filters

	Given Main table of "PGP3140_wgs_panel_hl" dataset was opened
	When User clicks "Create Derive DS" without applying Filter Preset or Filter Refiner condition
	Then User should not be able to write name for dataset

Scenario: 05 Save a new dataset with filter by Gene And preset

	Given "@InSilico_Possibly_Damaging" preset was applied
	When Clicks "+Add Gene" button
	And User checks "ABHD12" gene
	And Clicks "Apply" button
	And Clicks "Create Derive DS"
	And Writes valid name for the dataset
	And Clicks "Add dataset"
	Then Dataset should be saved

Scenario: 06 Save a new dataset with filter by Gene List And preset

	Given "@InSilico_Possibly_Damaging" preset was applied
	When Clicks "+Add Gene List" button
	And Clicks "All_Hearing_Loss" gene list
	And Clicks "Apply" button
	And Clicks "Create Derive DS"
	And Writes name for the dataset
	And Clicks "Add dataset"
	Then Dataset should be saved

Scenario: 07 Save a new dataset with filter by Sample And preset

	Given "@InSilico_Possibly_Damaging" preset was applied
	When Clicks "+Add Samples" button
	And User checks "mother [NA24143]" sample
	And Clicks "Apply" button
	And Clicks "Create Derive DS"
	And Writes valid name for the dataset
	And Clicks "Add dataset"
	Then Dataset should be saved

Scenario: 08 Save a new dataset with filter by Tag And preset

	Given "@InSilico_Possibly_Damaging" preset was applied
	When User clicks "+Add Tag" button
	And Checks "Previously categorized" tag
	And Clicks "Apply" button
	And Clicks "Create Derive DS"
	And Writes valid name for the dataset
	And Clicks "Add dataset"
	Then Dataset should be saved

Scenario: 09 Try to create a dataset without name

	Given "@InSilico_Possibly_Damaging" preset was applied
	When User clicks "Create Derive DS"
	And Writes no name for the dataset
	Then "Add dataset" button should be disabled when there is not name written

Scenario: 10 Try to create a dataset with duplicated name (dataset with this name already exists)

	Given "@InSilico_Possibly_Damaging" preset was applied
	When User clicks "Create Derive DS"
	And Writes name for the dataset that already exists
	And Clicks "Add dataset"
	Then Dataset should not be created
	And Validation message should be shown

Scenario: 11 Try to create a dataset with long name (more than 250 chars)

	Given "@InSilico_Possibly_Damaging" preset was applied
	When User clicks "Create Derive DS"
	And Writes the name for a dataset with more than 250 characters
	Then "Add dataset" button should be disabled
	And Validation message should be shown 

Scenario: 12 Try to create dataset with spaces in the name

	Given "@InSilico_Possibly_Damaging" preset was applied
	When User clicks "Create Derive DS"
	And Writes name for a dataset with Space
	Then "Add dataset" button should be disabled
	And Validation message should be shown 

Scenario: 13 Try to create dataset with special chars in the name

	Given "@InSilico_Possibly_Damaging" preset was applied
	When User clicks "Create Derive DS"
	And Writes name for dataset with special character( -_+)
	Then "Add dataset" button should be disabled
	And Validation message should be shown 

Scenario: 14 Try to create dataset with name that begins from a number

	Given "@InSilico_Possibly_Damaging" preset was applied
	When User clicks "Create Derive DS"
	And Writes name for the dataset which begins with a number (5asd)
	Then "Add dataset" button should be disabled
	And Validation message should be shown 

Scenario: 15 Cancel dataset

	Given "@InSilico_Possibly_Damaging" preset was applied
	When User clicks "Create Derive DS"
	And Writes valid name for the dataset
	And Clicks "Cancel"
	Then Dataset should be canceled

Scenario: 16 Creation dataset process cannot be canceled

	Given "@InSilico_Possibly_Damaging" preset was applied
	When User clicks "Create Derive DS"
	And Enters valid name for the dataset
	And Clicks "Add dataset"
	And Create dialog is shown
	And User clicks "Cancel" or "X" button
	Then creation process should not be canceled
	And validation message "Dataset creation has not been finished yet" should be shown