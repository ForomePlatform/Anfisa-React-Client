@regression
Feature: Filter Refiner, Search field

Background:
	Given Anfisa Main page was opened
	When User clicks on xl_PGP3140_wgs_NIST-4_2 dataset
	And clicks on "Open" drop-down
	And selects Filter Refiner
	Then Filter refiner for xl_PGP3140_wgs_NIST-4_2 dataset should be opened

@smoke
Scenario Outline: 01 Search attribute name by existed value
	When user inputs "<ValidNameField>" in the search field
	Then the attributes should be filtered

Examples:
	| ValidNameField |
	| Rules          |
	| Symbols        |
	| SIFT           |


Scenario Outline: 02 Search attribute name by substring
	When user inputs the part of "<Attr_Substring>" in the search field
	Then the fields should be filtered

Examples:
	| Attr_Substring | Attribute Name            |
	| all            | Callers                   |
	| und_H          | Compound_Het              |
	| criteria       | Clinvar_criteria_provided |

Scenario Outline: 03 Search attribute name by upper-case
	When user enters "<AttrInUpperCase>" in upper-case in the search field
	Then the attributes should be filtered

Examples:
	| AttrInUpperCase         | Attribute Name          |
	| MOST_SEVERE_CONSEQUENCE | Most_Severe_Consequence |
	| POLYPHEN_2_HVAR         | Polyphen_2_HVAR         |
	| DISEASES                | Diseases                |

Scenario Outline: 04 Search attribute name by non-existed value
	When user enters "<InvalidNameField>" in the search field
	Then the fields should be filtered

Examples:
	| InvalidNameField |
	| !Rules           |
	| Rules_           |
	| Ru.les           |
	| Rulles           |