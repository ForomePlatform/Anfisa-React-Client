@regression
Feature: Filter Refiner Filtration

@smoke
Scenario Outline: 01 Only "Not" mode (sub-kind = "status")
	Given the "Filter Refiner" for the "xl_PGP3140_wgs_NIST-4_2" dataset was opened
	When user clicks on "<Attribute Name>"
	Then the "Not" check-box should be displayed
	And "All" check-box should not be displayed

Examples:
	| Attribute Name   |
	| Proband_Zygosity |
	| Variant_Class    |

Scenario: 02 Filtration with "Not" mode
	Given the "Filter Refiner" for the "xl_PGP3140_wgs_NIST-4_2" dataset was opened
	And "Proband_Zygosity" attribute was displayed
	When user select "Unknown" attribute value
	And checks the "Not" check-box
	And clicks on "+ Add Attribute" button
	Then the variants list should be filtered by Not (Unknown) value
	And number of variants should be equal to 5,593,705

Scenario Outline: 03 "Not" + "All" mode (sub-kind = "multi")
	Given the "Filter Refiner" for the "xl_PGP3140_wgs_NIST-4_2" dataset was opened
	When user clicks on "<Attribute Name>"
	Then the "Not" check-box should be displayed
	And "All" check-box should be displayed

Examples:
	| Attribute Name |
	| Callers        |
	| FATHMM         |

Scenario Outline: 04 Filtration with "All" mode
	Given the "Filter Refiner" for the "xl_PGP3140_wgs_NIST-4_2" dataset was opened
	When user clicks on  "<Attribute Name>"
	And clicks "<First Value>" and "<Second Value>"
	And clicks on "+ Add Attribute" button
	And number of variants equal to <Number without All>
	And user clicks attribute in the right part of the screen
	And clicks on "All" check-box
	And clicks on "Save Changes" button
	Then the number of variants should be equal to <Number with All>

Examples:
	| Attribute Name       | First Value             | Second Value            | Number without All | Number with All |
	| Canonical_Annotation | coding_sequence_variant | downstream_gene_variant | 185,220            | 2               |

Scenario: 05 Filtration with "All" + "Not" modes is impossible
	Given the "Filter Refiner" for the "xl_PGP3140_wgs_NIST-4_2" dataset was opened
	And "Callers" attribute was displayed
	When user selects any attribute value
	And the "Not" check-box is displayed
	And "All" check-box is displayed
	Then the user should not be able to check both of them at the same time

Scenario Outline: 06 Filter by one attribute value
	Given the "Filter Refiner" for the "xl_PGP3140_wgs_NIST-4_2" dataset was opened
	When user clicks on <Attribute Name>
	And user clicks on  check-box <Attribute value>
	And clicks on "+ Add Attribute" button
	Then the <Attribute Name> group should be added to the right part of the screen
	And the <Attribute Value> should be added to the group
	And the variants should be filtered by <Attribute Value>
	And the number of variants should be equal to <Variants Number>
	And the "View variants" dialog can be opened
	And the "Full list" radio-button should be disabled if number of variants > 300

Examples:
	| Attribute Name | Attribute Value        | Variants Number |
	| Symbol         | AACS                   | 162             |
	| Callers        | INHERITED_FROM: Father | 1,640,680       |
	| Diseases       | Carcinoma              | 51              |

Scenario Outline: 07 Filter by a few attribute values
	Given the "Filter Refiner" for the "xl_PGP3140_wgs_NIST-4_2" dataset was opened
	And there were no added filters
	When user clicks on <Attribute Name>
	And the list of values is displayed in the middle part of the screen
	And user searches for the <First Attribute Value>
	And clicks on check-box <First Attribute Value>
	And searches for the <Second Attribute Value>
	And clicks on <Second Attribute Value>
	And clicks on "+ Add Attribute" button
	Then the <Attribute Name> group should be added to the right part of the screen
	And <First Attribute Value> and <Second Attribute Value> should be added to the group
	And the variants should be filtered by <First Attribute Value> and <Second Attribute Value>
	And the number of variants should be equal to <Variants Number>
	And the "View variants" dialog can be opened
	And the "Full list" radio-button should be disabled if number of variants > 300

Examples:
	| Attribute Name | First Attribute Value | Second Attribute Value | Variants Number |
	| Symbol         | AACS                  | GIMAP1                 | 164             |
	| Diseases       | Acute                 | Mesothelioma           | 22              |
	| Clinvar_stars  | 2                     | 4                      | 4,638           |
                

Scenario Outline: 08 Check all attribute values manually
	Given the "Filter Refiner" for the "xl_PGP3140_wgs_NIST-4_2" dataset was opened
	When user clicks on <Attribute Name>
	And the list of values is displayed in the middle part of the screen
	And user clicks all attribute value manually
	And clicks on "+ Add Attribute" button
	Then the <Attribute Name> group should be added to the right part of the screen
	And all <Attribute Name> values should be added to the group
	And the variants should be filtered by values
	And the number of variants should be equal to <Variants Number>
	And the "View variants" dialog can be opened
	And the "Full list" radio-button should be disabled

Examples:
	| Attribute Name   | Variants Number |
	| Callers          | 5,041,176       |
	| Proband_Zygosity | 5,628,753       |

Scenario Outline: 09 Remove one attribute value from the filter
	Given the "Filter Refiner" for the "xl_PGP3140_wgs_NIST-4_2" dataset was opened
	And filter by <First Attribute Value> and <Second Attribute Value> was applied
	When user clicks on check-box near <First Attribute Value> in the middle part of the page to uncheck it Value
	And clicks on "Save Changes" button
	Then the <First Attribute Value> should be removed from the filter
	And the number of variants should be updated

Examples:
	| Attribute Name | First Attribute Value | Second Attribute Value |
	| Callers        | GATK_HOMOZYGOUS       | INHERITED_FROM: Father |
	| Clinvar_stars  | 2                     | 1                      |
	| PrimateAI      | D                     | T                      |

Scenario Outline: 10 Uncheck all of the values from the filter
	Given the "Filter Refiner" for the "xl_PGP3140_wgs_NIST-4_2" dataset was opened
	And filter by <First Attribute Value> and <Second Attribute Value> was applied
	When user clicks on check-box near <First Attribute Value> in the middle part of the page to uncheck it
	And clicks on check-box near <Second Attribute Value> in the middle part of the page to uncheck it
	And clicks on "Save Changes" button
	Then the "Save Changes" button should be disabled
	And the number of variants should not be updated

Examples:
	| Attribute Name | First Attribute Value | Second Attribute Value |
	| Callers        | GATK_HOMOZYGOUS       | INHERITED_FROM: Father |
	| Clinvar_stars  | 2                     | 1                      |
	| PrimateAI      | D                     | T                      |

Scenario Outline: 11 Remove all attribute values from the filter - Delete button case
	Given the "Filter Refiner" for the "xl_PGP3140_wgs_NIST-4_2" dataset was opened
	And filter by <First Attribute Value> and <Second Attribute Value> was applied
	When user clicks three dots near <Attribute Name> in the right side of the screen
	And the user clicks on "Delete" option
	Then the filters list should be empty in the right part of the screen
	And the number of variants should be equal to 5,628,753

Examples:
	| Attribute Name | First Attribute Value | Second Attribute Value |
	| Callers        | GATK_HOMOZYGOUS       | INHERITED_FROM: Father |
	| Clinvar_stars  | 2                     | 1                      |
	| PrimateAI      | D                     | T                      |

Scenario Outline: 12 Remove all attribute values from the filter - Clear All button case
	Given the "Filter Refiner" for the "xl_PGP3140_wgs_NIST-4_2" dataset was opened
	And filter by <First Attribute Value> and <Second Attribute Value> was applied
	When user clicks "Clear All" button in the right side of the screen
	Then the filters list should be empty in the right part of the screen
	And the number of variants should be equal to 5,628,753

Examples:
	| Attribute Name | First Attribute Value | Second Attribute Value |
	| Callers        | GATK_HOMOZYGOUS       | INHERITED_FROM: Father |
	| Clinvar_stars  | 2                     | 1                      |
	| PrimateAI      | D                     | T                      |

Scenario Outline: 13 Filter by a few attributes
	Given the "Filter Refiner" for the "xl_PGP3140_wgs_NIST-4_2" dataset was opened
	When user clicks on  <First Attribute>
	And clicks on <Value One>
	And clicks on "+ Add Attribute" button
	And clicks on <Second Attribute>
	And clicks on <Value Two>
	And clicks on "+ Add Attribute" button
	Then the <First Attribute> group should be added to the right part of the screen
	And the <Value One> values should be added to the group
	And the <Second Attribute> group should be added to the right part of the screen
	And the <Value Two> values should be added to the group
	And variants list should be filtered by <Value One> and <Value Two >
	And number of variants should be equal to <Variants number>

Examples:
	| First Attribute  | Value One     | Second Attribute | Value Two  | Variants number |
	| Callers          | GATK_HOMO_REC | Multiallelic     | True       | 6,133           |
	| Region_Canonical | exon          | splice_altering  | pathogenic | 70              |

Scenario: 14 Select all button
	Given the "Filter Refiner" for the "xl_PGP3140_wgs_NIST-4_2" dataset was opened
	And "Callers" attribute was displayed
	When user clicks on "Select all" button
	Then all attributes should be selected

Scenario: 15 Clear all button
	Given the "Filter Refiner" for the "xl_PGP3140_wgs_NIST-4_2" dataset was opened
	And "Callers" attribute was displayed
	And All attributes is selected
	When user clicks on "Clear all" button
	Then all attributes should be cleared

Scenario: 16 show zero variants
	Given the "Filter Refiner" for the "xl_PGP3140_wgs_NIST-4_2" dataset was opened
	And Secondary dataset was selected in Secondary dataset drop-down
	When user clicks on "Rules" attribute
	And toggles on "Show zero variants" button
	Then Variants with "0" value should be appeared


