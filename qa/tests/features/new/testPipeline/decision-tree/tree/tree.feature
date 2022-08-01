Feature: Decision Tree Panel, Decision Trees list
	As the Anfisa user I want to see the Decision Trees list on the "Decision Tree Panel" page

Background:
	Given user opens "Decision Tree Panel" for the "PGP3140_wgs_panel_hl" dataset

@regression
@tc:113063
Scenario Outline: 01 Search by valid "<ValidNameField>" value
	When user clicks "Select Decision Tree"
	And clicks "@BGM Research" decision tree
	And clicks "Apply Filter" button
	And inputs "<ValidNameField>" in algorithm search field
	Then the field should be filtered

Examples:
	| ValidNameField |
	| Proband_GQ     |
	| Region_Worst   |

@regression
@tc:113064
Scenario Outline: 02 Search by invalid "<InvalidNameField>" value
	Given "@BGM Research" was loaded
	When user inputs "<InvalidNameField>" in algorithm search field
	Then nothing should be shown

Examples:
	| InvalidNameField |
	| Anfisa           |
	| Proband_invalid  |

@tc:113065
Scenario Outline: 03 Search by "<PartValidNameField>" substring
	Given "@BGM Research" was loaded
	When user inputs "<PartValidNameField>" in algorithm search field
	Then the field should be filtered

Examples:
	| PartValidNameField |
	| Prob               |
	| Regio              |

@tc:113066
Scenario: 04 Search by upper case
	Given "@BGM Research" was loaded
	When user inputs "CALLERS" in algorithm search field
	Then the field should be filtered

@tc:113067
Scenario Outline: 05 Search by valid "<ValidNameFilter>" value
	Given "@BGM Research" was loaded
	When user inputs "<ValidNameFilter>" in algorithm search field
	Then the field should be filtered

Examples:
	| ValidNameFilter   |
	| masked_repeats    |
	| RUFUS             |
	| BGM_BAYES_DE_NOVO |

@regression
@tc:113068
Scenario: 06 "Clear All" button
	Given decision tree was loaded
	When user clicks "Clear All" button near rejected variants
	Then decision tree should be cleared

@regression
@tc:113069
Scenario Outline: 07 Add one "<NameField>" field containing one filter
	When user clicks "+ Add attribute" on the first step
	And clicks "<NameField>" attribute
	And clicks "<NameFilter>" value
	And clicks "+ Add Attribute" button
	Then the filter should be added to the first step
	And filter should be included

Examples:
	| NameField     | NameFilter       |
	| Callers       | BGM_AUTO_DOM     |
	| Has_Variant   | father [NA24149] |
	| Variant_Class | deletion         |

@regression
@tc:113070
Scenario Outline: 08 Add one "<NameField>" field containing few filters
	Given nothing was added to the tree
	When user clicks "+ Add attribute" on the first step
	And clicks "<NameField>" attribute
	And checks "<NameFilter1>" and "<NameFilter2>"
	And clicks "+ Add Attribute" button
	Then attribute with both filters should be added

Examples:
	| NameField     | NameFilter1      | NameFilter2      |
	| Callers       | BGM_AUTO_DOM     | BGM_CMPD_HET     |
	| Has_Variant   | father [NA24149] | mother [NA24143] |
	| Variant_Class | deletion         | SNV              |

@regression
@tc:113071
Scenario: 09 Negate the filter
	Given attribute was added to the first step
	When user clicks three dots near first step
	And clicks "Negate" option
	Then "NOT" should appear before attribute name in the tree

@regression
@tc:113072
Scenario: 10 Delete the filter
	Given attribute was added to the first step
	When user clicks burger menu near attribute name
	And clicks "Delete attribute" button
	Then attribute should be deleted

@regression
@tc:113073
Scenario Outline: 11 Join "<NameField1>" and "<NameField2>" by AND
	Given "<NameField1>" attribute was added to first step with "<NameFilter1>" value
	When user clicks "+ Add Attribute" button on the first step
	And clicks "<NameField2>" attribute
	And checks "<NameFilter2>"
	And clicks "Add by joining"
	And chooses "Join by AND" option
	Then filters should be added to first step
	And they should be joined by "AND"

Examples:
	| NameField1    | NameFilter1      | NameField2    | NameFilter2      |
	| Callers       | BGM_AUTO_DOM     | Has_Variant   | mother [NA24143] |
	| Has_Variant   | father [NA24149] | Variant_Class | SNV              |
	| Variant_Class | deletion         | Callers       | BGM_AUTO_DOM     |

@regression
@tc:113074
Scenario Outline: 12 Join "<NameField1>" and "<NameField2>" by OR
	Given "<NameField1>" attribute was added to first step with "<NameFilter1>" value
	When user clicks "+ Add Attribute" button on the first step
	And clicks "<NameField2>" attribute
	And checks "<NameFilter2>"
	And clicks "Add by joining"
	And chooses "Join by OR" option
	Then filters should be added to first step
	And they should be joined by "OR"

Examples:
	| NameField1    | NameFilter1      | NameField2    | NameFilter2      |
	| Callers       | BGM_AUTO_DOM     | Has_Variant   | mother [NA24143] |
	| Has_Variant   | father [NA24149] | Variant_Class | SNV              |
	| Variant_Class | deletion         | Callers       | BGM_AUTO_DOM     |

@regression
@tc:113075
Scenario Outline: 13 Replace "<NameField1>" with "<NameField2>"
	Given "<NameField1>" attribute was added to first step with "<NameFilter1>" value
	When user clicks "+ Add Attribute" button on the first step
	And clicks "<NameField2>" attribute
	And checks "<NameFilter2>"
	And clicks "Replace" button
	Then filter should be replaced

Examples:
	| NameField1    | NameFilter1      | NameField2    | NameFilter2      |
	| Callers       | BGM_AUTO_DOM     | Has_Variant   | mother [NA24143] |
	| Has_Variant   | father [NA24149] | Variant_Class | SNV              |
	| Variant_Class | deletion         | Callers       | BGM_AUTO_DOM     |

@regression
@tc:113076
Scenario: 14 Exclude first step
	Given attribute was added to the first step
	And it was included
	When user checks "Exclude" near first step
	Then step should be excluded

@regression
@tc:113077
Scenario: 15 Include first step
	Given attribute was added to the first step
	And it was excluded
	When user checks "Include" near first step
	Then step should be included

@regression
@tc:113078
Scenario: 16 Add second step
	Given attribute was added to the first step
	When user clicks "+ Add Step"
	Then empty second step should be added

@regression
@tc:113079
Scenario Outline: 17 Add "<NameField2>" attribute to second step
	Given "<NameField1>" attribute was added to first step with "<NameFilter1>" value
	And empty second step was added
	When user clicks "+ Add Attribute" button on second step
	And clicks "<NameField2>" attribute
	And checks "<NameFilter2>"
	And clicks "+ Add Attribute" button
	Then attribute should be added to the second step

Examples:
	| NameField1    | NameFilter1      | NameField2    | NameFilter2      |
	| Callers       | BGM_AUTO_DOM     | Has_Variant   | mother [NA24143] |
	| Has_Variant   | father [NA24149] | Variant_Class | SNV              |
	| Variant_Class | deletion         | Callers       | BGM_AUTO_DOM     |

@tc:113080
Scenario: 18 Collapse second step
	Given Attribute was added to the first and second steps
	When user clicks "^" button for second step
	Then second step should be collapsed

@tc:113081
Scenario: 19 Expand second step
	Given Attribute was added to the first and second steps
	And second step was collapsed
	When user clicks "v" button for second step
	Then second step should be expanded

@tc:113082
Scenario: 20 collapse all steps
	Given Attribute was added to the first and second steps
	When user clicks second special button at the end of "Algorithm" search field
	Then all steps should be collapsed
	
@tc:113083
Scenario: 21 Expand all steps
	Given Attribute was added to the first and second steps
	And all steps were collapsed
	When user clicks first special button at the end of "Algorithm" search field
	Then all steps should be expanded

@regression
@tc:113084
Scenario: 22 Delete Second step
	Given Attribute was added to the first and second steps
	When user clicks three dots near second step
	And clicks "Delete" option
	Then second step with attribute should be deleted
	And only first and final steps should be shown in the tree

@regression
@tc:113085
Scenario: 23 Add a step before the first step via three dots
	Given attribute was added to the first step
	When user clicks three dots near first step
	And clicks "Add Step Before" option
	Then step before the first step should appear

@regression
@tc:113086
Scenario: 24 Add step after the first step via three dots
	Given attribute was added to the first step
	When user clicks three dots near first step
	And clicks "Add Step After" option
	Then step after the first step should appear

@regression
@tc:113087
Scenario: 25 Duplicate first step
	Given attribute was added to the first step
	When user clicks three dots near first step
	And clicks "Duplicate" option
	Then first step should be duplicated

@regression
@tc:113088
Scenario Outline: 26 Add "<FunctionalUnit>" attribute
	When user clicks "+ Add Attribute" button on the first step
	And clicks "+" button near "Functional Units"
	And drop-down with "Functional Units" attributes is shown
	And user clicks "<FunctionalUnit>" option
	And "<FunctionalUnit>" dialog is shown
	And user selects the value
	And clicks "+ Add Attribute" button
	Then attribute should be added to the first step

Examples:
	| FunctionalUnit          |
	| GeneRegion              |
	| Inheritance_Mode        |
	| Compiund_Het            |
	| Custom_Inheritance_Mode |
	| Compound_Request        |
