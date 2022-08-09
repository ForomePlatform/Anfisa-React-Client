@regression
Feature: Filter Refiner, Filtration

Background: 
	Given user opens the "Filter Refiner" for "xl_PGP3140_wgs_NIST-4_2" dataset

Scenario Outline: 01 "<Attribute Name>" attributes with only "Not" mode (sub-kind = "status")
	When user clicks "<Attribute Name>"
	Then the "Not" check-box should be displayed
	And "All" check-box should not be displayed

Examples:
	| Attribute Name   |
	| Proband_Zygosity |
	| Variant_Class    |

Scenario: 02 Filtration with "Not" mode
	Given "Proband_Zygosity" attribute was displayed
	When user select "Unknown" attribute value
	And checks the "Not" check-box
	And clicks the "Apply condition" button
	Then the variants list should be filtered by Not (Unknown) value
	And number of variants should be equal to 5,593,705

Scenario Outline: 03 "<Attribute Name>" attributes with "Not" + "All" mode (sub-kind = "multi")
	When user clicks "<Attribute Name>"
	Then the "Not" check-box should be displayed
	And "All" check-box should be displayed

Examples:
	| Attribute Name |
	| Callers        |
	| FATHMM         |

Scenario Outline: 04 Filtration with "All" mode
	When user clicks the "Canonical_Annotation" attribute
	And checks the "coding_sequence_variant" and "downstream_gene_variant" value check-boxes
	And clicks the "All" check-box
	And clicks the "Apply condition" button
	Then the number of variants should equal 2

Scenario: 05 Filtration with "All" + "Not" modes is impossible
	Given "Callers" attribute was displayed
	When user selects any attribute value
	And the "Not" and "All" check-boxes are displayed
	And user clicks "Not" check-box
	Then user should not be able to check both of them at the same time

Scenario Outline: 06 Filter "<Attribute Name>" by one attribute value
	When user clicks the "<Attribute Name>"
	And clicks "<Attribute value>" check-box
	And clicks the "Apply condition" button
	Then the "<Attribute Name>" group should be added to the right part of the screen
	And the "<Attribute Value>" should be added to the group
	And the number of variants should be equal to "<Variants Number>"

Examples:
	| Attribute Name | Attribute Value        | Variants Number |
	| Symbol         | AACS                   | 162             |
	| Callers        | INHERITED_FROM: Father | 1,640,680       |
	| Diseases       | Carcinoma              | 51              |

Scenario Outline: 07 Filter by a few "<Attribute Name>" values
	When user clicks "<Attribute Name>" attribute
	And inputs "<First Attribute Value>" in the search field 
	And checks the "<First Attribute Value>" check-box
	And inputs "<Second Attribute Value>" in the search field
	And checks the "<Second Attribute Value>" check-box
	And clicks the "Apply condition" button
	Then the "<Attribute Name>" group should be added to the right part of the screen
	And "<First Attribute Value>" and "<Second Attribute Value>" should be added to the group
	And the number of variants should equal "<Variants Number>"

Examples:
	| Attribute Name | First Attribute Value | Second Attribute Value | Variants Number |
	| Symbol         | AACS                  | GIMAP1                 | 164             |
	| Diseases       | Acute                 | Mesothelioma           | 22              |
	| Clinvar_stars  | 2                     | 4                      | 4,638           |
                
Scenario Outline: 08 Check all "<Attribute Name>" values manually
	When user clicks the "<Attribute Name>" attribute
	And the list of values is displayed in the middle part of the screen
	And user checks all attribute value check-boxes manually
	And clicks the "Apply condition" button
	Then the "<Attribute Name>" group should be added to the right part of the screen
	And all "<Attribute Name>" values should be added to the group
	And the number of variants should equal "<Variants Number>"

Examples:
	| Attribute Name   | Variants Number |
	| Callers          | 5,041,176       |
	| Proband_Zygosity | 5,628,753       |

Scenario Outline: 09 Filter by a few attributes ("<First Attribute>" and "<Second Attribute>")
	When user clicks the "<First Attribute>"
	And checks the "<Value One>" check-box
	And clicks the "Apply condition" button
	And clicks the "<Second Attribute>" 
	And checks the "<Value Two>" check-box
	And clicks the "Apply condition" button
	Then the "<First Attribute>" group should be added to the right part of the screen
	And the "<Value One>" values should be added to the group
	And the "<Second Attribute>" group should be added to the right part of the screen
	And the "<Value Two>" values should be added to the group
	And number of variants should equal "<Variants number>"

Examples:
	| First Attribute  | Value One     | Second Attribute | Value Two  | Variants number |
	| Callers          | GATK_HOMO_REC | Multiallelic     | True       | 6,133           |
	| Region_Canonical | exon          | splice_altering  | pathogenic | 70              |

Scenario: 10 Select all button
	Given the "Callers" attribute was displayed
	When user clicks the "Select all" button
	Then all attributes should be checked

Scenario: 11 Clear all button
	Given the "Callers" attribute was displayed
	And all attributes were checked
	When user clicks the "Clear all" button
	Then all attributes should be un-checked

Scenario: 12 Show zero variants
	Given the secondary dataset was selected in Secondary dataset drop-down
	When user clicks the "Rules" attribute
	And toggles the "Show zero variants" button
	Then variants with "0" value should appear