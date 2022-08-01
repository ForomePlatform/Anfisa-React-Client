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

@regression
Scenario Outline: 04 Search by attribute's lower-case "<AttributeLower>" value
	When user enters "<AttributeLower>" in the search field
	Then the "<AttributeName>" should be found

Examples:
	| AttributeLower | AttributeName |
	| qd             | QD            |
	| fs             | FS            |

@regression
Scenario Outline: 05 "Select All" button for "<AttributeName>" values
	When user clicks the "<AttributeName>"
	And clicks "Select All" button
	Then all check-boxes should be checked

Examples:
	| AttributeName |
	| Callers       |
	| Has_Variant   |

@regression
Scenario Outline: 06 "Clear All" button for "<AttributeName>" values
	When user clicks the "<AttributeName>"
	And clicks "<AttributeValue1>"
	And clicks "<AttributeValue2>"
	And clicks "Clear All" button
	Then all check-boxes should be unchecked

Examples:
	| AttributeName | AttributeValue1 | AttributeValue2 |
	| Callers       | GATK_DE_NOVO    | GATK_HOMO_REC   |
	| Has_Variant   | father [HG003]  | proband [HG002] |

Scenario: 07 Collapse all groups
	When user clicks the "Collapse all groups" button near search field
	Then all attributes' groups should be collapsed

Scenario: 08 Expand all groups
	Given all attributes' groups were collapsed
	When user clicks the "Expand all groups" button near search field
	Then all attributes' groups should be expanded

Scenario: 09 Collapse one group
	Given all attributes' groups were expanded
	When user clicks any group name
	Then the group should be collapsed

Scenario: 10 Expand one group
	Given one attribute's group was collapsed
	When user clicks the collapsed attributes' group name
	Then the group should be expanded

Scenario: 11 Back to attributes list - Scroll saving
	When user scrolls the list down
	And clicks any attribute
	And the attribute's dialog is open
	And user clicks the "Back to Attributes List" button
	Then "Select attribute" dialog should be displayed
	And the list position should be saved
