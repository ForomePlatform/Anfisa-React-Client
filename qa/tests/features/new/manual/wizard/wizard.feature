@regression
Feature: Main page, Wizard

Background: 
	Given user opened anfisa main page

Scenario: 01 Open "Main Table" for WS dataset
	When user clicks any WS dataset
	And "View all variants" check-box is checked
	And user clicks "Open" button 
	Then the "Main Table" for chosen dataset should be opened

Scenario: 02 Open "Filter Refiner" for WS dataset
	When user clicks any WS dataset 
	And checks "Explore data or build new filter" check-box in the right down corner
	And clicks "Open" button
	Then the "Filter Refiner" for chosen dataset should be opened

Scenario: 03 Open "Main Table" for derived dataset
	When user clicks any dataset with derived datasets 
	And checks "Use an existing candidate set" check-box
	And clicks "Continue" button
	And chooses derived dataset 
	And clicks "Open" button
	Then the "Main Table" for chosen dataset should be opened

Scenario: 04 "You previously worked with" field 
	 When user clicks any dataset 
	 Then the information about the chosen dataset should be displayed
	 And "You previously worked with" field should be displayed in the upper right part of the screen
	 And previously opened datasets should be written 

Scenario: 05 "Edit choice" button
	When user clicks any XL dataset
	And "Whole genome/exome" check-box is checked
	And clicks "Continue" button
	And user clicks "Edit choice" button along "Whole genome/exome" check-box
	Then second window should be closed
	And user should be able to change the choice

Scenario: 06 Add description to WS dataset
	When user clicks any WS dataset
	And clicks "Pencil" sign near the "Description"
	And writes any description
	Then the description should be saved in couple of seconds
	And message about description saving should be shown

Scenario: 07 Open "Filter Refiner" with additional preset filter
	When user clicks "PGP3140_wgs_panel_hl" dataset
	And checks "Apply additional preset filter" check-box
	And chooses any preset before "@BGM Research" from "Additional preset filters" list
	And clicks "Open" button
	Then the "Filter Refiner" for chosen filter should be opened

Scenario: 08 Open "Decision Tree" with additional preset filter
	When user clicks "PGP3140_wgs_panel_hl" dataset
	And checks "Apply additional preset filter" check-box
	And chooses any preset after "@BGM Research" from "Additional preset filters" list
	And clicks "Open" button
	Then the "Decision Tree Panel" for chosen filter should be opened

Scenario: 09 "What's next?" window
	When user clicks any XL dataset 
	And "Whole genome/exome" check-box is checked 
	And user clicks "Continue" button
	Then "What's next?" window should be displayed at the bottom of "Start with" window

Scenario: 10 "ACMG analysis"
	Given "What's next?" dialog for XL dataset was displayed 
	And "ACMG analysis" check-box is checked 
	When user clicks "continue" button 
	And selects "@ACMG59 Variants" preset from "Relevant presets" window
	And clicks "Open" button
	Then the "Decision Tree Panel" for "@ACMG59 Variants" preset should be opened

Scenario: 11 "Phenotype based analysis"
	Given "What's next?" dialog for XL dataset was displayed 
	When user checks "Phenotype based analysis" check-box
	And clicks "continue" button 
	And selects "@Hearing Loss, v.5" preset from "Relevant presets" window
	And clicks "Open" button
	Then the "Decision Tree Panel" for "@Hearing Loss, v.5" preset should be opened

Scenario: 12 Open "Filter Refiner" for "Genetic first analysis" 
	Given "What's next?" dialog for "xl_PGP3140_wgs_NIST-4_2" dataset was displayed
	When user checks "Genetic first analysis" check-box
	And clicks "continue" button 
	And selects any preset before "@BGM Research" from "Relevant presets" window
	And clicks "Open" button
	Then the "Filter Refiner" for chosen preset should be loaded

Scenario: 13 Open "Decision Tree Panel" for "Genetic first analysis" 
	Given "What's next?" dialog for "xl_PGP3140_wgs_NIST-4_2" dataset was displayed
	When user checks "Genetic first analysis" check-box
	And clicks "continue" button 
	And selects any preset after "@BGM Research" from "Relevant presets" window
	And clicks "Open" button
	Then the "Decision Tree Panel" for chosen preset should be loaded

Scenario: 14 Open simple filter for XL dataset
	Given "What's next?" dialog for XL dataset was displayed
	When user checks "Explore data or build new filter" check-box
	And clicks "Open" button
	Then "Filter Refiner" with no selected filters should be displayed

Scenario: 15 Open "Decision Tree Panel" for XL dataset
	Given "What's next?" dialog for XL dataset was displayed
	When user checks "Build inclusion/exclusion criteria" check-box
	And clicks "Open" button
	Then "Decision Tree Panel" with no selected filters should be displayed

Scenario: 16 Undo changes
	When user clicks "xl_PGP3140_wgs_NIST-4_2" dataset
	And checks "Use an existing candidate set" check-box
	And clicks "Continue" button
	And derived datasets are shown
	And clicks "Undo" button near the dataset name
	Then last change should be undone
	And "Continue" button and check-boxes should be colored blue
	And derived datasets should not be shown

Scenario: 17 Click "MAIN" button
	Given "Use an existing candidate set" panel for "xl_PGP3140_wgs_NIST-4_2" dataset was opened
	When user clicks any derived dataset
	And checks "Apply additional preset filter" check-box
	And clicks "Continue" button
	And clicks "MAIN" button down the "Undo" button
	Then Anfisa main page with dataset list should be shown
	And none of the datasets should be chosen

Scenario: 18 Click "Start flow" button
	Given "Use an existing candidate set" panel for "xl_PGP3140_wgs_NIST-4_2" dataset was opened
	When user clicks any derived dataset
	And checks "Apply additional preset filter" check-box
	And clicks "Continue" button
	And clicks "Start flow" button
	Then page should return to "Start with" panel
	And "Continue" button and check-boxes should be colored blue
	And "General" and "Info" panels should be shown