@regression
Feature: Decision Tree, Search in charts
	As a user, I want to search by attributes' names in chart

	Scenario Outline: 01 Search by valid name
		Given the "Decision Tree Panel" was opened
		When user inputs <ValidNameField> in chart search field
		Then the field should be filtered

		Examples: 
		| <ValidNameField> |
		| Callers          |
		| Multiallelic     |
		| SIFT             |

	Scenario Outline: 02 Search by invalid name
		Given the "Decision Tree Panel" was opened
		When user inputs <InvalidNameField> in chart search field
		Then the field should be filtered

		Examples:
		| <ValidNameField> |
		| rECallers        |
		| 1Multiallelic    |
		| _SIFT            |

	Scenario Outline: 03 Search by attribute's name (substring)
		Given the "Decision Tree Panel" was opened
		When user inputs <Attribute Substr> in chart search field
		Then the field should be filtered by <Attribute Name>

		Examples:
		| <Attribute Substr> | <Attribute Name> |
		| omAD             | gnomAD_AF      |
		| invar            | Clinvar_Benign |
		| all              | Callers        |

	Scenario Outline: 04 Search by attribute's name (upper-case)
		Given the "Decision Tree Panel" was opened
		When user inputs <Attribute Upper> in chart search field
		Then the field should be filtered by <Attribute Name>
		
		Examples:
		| <Attribute Upper> | <Attribute Name> |
		| GNOMAD_AF       | gnomAD_AF      |
		| CLINVAR_BENIGN  | Clinvar_Benign |
		| CALLERS         | Callers        |

	Scenario Outline: 05 Search by attribute's name (lower-case)
		Given the "Decision Tree Panel" was opened
		When user inputs <Attribute Lower> in chart search field
		Then the field should be filtered by <Attribute Name>

		Examples:
		| <Attribute Lower> | <Attribute Name> |
		| qd              | QD             |
		| fs              | FS             |

	Scenario Outline: 06 Add few fields with "Join by AND" via charts
		Given the "Decision Tree Panel" for "PGP3140_wgs_panel_hl" dataset was opened
		When user click the <NameField1> attribute in charts section
		And selects <NameFilter1>
		And clicks "+ Add Attribute" button
		And selects the first step via clicking on it
		And user click the <NameField2> attribute in charts section
		And selects <NameFilter2>
		And user clicks "Add by joining" button
		And selects "Join by AND" option
		Then the filters should be added

		Examples:
		| <NameField1>  | <NameFilter1>    | <NameField2>  | <NameFilter2>    |
		| Callers       | BGM_AUTO_DOM     | Has_Variant   | mother [NA24143] |
		| Has_Variant   | father [NA24149] | Variant_Class | SNV              |
		| Variant_Class | deletion         | Callers       | BGM_AUTO_DOM     |

	Scenario Outline: 07 Add few fields with "Join by OR" via charts
		Given the "Decision Tree Panel" for "PGP3140_wgs_panel_hl" dataset was opened
		When user click the <NameField1> attribute in charts section
		And selects <NameFilter1>
		And clicks "+ Add Attribute" button
		And selects the first step via clicking on it
		And user click the <NameField2> attribute in charts section
		And selects <NameFilter2>
		And user clicks "Add by joining" button
		And selects "Join by OR" option
		Then the filters should be added

		Examples:
		| <NameField1>  | <NameFilter1>    | <NameField2>  | <NameFilter2>    |
		| Callers       | BGM_AUTO_DOM     | Has_Variant   | mother [NA24143] |
		| Has_Variant   | father [NA24149] | Variant_Class | SNV              |
		| Variant_Class | deletion         | Callers       | BGM_AUTO_DOM     |

	Scenario Outline: 08 Replace filters
		Given the "Decision Tree Panel" for "PGP3140_wgs_panel_hl" dataset was opened
		When user click the <NameField1> attribute in charts section
		And selects <NameFilter1>
		And clicks "+ Add Attribute" button
		And selects the first step via clicking on it
		And user click the <NameField2> attribute in charts section
		And selects <NameFilter2>
		And user clicks "Replace" button
		Then filter should be replaced

		Examples:
		| <NameField1>  | <NameFilter1>    | <NameField2>  | <NameFilter2>    |
		| Callers       | BGM_AUTO_DOM     | Has_Variant   | mother [NA24143] |
		| Has_Variant   | father [NA24149] | Variant_Class | SNV              |
		| Variant_Class | deletion         | Callers       | BGM_AUTO_DOM     |

	Scenario Outline: 09 Add a second step with an attribute
		Given the "Decision Tree Panel" for "PGP3140_wgs_panel_hl" dataset was opened
		When user click the <NameField1> attribute in charts section
		And selects <NameFilter1>
		And clicks "+ Add Attribute" button
		And user click the <NameField2> attribute in charts section
		And selects <NameFilter2>
		And clicks "+ Add Attribute" button
		Then second step with an attribute should be added to the tree

		Examples: 
		| <NameField1>  | <NameFilter1>    | <NameField2>  | <NameFilter2>    |
		| Callers       | BGM_AUTO_DOM     | Has_Variant   | mother [NA24143] |
		| Has_Variant   | father [NA24149] | Variant_Class | SNV              |
		| Variant_Class | deletion         | Callers       | BGM_AUTO_DOM     |

	Scenario Outline: 10 Expand attribute graph
		Given the "Decision Tree Panel" for "PGP3140_wgs_panel_hl" dataset was opened
		When user clicks the "v" button near <NameField> in charts section
		Then the graph for <NameField> attribute should be expanded

		Examples: 
		| <NameField>   |
		| Callers       |
		| Has_Variant   |
		| Variant_Class |

	Scenario Outline: 11 Collapse attribute graph
		Given the "Decision Tree Panel" for "PGP3140_wgs_panel_hl" dataset was opened
		And <NameField> attribute graph was expanded
		When user clicks "^" button near <NameField> 
		Then <NameField> graph should be collapsed

		Examples: 
		| <NameField>   |
		| Callers       |
		| Has_Variant   |
		| Variant_class |

	Scenario: 12 Collapse all groups in charts
		Given the "Decision Tree Panel" was opened
		When user clicks collapse all groups button near search field in charts section
		Then all groups should be collapsed

	Scenario: 13 Expand all groups in charts
		Given the "Decision Tree Panel" was opened
		And all groups were collapsed in charts
		When user clicks expand all groups button near search field in charts section
		Then all groups should be expanded

	Scenario: 14 Collapse one group in charts
		Given the "Decision Tree Panel" was opened
		And all groups were expanded in charts
		When user clicks any group name
		Then the group should be collapsed

	Scenario: 15 Expand one group in charts 
		Given the "Decision Tree Panel" was opened
		And one group was collapsed
		When user clicks the collapsed attributes' group name
		Then the group should be expanded

	Scenario Outline: 16 Open "Functional Units" from charts
		Given the "Decision Tree Panel" for "PGP3140_wgs_panel_hl" dataset was opened
		When user clicks the "+" button near "Functional Units"
		And "Functional Units" list is expanded
		And user clicks <Functional Unit Name> 
		Then <Functional Unit Name> dialog should be opened

		Examples: 
		| <Functional Unit Name> |
		| GeneRegion             |
		| Inheritance_Mode       |
		| Compound_Het           |
