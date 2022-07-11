@regression
Feature: Decision Tree Panel, Decision Trees list
  As the Anfisa user I want to see the Decision Trees list on the "Decision Tree Panel" page


	Scenario Outline: 01 Search by valid value
		Given the "Decision Tree Panel" was opened
		When user clicks "Select Decision Tree"
		And clicks <DecisionTreeName1>
		And clicks "Apply Filter" button
		And inputs <ValidNameField> in algorithm search field
		Then the field should be filtered

		Examples:
		| <DecisionTreeName1> | <ValidNameField> |
		| @BGM Research       | Proband_GQ       |
		| @BGM Research       | Region_Worst     |

	Scenario Outline: 02 Search by invalid value
		Given the "Decision Tree Panel" was opened
		And <DecisionTreeName1> was loaded
		When user inputs <InvalidNameField> in algorithm search field
		Then nothing should be shown

		Examples:
		| <DecisionTreeName1> | <ValidNameField> |
		| @BGM Research       | Anfisa           |

	Scenario Outline: 03 Search by substring
		Given the "Decision Tree Panel" was opened
		And <DecisionTreeName1> was loaded
		When user inputs <PartValidNameField> in algorithm search field
		Then the field should be filtered

		Examples:
		| <DecisionTreeName1> | <PartValidNameField> |
		| @BGM Research       | Prob                 |
		| @BGM Research       | Regio                |

	Scenario Outline: 04 Search by upper case
		Given the "Decision Tree Panel" was opened
		And <DecisionTreeName1> was loaded
		When user inputs <ValidNameFieldUpperCase> in algorithm search field
		Then the field should be filtered

		Examples:
		| <DecisionTreeName1> | <ValidNameFieldUpperCase> |
		| @BGM Research       | CALLERS                   |

	Scenario Outline: 05 Search by value
		Given the "Decision Tree Panel" was opened
		And <DecisionTreeName1> was loaded
		When user inputs <ValidNameFilter> in algorithm search field
		Then the field should be filtered

		Examples: 
		| <DecisionTreeName | <ValidNameFilter> |
		| @BGM Research     | masked_repeats    |
		| @BGM Research     | RUFUS             |
		| @BGM Research     | BGM_BAYES_DE_NOVO |

	Scenario: 06 "Clear All" button
		Given the "Decision Tree Panel" was opened
		And decision tree was loaded
		When user clicks "Clear All" button near rejected variants
		Then decision tree should be cleared

	Scenario Outline: 07 Add one field containing one filter
		Given the "Decision Trees Panel" for the "PGP3140_wgs_panel_hl" dataset was opened
		When user clicks "+ Add attribute" on the first step
		And clicks <NameField> attribute
		And clicks <NameFilter> value
		And clicks "+ Add Attribute" button
		Then the filter should be added to the first step
		And filter should be included

		Examples:
		| <NameField>   | <NameFilter>     |
		| Callers       | BGM_AUTO_DOM     |
		| Has_Variant   | father [NA24149] |
		| Variant_Class | deletion         |

	Scenario Outline: 08 Add one field containing few filters
		Given the "Decision Trees Panel" for the "PGP3140_wgs_panel_hl" dataset was opened
		And nothing was added to the tree
		When user clicks "+ Add attribute" on the first step
		And clicks <NameField> attribute
		And checks <NameFilter1> and <NameFilter2>
		And clicks "+ Add Attribute" button
		Then attribute with both filters should be added 

		Examples:
		| <NameField>   | <NameFilter1>    | <NameFilter2>    |
		| Callers       | BGM_AUTO_DOM     | BGM_CMPD_HET     |
		| Has_Variant   | father [NA24149] | mother [NA24143] |
		| Variant_Class | deletion         | SNV              |

	Scenario: 09 Negate the filter
		Given the "Decision Trees Panel" for the "PGP3140_wgs_panel_hl" dataset was opened
		And attribute was added to the first step
		When user clicks three dots near first step
		And clicks "Negate" option
		Then "NOT" should appear before attribute name in the tree

	Scenario: 10 Delete the filter
		Given the "Decision Trees Panel" for the "PGP3140_wgs_panel_hl" dataset was opened
		And attribute was added to the first step
		When user clicks burger menu near attribute name
		And clicks "Delete attribute" button
		Then attribute should be deleted

	Scenario Outline: 11 Join by AND
		Given the "Decision Trees Panel" for the "PGP3140_wgs_panel_hl" dataset was opened
		And <NameField1> attribute was added to first step with <NameFilter1> value
		When user clicks "+ Add Attribute" button on the first step 
		And clicks <NameField2> attribute
		And checks <NameFilter2>
		And clicks "Add by joining"
		And chooses "Join by AND" option
		Then filters should be added to first step
		And they should be joined by "AND"

		Examples:
		| <NameField1>  | <NameFilter1>    | <NameField2>  | <NameFilter2>    |
		| Callers       | BGM_AUTO_DOM     | Has_Variant   | mother [NA24143] |
		| Has_Variant   | father [NA24149] | Variant_Class | SNV              |
		| Variant_Class | deletion         | Callers       | BGM_AUTO_DOM     |

	Scenario Outline: 12 Join by OR
		Given the "Decision Trees Panel" for the "PGP3140_wgs_panel_hl" dataset was opened
		And <NameField1> attribute was added to first step with <NameFilter1> value
		When user clicks "+ Add Attribute" button on the first step 
		And clicks <NameField2> attribute
		And checks <NameFilter2>
		And clicks "Add by joining"
		And chooses "Join by OR" option
		Then filters should be added to first step
		And they should be joined by "OR"

		Examples:
		| <NameField1>  | <NameFilter1>    | <NameField2>  | <NameFilter2>    |
		| Callers       | BGM_AUTO_DOM     | Has_Variant   | mother [NA24143] |
		| Has_Variant   | father [NA24149] | Variant_Class | SNV              |
		| Variant_Class | deletion         | Callers       | BGM_AUTO_DOM     |

	Scenario Outline: 13 Replace
		Given the "Decision Trees Panel" for the "PGP3140_wgs_panel_hl" dataset was opened
		And <NameField1> attribute was added to first step with <NameFilter1> value
		When user clicks "+ Add Attribute" button on the first step 
		And clicks <NameField2> attribute
		And checks <NameFilter2>
		And clicks "Replace" button 
		Then filter should be replaced

		Examples:
		| <NameField1>  | <NameFilter1>    | <NameField2>  | <NameFilter2>    |
		| Callers       | BGM_AUTO_DOM     | Has_Variant   | mother [NA24143] |
		| Has_Variant   | father [NA24149] | Variant_Class | SNV              |
		| Variant_Class | deletion         | Callers       | BGM_AUTO_DOM     |

	Scenario: 14 Exclude first step
		Given the "Decision Trees Panel" for the "PGP3140_wgs_panel_hl" dataset was opened
		And attribute was added to the first step
		And it was included
		When user checks "Exclude" near first step
		Then step should be excluded

	Scenario: 15 Include first step
		Given the "Decision Trees Panel" for the "PGP3140_wgs_panel_hl" dataset was opened
		And attribute was added to the first step
		And it was excluded
		When user checks "Include" near first step
		Then step should be included

	Scenario: 16 Add second step
		Given the "Decision Trees Panel" for the "PGP3140_wgs_panel_hl" dataset was opened
		And attribute was added to the first step
		When user clicks "+ Add Step"
		Then empty second step should be added

	Scenario Outline: 17 Add attribute to second step
		Given the "Decision Trees Panel" for the "PGP3140_wgs_panel_hl" dataset was opened
		And <NameField1> attribute was added to first step with <NameFilter1> value
		And empty second step was added
		When user clicks "+ Add Attribute" button on second step
		And clicks <NameField2> attribute
		And checks <NameFilter2>
		And clicks "+ Add Attribute" button
		Then attribute should be added to the second step

		Examples:
		| <NameField1>  | <NameFilter1>    | <NameField2>  | <NameFilter2>    |
		| Callers       | BGM_AUTO_DOM     | Has_Variant   | mother [NA24143] |
		| Has_Variant   | father [NA24149] | Variant_Class | SNV              |
		| Variant_Class | deletion         | Callers       | BGM_AUTO_DOM     |

	Scenario: 18 Collapse second step
		Given the "Decision Trees Panel" for the "PGP3140_wgs_panel_hl" dataset was opened
		And Attribute was added to the first and second steps
		When user clicks "^" button for second step
		Then second step should be collapsed

	Scenario: 19 Expand second step
		Given the "Decision Trees Panel" for the "PGP3140_wgs_panel_hl" dataset was opened
		And Attribute was added to the first and second steps
		And second step was collapsed
		When user clicks "v" button for second step
		Then second step should be expanded

	Scenario: 20 collapse all steps
		Given the "Decision Trees Panel" for the "PGP3140_wgs_panel_hl" dataset was opened
		And Attribute was added to the first and second steps
		When user clicks second special button at the end of "Algorithm" search field
		Then all steps should be collapsed
	
	Scenario: 21 Expand all steps
		Given the "Decision Trees Panel" for the "PGP3140_wgs_panel_hl" dataset was opened
		And Attribute was added to the first and second steps
		And all steps were collapsed
		When user clicks first special button at the end of "Algorithm" search field
		Then all steps should be expanded

	Scenario: 22 Delete Second step
		Given the "Decision Trees Panel" for the "PGP3140_wgs_panel_hl" dataset was opened
		And Attribute was added to the first and second steps
		When user clicks three dots near second step
		And clicks "Delete" option 
		Then second step with attribute should be deleted
		And only first and final steps should be shown in the tree

	Scenario: 23 Add a step before the first step via three dots 
		Given the "Decision Trees Panel" for the "PGP3140_wgs_panel_hl" dataset was opened
		And attribute was added to the first step
		When user clicks three dots near first step
		And clicks "Add Step Before" option
		Then step before the first step should appear

	Scenario: 24 Add step after the first step via three dots
		Given the "Decision Trees Panel" for the "PGP3140_wgs_panel_hl" dataset was opened
		And attribute was added to the first step
		When user clicks three dots near first step
		And clicks "Add Step After" option
		Then step after the first step should appear

	Scenario: 25 Duplicate first step
		Given the "Decision Trees Panel" for the "PGP3140_wgs_panel_hl" dataset was opened
		And attribute was added to the first step
		When user clicks three dots near first step
		And clicks "Duplicate" option
		Then first step should be duplicated

	Scenario Outline: 26 Add Functional Units attribute
		Given the "Decision Trees Panel" for the "PGP3140_wgs_panel_hl" dataset was opened
		When user clicks "+ Add Attribute" button on the first step
		And clicks "+" button near "Functional Units" 
		And drop-down with "Functional Units" attributes is shown
		And user clicks <FunctionalUnit> option
		And <FunctionalUnit> dialog is shown
		And user selects the value 
		And clicks "+ Add Attribute" button 
		Then attribute should be added to the first step

		Examples: 
		| <FunctionalUnit>        |
		| GeneRegion              |
		| Inheritance_Mode        |
		| Compiund_Het            |
		| Custom_Inheritance_Mode |
		| Compound_Request        |
