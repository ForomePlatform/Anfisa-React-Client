Feature: Decision Tree, Search in charts
	
Background:
	Given the Decision Trees Panel is opened


@tc:113733
Scenario Outline: 01 Search by Valid name
	When user inputs "<ValidNameField>" in search field
	Then the field should be filtered

Examples:
	| <ValidNameField> |
	| Callers          |
	| Multiallelic     |
	| SIFT             |


@tc:113734
Scenario Outline: 02 Search by Invalid Field
	When user inputs "<InvalidNameField>" in search field
	Then the field should be filtered

Examples:

	| <ValidNameField> |
	| rECallers        |
	| 1Multiallelic    |
	| _SIFT            |

@tc:113735
Scenario Outline: 03 Search by attribute's name (full)
	When the user enters the <Attribute Name> to the Search field in the chart
	Then the chart should be filtered by <Attribute Name>
	And only chart for <Attribute Name> should be displayed

Examples:
	| Attribute Name |
	| gnomAD_AF      |
	| Clinvar_Benign |
	| Callers        |

@tc:113736
Scenario Outline: 04 Search by attribute's name (substring)
	When the user enters the <Attribute Substr> to the Search field in the chart
	Then the chart should be filtered by <Attribute Substr>
	And only charts with <Attribute Substr> should be displayed

Examples:
	| Attribute Substr | Attribute Name |
	| omAD             | gnomAD_AF      |
	| invar            | Clinvar_Benign |
	| all              | Callers        |

@tc:113737
Scenario Outline: 05 Search by attribute's name (upper-case)
	When the user enters the <Attribute Upper> to the Search field in the chart
	Then the chart should be filtered by <Attribute Name>
	And only charts with <Attribute Name> should be displayed

Examples:
	| Attribute Upper | Attribute Name |
	| GNOMAD_AF       | gnomAD_AF      |
	| CLINVAR_BENIGN  | Clinvar_Benign |
	| CALLERS         | Callers        |

@tc:113738
Scenario Outline: 06 Search by attribute's name (lower-case)
	When the user enters the <Attribute Lower> to the Search field in the chart
	Then the chart should be filtered by <Attribute Name>
	And only charts with <Attribute Name> should be displayed

Examples:
	| Attribute Lower | Attribute Name |
	| qd              | QD             |
	| fs              | FS             |


@tc:113739
Scenario Outline: 07 Search by not added attribute
	When the user enters the <Attribute Name> to the Search field in the chart
	Then the chart should be filtered by <Attribute Name>
	And only charts with <Attribute Name> should be displayed

Examples:
	| Attribute Name          |
	| Custom_Inheritance_Mode |
	| GeneRegion              |

@tc:113740
Scenario Outline: 08 Add few fields with Join by AND by using "+" button
	When user click the button "+" with "<NameField1>"
	And user adds "<NameFilter1>"
	And the filter "<NameFilter2>" is added
	And user click the button "+" with "<NameField2>"
	And user adds "<NameFilter2>"
	And user clicks button Add by Join
	And user  selects Join by AND
	Then the filters should be added

Examples:

	| <NameField1>  | <NameFilter1>    | <NameField2>  | <NameFilter2>    |
	| Callers       | BGM_AUTO_DOM     | Has_Variant   | mother [NA24143] |
	| Has_Variant   | father [NA24149] | Variant_Class | SNV              |
	| Variant_Class | deletion         | Callers       | BGM_AUTO_DOM     |

@tc:113741
Scenario Outline: 09 Add few fields with Join by OR
	When user click the button "+" with "<NameField1>"
	And user adds "<NameFilter1>"
	When the filter "<NameFilter1>" is added
	And user clicks Add attribute
	And user click the button "+" with "<NameField2>"
	And user adds "<NameFilter2>"
	And user clicks button Add by Join
	And user selects Join by OR
	Then the filters should be added

Examples:

	| <NameField1>  | <NameFilter1>    | <NameField2>  | <NameFilter2>    |
	| Callers       | BGM_AUTO_DOM     | Has_Variant   | mother [NA24143] |
	| Has_Variant   | father [NA24149] | Variant_Class | SNV              |
	| Variant_Class | deletion         | Callers       | BGM_AUTO_DOM     |

@tc:113742
Scenario Outline: 10 replace filters
	When user click the button "+" with "<NameField1>"
	And user adds "<NameFilter1>"
	When the filter "<NameFilter1>" is added
	And user clicks Add attribute
	And user click the button "+" with "<NameField2>"
	And user adds "<NameFilter2>"
	And user selects replace
	Then the filters should be replaced

Examples:
	| <NameField1>  | <NameFilter1>    | <NameField2>  | <NameFilter2>    |
	| Callers       | BGM_AUTO_DOM     | Has_Variant   | mother [NA24143] |
	| Has_Variant   | father [NA24149] | Variant_Class | SNV              |
	| Variant_Class | deletion         | Callers       | BGM_AUTO_DOM     |

@tc:113743
Scenario Outline: 11 Add second step with filter
	When user click the button "+" with "<NameField1>"
	And user adds "<NameFilter1>"
	And user clicks <"+" add step>
	And user click the button "+" with "<NameField2>"
	And user adds "<NameFilter2>"
	Then the second step with filter should be added

Examples:
	| <NameField1>  | <NameFilter1>    | <NameField2>  | <NameFilter2>    |
	| Callers       | BGM_AUTO_DOM     | Has_Variant   | mother [NA24143] |
	| Has_Variant   | father [NA24149] | Variant_Class | SNV              |
	| Variant_Class | deletion         | Callers       | BGM_AUTO_DOM     |

@tc:113744
Scenario Outline: 12 the button Select ALL
	When user click the button "+" with "<NameField>"
	And user Clicks the button Select All
	Then ALL filters should be added

Examples:
	| <NameField>   |
	| Callers       |
	| Has_Variant   |
	| Variant_Class |

@tc:113745
Scenario Outline: 13 The button Clear all
	When user click the button "+" with "<NameField>"
	And user adds "<NameFilter1>" and "<NameFilter2>"
	And user clicks the Clear All Button
	Then the filters should be cleared

Examples:
	| <NameField>   | <NameFilter1>    | <NameFilter2>    |
	| Callers       | BGM_AUTO_DOM     | BGM_CMPD_HET     |
	| Has_Variant   | father [NA24149] | mother [NA24143] |
	| Variant_Class | deletion         | SNV              |
