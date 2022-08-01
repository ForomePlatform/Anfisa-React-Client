Feature: Decision Tree, Search in charts
	As a user, I want to search by attributes' names in chart

Background:
	Given user opens the "Decision Tree Panel" for "PGP3140_wgs_panel_hl" dataset

@regression
Scenario Outline: 01 Search by valid "<ValidNameField>" value
	When user inputs "<ValidNameField>" in chart search field
	Then the field should be filtered

Examples:
	| ValidNameField |
	| Callers        |
	| Multiallelic   |
	| SIFT           |

@regression
Scenario Outline: 02 Search by invalid "<InvalidNameField>" value
	When user inputs "<InvalidNameField>" in chart search field
	Then empty result should be shown

Examples:
	| InvalidNameField |
	| rECallers        |
	| 1Multiallelic    |
	| _SIFT            |

@regression
Scenario Outline: 03 Search by attribute's substring "<AttributeSubstr>" value
	When user inputs "<AttributeSubstr>" in chart search field
	Then the field should be filtered by "<AttributeName>"

Examples:
	| AttributeSubstr | AttributeName  |
	| omAD            | gnomAD_AF      |
	| invar           | Clinvar_Benign |
	| all             | Callers        |