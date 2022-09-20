Feature: Main table, Dataset Creation
As the Anfisa user I want to create a new dataset based on the variants on the Main Table page

Background: 
	Given Main Table for "PGP3140_wgs_panel_hl" dataset was opened

@smoke
@regression
@tc:114093
Scenario: 01 Save a new dataset with preset

	When User clicks "Select Filter Preset"
	And Clicks "@SEQaBOO_Hearing_Loss_v_5" preset
	And User clicks "Create Derive DS"
	And Writes valid name for the dataset
	And clicks "Add dataset"
	Then Dataset should be saved
	And Panel with "Open It" button should be shown

@smoke
@regression
@tc:114094
Scenario: 02 Open newly created dataset with "Open It" button

	Given User applied preset
	And Opened "Create Derived DS" dialog
	And Typed correct data and clicked "Create"
	And Waited until "Open It" button was shown
	When User clicks "Open It" button
	Then Main table of created dataset should be opened
	And Variants should correspond to created dataset

@regression
@tc:114095
Scenario: 03 Try to save dataset with only zone filters

	When User clicks "+ Add Gene"
	And Checks "ABCD1" check-box
	And Clicks "Apply"
	Then "Create Derive DS" button should be disabled

@regression
@tc:114096
Scenario: 04 Save a new dataset without any applied filters

	When User clicks "Create Derive DS" without applying Filter Preset or Filter Refiner condition
	Then "Create Derive DS" button should be disabled

@regression
@tc:114097
Scenario: 05 Save a new dataset with filter by "Gene" And preset

	Given User applied "@InSilico_Possibly_Damaging" preset
	And 43 variants are shown
	When User clicks "+ Add Gene" button
	And Checks "ABHD12" gene
	And Clicks "Apply" button
	And 1 variant is shown
	And Clicks "Create Derive DS"
	And Writes valid name for the dataset
	And Clicks "Add dataset"
	And Clicks "Open It"
	Then Main table of newly created dataset should be opened
	And 43 variant should be shown again

@regression
@tc:114098
Scenario: 06 Save a new dataset with filter by "Gene List" And preset

	Given User applied "@InSilico_Possibly_Damaging" preset
	And 43 variants are shown
	When User clicks "+ Add Gene List" button
	And Clicks "All_Hearing_Loss" gene list
	And Clicks "Apply" button
	And 36 variants are shown
	And Clicks "Create Derive DS"
	And Writes name for the dataset
	And Clicks "Add dataset"
	And Clicks "Open It"
	Then Main table of newly created dataset should be opened
	And 43 variant should be shown again

@regression
@tc:114099
Scenario: 07 Save a new dataset with filter by "Sample" And preset

	Given User applied "@InSilico_Possibly_Damaging" preset
	And 43 variants are shown
	When User clicks "+ Add Samples" button
	And Checks "mother [HG004]" sample
	And Clicks "Apply" button
	And 24 variants are shown
	And Clicks "Create Derive DS"
	And Writes valid name for the dataset
	And Clicks "Add dataset"
	And Clicks "Open It"
	Then Main table of newly created dataset should be opened
	And 43 variant should be shown again

@regression
@tc:114100
Scenario: 08 Save a new dataset with filter by "Tag" And preset

	Given User applied "@InSilico_Possibly_Damaging" preset
	And 43 variants are shown
	When User adds custom tag to the first variant
	And User clicks "+ Add Tag" button
	And Checks newly created custom tag
	And Clicks "Apply" button
	And 1 variant is shown
	And Clicks "Create Derive DS"
	And Writes valid name for the dataset
	And Clicks "Add dataset"
	And Clicks "Open It"
	Then Main table of newly created dataset should be opened
	And 43 variant should be shown again

@regression
@tc:114101
Scenario: 09 Try to create a dataset without name

	Given User applied "@InSilico_Possibly_Damaging" preset
	When User clicks "Create Derive DS"
	And Writes no name for the dataset
	Then "Add dataset" button should be disabled

@regression
@tc:114102
Scenario: 10 Try to create a dataset with duplicated name (dataset with this name already exists)

	Given User applied "@InSilico_Possibly_Damaging" preset
	When User clicks "Create Derive DS"
	And Writes name for the dataset that already exists
	And Clicks "Add dataset"
	Then Dataset should not be created
	And Validation message should be shown
 
@regression
@tc:114103
Scenario Outline: 11 Try to create a dataset with invalid name "<Name1>"

	Given User applied "@InSilico_Possibly_Damaging" preset
	When User clicks "Create Derive DS"
	And Writes the name "<Name1>" for a dataset
	Then "Add dataset" button should be disabled
	And Validation message should be shown 

Examples: 
	| Name1     |
	| For!@#    |
	| 123Forome |
	| For ome   |
	|251_random_characters| #type 251 random symbols here
			  
@tc:114104
Scenario: 12 Cancel dataset

	Given User applied "@InSilico_Possibly_Damaging" preset
	When User clicks "Create Derive DS"
	And Writes valid name for the dataset
	And Clicks "Cancel" button
	Then Dataset creation should be canceled

@tc:114105
Scenario: 13 Creation dataset process cannot be canceled

	Given User applied "@InSilico_Possibly_Damaging" preset
	When User clicks "Create Derive DS"
	And Enters valid name for the dataset
	And Clicks "Add dataset"
	And Create dialog is shown
	And User clicks "Cancel" or "X" button
	Then creation process should not be canceled
	And validation message "Dataset creation has not been finished yet" should be shown
