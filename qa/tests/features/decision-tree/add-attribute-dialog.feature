Feature: Decision Tree, Add attribute dialog
	As a user, I want to see Add attributes dialog, Search by attributes' names and add different attributes

	Scenario Outline:01 Search by attribute's name (full)
		Given the Decision Tree Panel was opened for the "xl_PGP3140_wgs_NIST-4_2" dataset
		And the "Add attribute" dialog was opened via Tree
		When the user enters <Attribute Name>
		Then the <Attribute Name> should be found

		Examples: 
		| Attribute Name       |
		| Callers              |
		| Region_Worst         |
		| ClinVar_Significance |

	Scenario Outline:02 Search by attribute's name (substring)
		Given the Decision Tree Panel was opened for the "xl_PGP3140_wgs_NIST-4_2" dataset
		And the "Add attribute" dialog was opened via Tree
		When the user enters <Attribute Substr>
		Then the <Attribute Name> should be found

		Examples: 
		| Attribute Substr | Attribute Name       |
		| all              | Callers              |
		| gion             | Region_Worst         |
		| gnifican         | ClinVar_Significance |

	Scenario Outline:03 Search by attribute's name (upper-case)
		Given the Decision Tree Panel was opened for the "xl_PGP3140_wgs_NIST-4_2" dataset
		And the "Add attribute" dialog was opened via Tree
		When the user enters <Attribute Upper>
		Then the <Attribute Name> should be found

		Examples: 
		| Attribute Upper      | Attribute Name       |
		| CALLERS              | Callers              |
		| REGION_WORST         | Region_Worst         |
		| CLINVAR_SIGNIFICANCE | ClinVar_Significance |

	Scenario Outline:04 Search by attribute's name (lower-case)
		Given the Decision Tree Panel was opened for the "xl_PGP3140_wgs_NIST-4_2" dataset
		And the "Add attribute" dialog was open via Tree
		When the user enters <Attribute Lower>
		Then the <Attribute Name> should be found

		Examples: 
		| Attribute Lower | Attribute Name |
		| qd              | QD             |
		| fs              | FS             |

	Scenario:05 Collapse all groups
		Given the Decision Tree Panel was opened for the "xl_PGP3140_wgs_NIST-4_2" dataset
		And the "Add attribute" dialog was opened via Tree
		When the user clicks the "Collapse all groups" button near search field
		Then all attributes' groups should be collapsed

	Scenario:06 Expand all groups
		Given the Decision Tree Panel was opened for the "xl_PGP3140_wgs_NIST-4_2" dataset
		And the "Add attribute" dialog was opened via Tree
		And all attributes' groups were collapsed
		When the user clicks the "Expand all groups" button near search field
		Then all attributes' groups should be expanded

	Scenario:07 Collapse one group
		Given the Decision Tree Panel was opened for the "xl_PGP3140_wgs_NIST-4_2" dataset
		And the "Add attribute" dialog was opened via Tree
		And all attributes' groups were expanded
		When the user clicks any group name
		Then the group should be collapsed

	Scenario:08 Expand one group
		Given the Decision Tree Panel was opened for the "xl_PGP3140_wgs_NIST-4_2" dataset
		And the "Add attribute" dialog was opened via Tree
		And one attribute's group was collapsed
		When the user clicks the group name
		Then the group should be expanded

	Scenario:09 Back to attributes list - Scroll saving
		Given the Decision Tree Panel was opened for the "xl_PGP3140_wgs_NIST-4_2" dataset
		And the "Add attribute" dialog was opened via Tree
		When the user scrolls the list down
		And clicks any attribute
		And the attribute's dialog is open
		And the user clicks the "Back to Attributes List" button
		Then the "Add attribute" dialog should be displayed
		And the list position should be saved