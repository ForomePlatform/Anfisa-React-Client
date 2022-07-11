@regression
Feature: Decision Tree, Add attribute dialog
	As a user, I want to see Add attributes dialog, Search by attributes' names and add different attributes

	Scenario: 01 Open "Decision Tree Panel"
		Given Anfisa main page was opened
		When user clicks the "xl_PGP3140_wgs_NIST-4_2" dataset
		And clicks "Open" button
		And clicks "Decision Tree Panel" option
		Then "Decision Tree Panel" for "xl_PGP3140_wgs_NIST-4_2" dataset should be opened
	
	Scenario Outline: 02 Search by attribute's name (full)
		Given the "Decision Tree Panel" was opened for the "xl_PGP3140_wgs_NIST-4_2" dataset
		And the attribute dialog was opened via "+ Add Attribute" button 
		When user enters <Attribute Name> in the search field
		Then the <Attribute Name> should be found

		Examples: 
		| <Attribute Name>     |
		| Callers              |
		| Region_Worst         |
		| ClinVar_Significance |

	Scenario Outline: 03 Search by attribute's name (substring)
		Given the "Decision Tree Panel" was opened for the "xl_PGP3140_wgs_NIST-4_2" dataset
		And the attribute dialog was opened via "+ Add Attribute" button 
		When user enters <Attribute Substr> in the search field
		Then the <Attribute Name> should be found

		Examples: 
		| <Attribute Substr> | <Attribute Name>     |
		| ller               | Callers              |
		| ion_w              | Region_Worst         |
		| gnifican           | ClinVar_Significance |

	Scenario Outline: 04 Search by attribute's name (upper-case)
		Given the "Decision Tree Panel" was opened for the "xl_PGP3140_wgs_NIST-4_2" dataset
		And the attribute dialog was opened via "+ Add Attribute" button
		When user enters <Attribute Upper> in the search field
		Then the <Attribute Name> should be found

		Examples: 
		| <Attribute Upper>    | <Attribute Name>     |
		| CALLERS              | Callers              |
		| REGION_WORST         | Region_Worst         |
		| CLINVAR_SIGNIFICANCE | ClinVar_Significance |

	Scenario Outline: 05 Search by attribute's name (lower-case)
		Given the "Decision Tree Panel" was opened for the "xl_PGP3140_wgs_NIST-4_2" dataset
		And the attribute dialog was opened via "+ Add Attribute" button
		When user enters <Attribute Lower> in the search field
		Then the <Attribute Name> should be found

		Examples: 
		| <Attribute Lower> | <Attribute Name> |
		| qd                | QD               |
		| fs                | FS               |

	Scenario Outline: 06 "Select ALl" button
		Given the "Decision Tree Panel" was opened for the "xl_PGP3140_wgs_NIST-4_2" dataset
		And the attribute dialog was opened via "+ Add Attribute" button
		When user clicks the <Attribute Name>
		And clicks "Select All" button
		Then all values should be checked

		Examples: 
		| <Attribute Name> |
		| Callers          |
		| Has_Variant      |

	Scenario Outline: 07 "Clear All" button
		Given the "Decision Tree Panel" was opened for the "xl_PGP3140_wgs_NIST-4_2" dataset
		And the attribute dialog was opened via "+ Add Attribute" button
		When user clicks the <Attribute Name>
		And clicks <Attribute Value 1>
		And clicks <Attribute Value 2>
		And clicks "Clear All" button 
		Then all selected values should be unchecked

		Examples: 
		| <Attribute Name> | <Attribute Value 1> | <Attribute Value 2> |
		| Callers          | GATK_DE_NOVO        | GATK_HOMO_REC       |
		| Has_Variant      | father [HG003]      | proband [HG002]     |

	Scenario: 08 Collapse all groups
		Given the "Decision Tree Panel" was opened for the "xl_PGP3140_wgs_NIST-4_2" dataset
		And the attribute dialog was opened via "+ Add Attribute" button
		When user clicks the "Collapse all groups" button near search field
		Then all attributes' groups should be collapsed

	Scenario: 09 Expand all groups
		Given the "Decision Tree Panel" was opened for the "xl_PGP3140_wgs_NIST-4_2" dataset
		And the attribute dialog was opened via "+ Add Attribute" button
		And all attributes' groups were collapsed
		When user clicks the "Expand all groups" button near search field
		Then all attributes' groups should be expanded

	Scenario: 10 Collapse one group 
		Given the "Decision Tree Panel" was opened for the "xl_PGP3140_wgs_NIST-4_2" dataset
		And the attribute dialog was opened via "+ Add Attribute" button
		And all attributes' groups were expanded
		When user clicks any group name
		Then the group should be collapsed

	Scenario: 11 Expand one group
		Given the "Decision Tree Panel" was opened for the "xl_PGP3140_wgs_NIST-4_2" dataset
		And the attribute dialog was opened via "+ Add Attribute" button
		And one attribute's group was collapsed
		When user clicks the collapsed attributes' group name
		Then the group should be expanded

	Scenario: 12 Back to attributes list - Scroll saving
		Given the "Decision Tree Panel" was opened for the "xl_PGP3140_wgs_NIST-4_2" dataset
		And the attribute dialog was opened via "+ Add Attribute" button
		When user scrolls the list down
		And clicks any attribute
		And the attribute's dialog is open
		And user clicks the "Back to Attributes List" button
		Then "Select attribute" dialog should be displayed
		And the list position should be saved
