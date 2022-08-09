@regression
Feature: Filter Refiner, Search field

Background:
	Given user opens "Filter Refiner" for the "xl_PGP3140_wgs_NIST-4_2" dataset

@smoke
@tc:114343
Scenario Outline: 01 Search by attribute's valid "<ValidNameField>" value
	When user inputs "<ValidNameField>" in the "Search" field on the left panel
	Then the "<ValidNameField>" should be found

Examples:
	| ValidNameField |
	| Rules          |
	| Symbols        |
	| SIFT           |

@tc:114344
Scenario Outline: 02 Search by attribute's substring "<Attr_Substring>" value
	When user inputs "<Attr_Substring>" in the "Search" field on the left panel
	Then the "<AttributeName>" should be found

Examples:
	| Attr_Substring | AttributeName             |
	| all            | Callers                   |
	| und_H          | Compound_Het              |
	| criteria       | Clinvar_criteria_provided |

@tc:114345
Scenario Outline: 03 Search by attribute's upper-case "<AttrInUpperCase>" value
	When user inputs "<AttrInUpperCase>" in the "Search" field on the left panel
	Then the "<AttributeName>" should be found

Examples:
	| AttrInUpperCase         | AttributeName           |
	| MOST_SEVERE_CONSEQUENCE | Most_Severe_Consequence |
	| POLYPHEN_2_HVAR         | Polyphen_2_HVAR         |
	| DISEASES                | Diseases                |

@tc:114346
Scenario Outline: 04 Search attribute name by valid "<InvalidNameField>" value
	When user enters "<InvalidNameField>" in the "Search" field on the left panel
	Then empty result should be shown

Examples:
	| InvalidNameField |
	| !Rules           |
	| Rules_           |
	| Ru.les           |
	| Rulles           |
