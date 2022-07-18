@regression
@smoke
Feature: Filter Refiner Search Field

Scenario Outline: 01 load a preset for XL dataset
	Given "Filter Refiner" for the "xl_PGP3140_wgs_NIST-4_2" dataset was opened
	When user clicks on "Select Filter Preset" drop-down
	And selects the preset <Preset Name>
	And clicks on "Apply Filter" button
	Then the selected preset should be loaded

Examples:
	| Preset Name         |
	| @Loss_Of_Function   |
	| @In_Silico_Damaging |
	| @Impact_Splicing    |

Scenario Outline: 02 load a preset for Secondary dataset
	Given the "Filter Refiner" for the "PGP3140_wgs_panel_hl" dataset was opened
	When user clicks on "Select Filter Preset" drop-down
	And selects the preset <Preset Name>
	And clicks on "Apply Filter" button
	Then the selected preset should be loaded

Examples:
	| Preset Name               |
	| @BGM_De_Novo              |
	| @SEQaBOO_Hearing_Loss_v_5 |
	| @SEQaBOO_ACMG59           |

Scenario Outline: 03 Create a preset
	Given the "Filter Refiner" for the "xl_PGP3140_wgs_NIST-4_2" dataset was opened
	And Callers attribute with "GATK_HOMOZYGOUS" value was added
	When user clicks on "Create Preset"
	And enters the <Preset Name>
	And clicks on "Create" button
	Then the preset should be created
	And information message should be appeared
	And the preset should be presented in the presets list

Examples:
	| PresetName                  |
	| preset                      |
	| preset_preset               |
	| preset_preset_preset_preset |

Scenario: 04 Create a preset without attributes
	Given the "Filter Refiner" for the "xl_PGP3140_wgs_NIST-4_2" dataset was opened
	When user doesn't add attribute
	Then "Create Preset" button should not be shown

Scenario: 05 Modify a custom preset
	Given the "Filter Refiner" for the "xl_PGP3140_wgs_NIST-4_2" dataset was opened
	And custom preset is loaded
	When user deletes any attribute in the right part of the screen
	And clicks on three dots near the custom preset
	And clicks on "Modify" option
	Then the preset should be modified

Scenario: 06 Join two presets
	Given the "Filter Refiner" for the "xl_PGP3140_wgs_NIST-4_2" dataset was opened
	And the "@Loss_Of_Functions" preset was loaded
	When user clicks on "Select Filter Preset" drop-down
	And selects the "@In_Silico_Damaging" preset
	And clicks on "Join" option
	Then filters from "@Loss_Of_Functions" and "@In_Silico_Damaging" presets should be merged
	And the number of variants should be equal to  1

Scenario: 07 Delete a custom preset
	Given the "Filter Refiner" for the "xl_PGP3140_wgs_NIST-4_2" dataset was opened
	When user clicks the "Select Filter Preset" drop-down
	And clicks on three dots near the custom preset
	And clicks on "Delete" option
	And user clicks on "Yes, Delete Filter Preset" button
	Then the preset should be deleted
