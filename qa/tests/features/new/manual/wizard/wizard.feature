@regression
Feature: Main page, Wizard

Background: 
	Given user opened anfisa main page

Scenario: 01 Open "Main Table" for WS dataset
	When user clicks any WS dataset
	And "View all variants" radio button is checked in the right down corner
	And user clicks "Open" button 
	Then the "Main Table" for chosen dataset should be opened

Scenario: 02 Open "Filter Refiner" for WS dataset
	When user clicks any WS dataset 
	And checks "Explore data or build new filter" radio button in the right down corner
	And clicks "Open" button
	Then the "Filter Refiner" for chosen dataset should be opened

Scenario: 03 Open "Main Table" for derived dataset
	When user clicks any dataset with derived datasets 
	And checks "Use an existing candidate set" radio button
	And clicks "Continue" button
	And chooses derived dataset from "Existing candidate sets" window
	And clicks "Open" button
	Then the "Main Table" for chosen dataset should be opened

Scenario: 04 "Main Table" in "You previously worked with" field 
	 Given the "Main Table" for "PGP3140_wgs_panel_hl" dataset was opened 
	 When user goes back to the main page
	 And clicks "PGP3140_wgs_panel_hl" dataset 
	 Then "You previously worked with" field should be displayed in the upper right part of the screen
	 And "View Variants | PGP3140_wgs_panel_hl" should be written in "You previously worked with" field

Scenario: 05 "Filter Refiner" in "You previously worked with" field 
	Given the "Filter Refiner" for "xl_PGP3140_wgs_NIST-4_2" dataset was opened
	When user goes back to the main page
	And clicks "xl_PGP3140_wgs_NIST-4_2" dataset
	Then "You previously worked with" field should be displayed in the upper right part of the screen
	And "Simple Filter | xl_PGP3140_wgs_NIST-4_2" should be written in "You previously worked with" field

Scenario: 06 "Decision Tree Panel" in "You previously worked with" field 
	Given the "Decision Tree Panel" for "xl_PGP3140_wgs_panel_hl" dataset was opened 
	When user goes back to the main page
	And clicks "xl_PGP3140_wgs_panel_hl" dataset
	Then "You previously worked with" field should be displayed in the upper right part of the screen
	And "Inclusion/Exclusion Criteria | xl_PGP3140_wgs_panel_hl" should be written in "You previously worked with" field

Scenario: 07 "Edit choice" button
	When user clicks any XL dataset
	And "Whole genome/exome" radio button is checked in "Start with" block
	And clicks "Continue" button
	And user clicks "Edit choice" button along "Whole genome/exome" radio button
	Then second window should be closed
	And user should be able to change the choice

Scenario: 08 Add description to WS dataset
	When user clicks any WS dataset
	And clicks "Pencil" sign near the "Description"
	And writes any description
	Then the description should be saved in couple of seconds
	And message about description saving should be shown

Scenario Outline: 09 Open "Filter Refiner" with additional "<PresetName>" preset filter for WS dataset
	When user clicks "PGP3140_wgs_panel_hl" dataset
	And checks "Apply additional preset filter" radio button
	And chooses "<PresetName>" from "Additional preset filters" list
	And clicks "Open" button
	Then the "Filter Refiner" for chosen filter should be opened

Examples: 
	| PresetName          |
	| @BGM_De_Novo        |
	| @BGM_Homozygous_Rec |
	| @InSilico_Damaging  |
	| @Loss_Of_Function   |
	| @X_Linked           |

Scenario Outline: 10 Open "Decision Tree" with additional "<PresetName>" preset filter for WS dataset
	When user clicks "PGP3140_wgs_panel_hl" dataset
	And checks "Apply additional preset filter" radio button
	And chooses "<PresetName>" from "Additional preset filters" list
	And clicks "Open" button
	Then the "Decision Tree Panel" for chosen filter should be opened

Examples: 
	| PresetName                     |
	| @BGM Research                  |
	| @Hearing Loss, v.5             |
	| @All Rare Variants             |
	| @ACMG59 Variants               |
	| @Possibly_Damaging_Predictions |

Scenario: 11 "What's next?" window
	When user clicks any XL dataset 
	And "Whole genome/exome" radio button is checked in "Start with" block
	And user clicks "Continue" button
	Then "What's next?" window should be displayed at the bottom of "Start with" window

Scenario: 12 "ACMG analysis"
	Given "What's next?" dialog for XL dataset was displayed 
	And "ACMG analysis" radio button was checked 
	When user clicks "continue" button 
	And selects "@ACMG59 Variants" preset from "Relevant presets" window
	And clicks "Open" button
	Then the "Decision Tree Panel" for "@ACMG59 Variants" preset should be opened

Scenario: 13 "Phenotype based analysis"
	Given "What's next?" dialog for XL dataset was displayed 
	When user checks "Phenotype based analysis" radio button
	And clicks "continue" button 
	And selects "@Hearing Loss, v.5" preset from "Relevant presets" window
	And clicks "Open" button
	Then the "Decision Tree Panel" for "@Hearing Loss, v.5" preset should be opened

Scenario Outline: 14 Open "Filter Refiner" with "<PresetName>" for "Genetic first analysis" 
	Given "What's next?" dialog for "xl_PGP3140_wgs_NIST-4_2" dataset was displayed
	When user checks "Genetic first analysis" radio button
	And clicks "continue" button 
	And selects "<PresetName>" from "Relevant presets" window
	And clicks "Open" button
	Then the "Filter Refiner" for chosen preset should be loaded

Examples:
	| PresetName          |
	| @In_Silico_Damaging |
	| @Impact_Splicing    |
	| @Loss_Of_Function   |

Scenario: 15 Open "Decision Tree Panel" with "<PresetName>" for "Genetic first analysis" 
	Given "What's next?" dialog for "xl_PGP3140_wgs_NIST-4_2" dataset was displayed
	When user checks "Genetic first analysis" radio button
	And clicks "continue" button 
	And selects "<PresetName>" from "Relevant presets" window
	And clicks "Open" button
	Then the "Decision Tree Panel" for chosen preset should be loaded

Examples:
	| PresetName            |
	| @BGM Research         |
	| @Trio Candidates      |
	| @Damaging_Predictions |

Scenario Outline: 16 Open "Decision Tree Panel" with custom "<DecisionTreeName>" from "What's next?" dialog
	Given the "Decision Tree Panel" for "xl_PGP3140_wgs_NIST-4_2" dataset was opened
	And custom "<DecisionTreeName>" with "<Value>" solution pack was created 
	When user goes back to the main page
	And clicks "xl_PGP3140_wgs_NIST-4_2" dataset
	And clicks "Continue" when "Whole genome/exome" radio button is checked
	And clicks "<Value>" radio button
	And clicks "Continue" button
	And clicks "<DecisionTreeName>" in "Relevant presets" window
	And clicks "Open" button 
	Then the "Decision Tree Panel" for "<DecisionTreeName>" should be opened

Examples:
	| DecisionTreeName    | Value                    |
	| decision_tree_one   | ACMG analysis            |
	| decision_tree_two   | Phenotype based analysis |
	| decision_tree_three | Genetic first analysis   |

Scenario Outline: 17 Open "Filter Refiner" with custom "<PresetName>" from "What's next?" dialog
	Given the "Filter Refiner" for "xl_PGP3140_wgs_NIST-4_2" dataset was opened
	And custom "<PresetName>" with "<Value>" solution pack was created
	When user goes back to the main page
	And clicks "xl_PGP3140_wgs_NIST-4_2" dataset
	And clicks "Continue" when "Whole genome/exome" radio button is checked
	And clicks "<Value>" radio button
	And clicks "Continue" button
	And clicks "<PresetName>" in "Relevant presets" window
	And clicks "Open" button 
	Then the "Filter Refiner" for "<PresetName>" should be opened

Examples: 
	| PresetName   | Value                    |
	| preset_one   | ACMG analysis            |
	| preset_two   | Phenotype based analysis |
	| preset_three | Genetic first analysis   |

Scenario: 18 Open simple filter for XL dataset
	Given "What's next?" dialog for XL dataset was displayed
	When user checks "Explore data or build new filter" radio button
	And clicks "Open" button
	Then "Filter Refiner" with no selected filters should be displayed

Scenario: 19 Open "Decision Tree Panel" for XL dataset
	Given "What's next?" dialog for XL dataset was displayed
	When user checks "Build inclusion/exclusion criteria" radio button
	And clicks "Open" button
	Then "Decision Tree Panel" with no selected filters should be displayed

Scenario: 20 Undo changes
	When user clicks "xl_PGP3140_wgs_NIST-4_2" dataset
	And checks "Use an existing candidate set" radio button
	And clicks "Continue" button
	And derived datasets are shown
	And clicks "Undo" button near the dataset name
	Then last change should be undone
	And "Continue" button and radio buttons should be colored blue
	And derived datasets should not be shown

Scenario: 21 Click "MAIN" button
	Given "Use an existing candidate set" panel for "xl_PGP3140_wgs_NIST-4_2" dataset was opened
	When user clicks any derived dataset
	And checks "Apply additional preset filter" radio button
	And clicks "Continue" button
	And clicks "MAIN" button down the "Undo" button
	Then Anfisa main page with dataset list should be shown
	And none of the datasets should be chosen

Scenario: 22 Click "Start flow" button
	Given "Use an existing candidate set" panel for "xl_PGP3140_wgs_NIST-4_2" dataset was opened
	When user clicks any derived dataset
	And checks "Apply additional preset filter" radio button
	And clicks "Continue" button
	And clicks "Start flow" button
	Then page should return to "Start with" panel
	And "Continue" button and check-boxes should be colored blue
	And "General" and "Info" panels should be shown