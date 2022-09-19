Feature: Decision Tree, Search in charts
	As a user, I want to search by attributes' names in chart

Background:
	Given user opens the "Decision Tree Panel" for "PGP3140_wgs_panel_hl" dataset

@regression
@tc:114077
Scenario Outline: 01 Search by valid "<ValidNameField>" value
	When user inputs "<ValidNameField>" in chart search field
	Then the field should be filtered

Examples:
	| ValidNameField |
	| Callers        |
	| Multiallelic   |
	| SIFT           |

@regression
@tc:114078
Scenario Outline: 02 Search by invalid "<InvalidNameField>" value
	When user inputs "<InvalidNameField>" in chart search field
	Then empty result should be shown

Examples:
	| InvalidNameField |
	| rECallers        |
	| 1Multiallelic    |
	| _Symbol          |

@regression
@tc:114079
Scenario Outline: 03 Search by attribute's substring "<AttributeSubstr>" value
	When user inputs "<AttributeSubstr>" in chart search field
	Then the field should be filtered by "<AttributeName>"

Examples:
	| AttributeSubstr | AttributeName  |
	| omAD            | gnomAD_AF      |
	| invar           | Clinvar_Benign |
	| all             | Callers        |

@regression
@tc:114080
Scenario Outline: 04 Search by attribute's upper-case "<AttributeUpper>" value
	When user inputs "<AttributeUpper>" in chart search field
	Then the field should be filtered by "<AttributeName>"
		
Examples:
	| AttributeUpper | AttributeName  |
	| GNOMAD_AF      | gnomAD_AF      |
	| CLINVAR_BENIGN | Clinvar_Benign |
	| CALLERS        | Callers        |

@regression
@tc:114081
Scenario Outline: 05 Search by attribute's lower-case "<AttributeLower>" value
	When user inputs "<AttributeLower>" in chart search field
	Then the field should be filtered by "<AttributeName>"

Examples:
	| AttributeLower | AttributeName |
	| qd             | QD            |
	| fs             | FS            |

@regression
@smoke
@tc:114082
Scenario Outline: 06 Add few fields ("<NameField1>" and "<NameField2>") with "Join by AND" via charts
	When user click the "<NameField1>" attribute in charts section
	And selects "<NameFilter1>"
	And clicks "+ Add Attribute" button
	And selects the first step via clicking on it
	And user click the "<NameField2>" attribute in charts section
	And selects "<NameFilter2>"
	And user clicks "Add by joining" button
	And selects "Join by AND" option
	Then the filters should be added
	And the number of accepted variants should equal to "<AcceptedVariants>"

Examples:
	| NameField1    | NameFilter1      | NameField2       | NameFilter2  | AcceptedVariants |
	| Callers       | BGM_AUTO_DOM     | Proband_Zygosity | Heterozygous | 139              |
	| Has_Variant   | father [HG003]   | Variant_Class    | SNV          | 18,552           |
	| Variant_Class | deletion         | Callers          | BGM_AUTO_DOM | 9                |

@regression
@smoke
@tc:114083
Scenario Outline: 07 Add few fields ("<NameField1>" and "<NameField2>") with "Join by OR" via charts
	When user click the "<NameField1>" attribute in charts section
	And selects "<NameFilter1>"
	And clicks "+ Add Attribute" button
	And selects the first step via clicking on it
	And user click the "<NameField2>" attribute in charts section
	And selects "<NameFilter2>"
	And user clicks "Add by joining" button
	And selects "Join by OR" option
	Then the filters should be added
	And the number of accepted variants should equal to "<AcceptedVariants>"

Examples:
	| NameField1    | NameFilter1      | NameField2       | NameFilter2  | AcceptedVariants |
	| Callers       | BGM_AUTO_DOM     | Proband_Zygosity | Heterozygous | 12,515           |
	| Has_Variant   | father [HG003]   | Variant_Class    | SNV          | 27,695           |
	| Variant_Class | deletion         | Callers          | BGM_AUTO_DOM | 2,259            |

@regression
@smoke
@tc:114084
Scenario Outline: 08 Replace one "<NameField1>" filter with another "<NameField2>" filter
	When user click the "<NameField1>" attribute in charts section
	And selects "<NameFilter1>"
	And clicks "+ Add Attribute" button
	And selects the first step via clicking on it
	And user click the "<NameField2>" attribute in charts section
	And selects "<NameFilter2>"
	And user clicks "Replace" button
	Then filter should be replaced
	And the number of accepted variants should equal to "<AcceptedVariants>"

Examples:
	| NameField1    | NameFilter1      | NameField2       | NameFilter2  | AcceptedVariants |
	| Callers       | BGM_AUTO_DOM     | Proband_Zygosity | Heterozygous | 12,506           |
	| Has_Variant   | father [HG003]   | Variant_Class    | SNV          | 24,884           |
	| Variant_Class | deletion         | Callers          | BGM_AUTO_DOM | 148              |

@regression
@smoke
@tc:114085
Scenario Outline: 09 Add a second step with "<NameField2>" attribute
	When user click the "<NameField1>" attribute in charts section
	And selects "<NameFilter1>"
	And clicks "+ Add Attribute" button
	And user click the "<NameField2>" attribute in charts section
	And selects "<NameFilter2>"
	And clicks "+ Add Attribute" button
	Then second step with an attribute should be added to the tree
	And the number of accepted variants should equal to "<AcceptedVariants>"

Examples:
	| NameField1    | NameFilter1      | NameField2    | NameFilter2      | AcceptedVariants |
	| Callers       | BGM_AUTO_DOM     | Has_Variant   | mother [HG004]   | 20,705           |
	| Has_Variant   | father [HG003]   | Variant_Class | SNV              | 27,695           |
	| Variant_Class | deletion         | Callers       | BGM_AUTO_DOM     | 2,259            |

@tc:114088
Scenario: 10 Collapse all groups in charts
	When user clicks collapse all groups button near search field in charts section
	Then all groups should be collapsed

@tc:114089
Scenario: 11 Expand all groups in charts
	Given all groups were collapsed in charts
	When user clicks expand all groups button near search field in charts section
	Then all groups should be expanded

@tc:114090
Scenario: 12 Collapse one group in charts
	Given all groups were expanded in charts
	When user clicks any group name
	Then the group should be collapsed

@tc:114091
Scenario: 13 Expand one group in charts
	Given one group was collapsed
	When user clicks the collapsed attributes' group name
	Then the group should be expanded

@regression
@tc:114092
Scenario Outline: 14 Open "<FunctionalUnitName>" attribute from charts
	When user clicks the "+" button near "Functional Units"
	And "Functional Units" list is expanded
	And user clicks "<FunctionalUnitName>"
	Then "<FunctionalUnitName>" dialog should be opened

Examples:
	| FunctionalUnitName |
	| GeneRegion         |
	| Inheritance_Mode   |
	| Compound_Het       |
