Feature: Decision Tree, Add attribute dialog
	As a user, I want to see Add attributes dialog, Search by attributes' names and add different attributes
	
Background:
	Given user opens the "Decision Tree Panel" for the "xl_PGP3140_wgs_NIST-4_2" dataset
	And clicks "+ Add Attribute" button
	
@regression
Scenario Outline: 01 Search by attribute's full "<AttibuteName>" value
	When user enters "<AttributeName>" in the search field
	Then the "<AttributeName>" should be found

Examples:
	| AttributeName        |
	| Callers              |
	| Region_Worst         |
	| ClinVar_Significance |

@regression
Scenario Outline: 02 Search by attribute's substring "<AttributeSubstr>" value
	When user enters "<AttributeSubstr>" in the search field
	Then the "<AttributeName>" should be found

Examples:
	| AttributeSubstr | AttributeName        |
	| ller            | Callers              |
	| ion_w           | Region_Worst         |
	| gnifican        | ClinVar_Significance |

@regression
Scenario Outline: 03 Search by attribute's upper-case "<AttributeUpper>" value
	When user enters "<AttributeUpper>" in the search field
	Then the "<AttributeName>" should be found

Examples:
	| AttributeUpper       | AttributeName        |
	| CALLERS              | Callers              |
	| REGION_WORST         | Region_Worst         |
	| CLINVAR_SIGNIFICANCE | ClinVar_Significance |