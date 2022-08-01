Feature: Decision Tree, Add attribute dialog
	As a user, I want to see Add attributes dialog, Search by attributes' names and add different attributes
	
Background:
	Given user opens the "Decision Tree Panel" for the "xl_PGP3140_wgs_NIST-4_2" dataset
	And clicks "+ Add Attribute" button
	
@regression
@tc:113172
Scenario Outline: 01 Search by attribute's full "<AttibuteName>" value
	When user enters "<AttributeName>" in the search field
	Then the "<AttributeName>" should be found

Examples:
	| AttributeName        |
	| Callers              |
	| Region_Worst         |
	| ClinVar_Significance |

@regression
@tc:113173
Scenario Outline: 02 Search by attribute's substring "<AttributeSubstr>" value
	When user enters "<AttributeSubstr>" in the search field
	Then the "<AttributeName>" should be found

Examples:
	| AttributeSubstr | AttributeName        |
	| ller            | Callers              |
	| ion_w           | Region_Worst         |
	| gnifican        | ClinVar_Significance |

@regression
@tc:113174
Scenario Outline: 03 Search by attribute's upper-case "<AttributeUpper>" value
	When user enters "<AttributeUpper>" in the search field
	Then the "<AttributeName>" should be found

Examples:
	| AttributeUpper       | AttributeName        |
	| CALLERS              | Callers              |
	| REGION_WORST         | Region_Worst         |
	| CLINVAR_SIGNIFICANCE | ClinVar_Significance |

@regression
@tc:113175
Scenario Outline: 04 Search by attribute's lower-case "<AttributeLower>" value
	When user enters "<AttributeLower>" in the search field
	Then the "<AttributeName>" should be found

Examples:
	| AttributeLower | AttributeName |
	| qd             | QD            |
	| fs             | FS            |

@regression
@tc:113176
Scenario Outline: 05 "Select All" button for "<AttributeName>" values
	When user clicks the "<AttributeName>"
	And clicks "Select All" button
	Then all check-boxes should be checked

Examples:
	| AttributeName |
	| Callers       |
	| Has_Variant   |

@regression
@tc:113177
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

@tc:113178
Scenario: 07 Collapse all groups
	When user clicks the "Collapse all groups" button near search field
	Then all attributes' groups should be collapsed

@tc:113179
Scenario: 08 Expand all groups
	Given all attributes' groups were collapsed
	When user clicks the "Expand all groups" button near search field
	Then all attributes' groups should be expanded

@tc:113180
Scenario: 09 Collapse one group
	Given all attributes' groups were expanded
	When user clicks any group name
	Then the group should be collapsed

@tc:113181
Scenario: 10 Expand one group
	Given one attribute's group was collapsed
	When user clicks the collapsed attributes' group name
	Then the group should be expanded

@tc:113182
Scenario: 11 Back to attributes list - Scroll saving
	When user scrolls the list down
	And clicks any attribute
	And the attribute's dialog is open
	And user clicks the "Back to Attributes List" button
	Then "Select attribute" dialog should be displayed
	And the list position should be saved
