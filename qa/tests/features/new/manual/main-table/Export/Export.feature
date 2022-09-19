@regression
Feature: Main table, Export
As the Anfisa user I want to export variants list from the Main Table page

@smoke
@tc:114136
Scenario Outline: 01 "<Format>": Too many variants to export

	Given "Main Table" for the "PGP3140_wgs_panel_hl" dataset was opened
	When User clicks "Export report"
	And User clicks "<Format>"
	Then "There are too many variants to export. The number of variants should be less than 300" error message should be displayed

Examples: 
	| Format |
	| Excel  |
	| CSV    |

@tc:114137
Scenario Outline: 02 "<Format>" export with filters (Filter Refiner)

	Given "Main Table"  for the "PGP3140_wgs_panel_hl" dataset was opened
	When User clicks "Edit Filters" button
	And User clicks "Rules" 
	And Chooses "@Possibly_Damaging_Predictions" value
	And Clicks  "Add condition" button
	And Clicks "View variants" button
	And Clicks "OK" on preset saving window
	And "Main Table" page is open with 56 variants
	And User clicks "Export report"
	And Clicks "<Format>"
	Then Dataset should be exported in correct format
	And Should contain correct number of variants

Examples:
     | Format |
     | Excel  |
     | CSV    |


@tc:114138
Scenario Outline: 03 "<Format>" export with filter by Tag(s)

	Given "Main Table" for the "PGP3140_wgs_panel_hl" dataset was opened
	When User clicks "+ Add Tag" button
	And Chooses "Previously categorized" value
	And Clicks "Apply" button
	And User clicks "Export report"
	And Clicks "<Format>"
	Then Dataset should be exported in correct format
	And Should contain variants filtered with selected tag

Examples:
	| Format |
	| Excel  |
	| CSV    |


@smoke
@tc:114139
Scenario Outline: 04 "<Format>" export with preset

	Given "Main Table" was opened for the "PGP3140_wgs_panel_hl" dataset
	When User clicks "Select Filter Preset"
	And Clicks "@BGM_Homozygous_Rec" preset
	And clicks "Export report"
	And clicks "<Format>"
	Then Dataset should be exported in correct format

  Examples:
	| Format |
	| Excel  |
	| CSV    |

@tc:114140
Scenario: 05 Export report - No data

	Given "Main Table" was opened for the "PGP3140_wgs_panel_hl" dataset
	When User clicks "Select Filter Preset"
	And Clicks "@BGM_Compound_Het" preset
	Then "Export report" button should be disabled when there is 0 variants

@tc:114141
Scenario Outline: 06 "<Format>" export without filters

	Given "Main Table" was opened for a dataset with a number of variants less than 300
	When User clicks "Export report"
	And User clicks "<Format>"
	Then Dataset should be exported in correct format with less then 300 variants

  Examples:
	| Format |
	| Excel  |
	| CSV    |

@tc:114142
Scenario Outline: 07  "<Format>" export with Preset + Filter + Zone filter

	Given "Main Table" was opened for the "PGP3140_wgs_panel_hl" dataset
	When User clicks "+ Add Tag" button
	And Chooses "Previously categorized" value
	And Clicks "Apply" button
	And User clicks "Edit Filters" button
	And User clicks "Callers"
	And Chooses "GATK_Haplotype_Caller" value
	And Clicks "Add condition" button
	And Clicks "View variants" button
	And Clicks "OK" on preset saving window
	And User Clicks "Select Filter Preset" 
	And Clicks "@BGM_Homozygous_Rec" preset
	And Clicks "Export report"
	And Clicks "<Format>"
	Then Dataset should be exported in correct format

  Examples:  
	| Format |
	| Excel  |
	| CSV    |
