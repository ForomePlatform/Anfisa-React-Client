@regression
Feature: Filter Refiner, Preset

@smoke
Scenario Outline: 01 Load a "<Preset Name>" for XL dataset
	Given "Filter Refiner" for the "xl_PGP3140_wgs_NIST-4_2" dataset was opened
	When user clicks the "Select Filter Preset" drop-down
	And selects the preset "<Preset Name>"
	And clicks the "Apply preset" button
	Then the selected preset should be loaded

Examples:
	| Preset Name         |
	| @Loss_Of_Function   |
	| @In_Silico_Damaging |
	| @Impact_Splicing    |

@smoke
Scenario Outline: 02 Load a "<Preset Name>" for Secondary dataset
	Given the "Filter Refiner" for the "PGP3140_wgs_panel_hl" dataset was opened
	When user clicks the "Select Filter Preset" drop-down
	And selects the preset "<Preset Name>"
	And clicks the "Apply preset" button
	Then the selected preset should be loaded

Examples:
	| Preset Name               |
	| @BGM_De_Novo              |
	| @SEQaBOO_Hearing_Loss_v_5 |
	| @SEQaBOO_ACMG59           |

@smoke
Scenario Outline: 03 Create a preset with "<Preset Name>"
	Given the "Filter Refiner" for the "xl_PGP3140_wgs_NIST-4_2" dataset was opened
	And the "Callers" attribute with "GATK_HOMOZYGOUS" value was added
	When user clicks the "Create Preset" button
	And enters the "<Preset Name>"
	And clicks the "Create" button
	Then the preset should be created
	And information message should appear
	And the preset should be displayed in the presets list

Examples:
	| PresetName        |
	| test_preset_one   |
	| test_preset_two   |
	| test_preset_three |

Scenario: 04 Create a preset without attributes
	Given the "Filter Refiner" for the "xl_PGP3140_wgs_NIST-4_2" dataset was opened
	When user doesn't add attributes
	Then "Create Preset" button should not be visible

Scenario: 05 Modify a custom preset without changes
	Given the "Filter Refiner" for the "xl_PGP3140_wgs_NIST-4_2" dataset was opened
	And custom preset was loaded
	When user opens the "Select Filter Preset" drop-down
	And clicks three dots near the custom preset
	Then the "Modify" button should be disabled

@smoke
Scenario: 06 Modify a custom preset
	Given the "Filter Refiner" for the "xl_PGP3140_wgs_NIST-4_2" dataset was opened
	And custom preset was loaded
	When user deletes any attribute in the right part of the screen
	And opens the "Select Filter Preset" drop-down
	And clicks three dots near the custom preset
	And clicks the "Modify" option
	Then the preset should be modified
	And validation message should be displayed in the bottom right corner 

Scenario: 07 Join two presets
	Given the "Filter Refiner" for the "xl_PGP3140_wgs_NIST-4_2" dataset was opened
	And the "@Loss_Of_Functions" preset was loaded
	When user clicks on "Select Filter Preset" drop-down
	And selects the "@In_Silico_Damaging" preset
	And clicks the "Join" option
	Then filters from "@Loss_Of_Functions" and "@In_Silico_Damaging" presets should be merged
	And the number of variants should equal 1

@smoke
Scenario: 08 Delete a custom preset
	Given the "Filter Refiner" for the "xl_PGP3140_wgs_NIST-4_2" dataset was opened
	When user clicks the "Select Filter Preset" drop-down
	And clicks three dots near the custom preset
	And clicks the "Delete" option
	And user clicks the "Yes, Delete Filter Preset" button
	Then the preset should be deleted
	And validation message should be displayed in the bottom right corner 

Scenario: 09 Cancel deleting a custom preset
	Given the "Filter Refiner" for the "xl_PGP3140_wgs_NIST-4_2" dataset was opened
	When user clicks the "Select Filter Preset" drop-down
	And clicks three dots near the custom preset
	And clicks the "Delete" option
	And user clicks the "No, Keep Filter Preset" button
	Then the preset should not be deleted