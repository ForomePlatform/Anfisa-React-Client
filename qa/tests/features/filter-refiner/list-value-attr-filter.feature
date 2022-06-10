Feature: Filter Refiner, Filter by List-value attributes
	As a user, I want to apply filters with list-value attributes


	Scenario: 01 Open the Filter Refiner page for the secondary dataset
		Given Anfisa's Main page was open
		When user clicks "PGP3140_wgs_panel_hl" dataset on the left panel
		And clicks the "Open in viewer" dropdown
		And clicks the "Filter Refiner" in the "Open in viewer" dropdown
		Then the "Filter Refiner" should be opened

	Scenario: 02 Open the Filter Refiner page for the primary dataset
		Given Anfisa's Main page was open
		When user clicks "xl_PGP3140_wgs_NIST-4_2" dataset on the left panel
		And clicks the "Open in viewer" dropdown
		And clicks the "Filter Refiner" in the "Open in viewer" dropdown
		Then the "Filter Refiner" should be opened

	Scenario Outline: 03 Search by attribute value: full value
		Given the "Filter Refiner" for the "xl_PGP3140_wgs_NIST-4_2" was open
		When user clicks the "ClinVar_Significance" attribute
		And attribute's values are displayed in the middle part of the screen
		And user enters the <Attribute Value> in the Search field
		Then the <Attribute Value> should be found

		Examples: 
		| <Attribute Value>   |
		| Benign, association |
		| drug response       |
		| protective          |

	Scenario Outline: 04 Search by attribute value: substring
		Given the "Filter Refiner" for the "xl_PGP3140_wgs_NIST-4_2" was open
		When user clicks the "Chemicals" attribute
		And attribute's values are displayed in the middle part of the screen
		And user enters the <Substr Value> in the Search field
		Then the <Attribute Value> should be found

		Examples: 
		| <Attribute Value>       | <Substr Value> |
		| Aldosterone antagonists | oster          |
		| amoxicillin             | xicilli        |
		| prednisolone            | isolo          |
		| zoledronate             | edron          |

	Scenario Outline: 05 Search by attribute value: upper-case
		Given the "Filter Refiner" for the "xl_PGP3140_wgs_NIST-4_2" was open
		When user clicks the "ClinVar_Significance_Invitae" attribute
		And attribute's values are displayed in the middle part of the screen
		And user enters the <Upper Value> in the Search field
		Then the <Attribute Value> should be found

		Examples: 
		| <Attribute Value> | <Upper Value> |
		| benign            | BENIGN         |
		| pathogenic        | PATHOGENIC     |


	Scenario Outline: 06 Search by attribute value: lower-case
		Given the "Filter Refiner" for the "xl_PGP3140_wgs_NIST-4_2" was open
		When user clicks the "Symbol" attribute
		And attribute's values are displayed in the middle part of the screen
		And user enters the <Lower Value> in the Search field
		Then the <Attribute Value> should be found

		Examples: 
		| <Attribute Value> | <Lower Value> |
		| AACS              | aacs          |
		| AASDHPPT          | aasdhppt      |

	Scenario: 07 Search with pagination
		Given the "Filter Refiner" for the "xl_PGP3140_wgs_NIST-4_2" was open
		When user clicks the "Symbol" attribute
		And clicks the "Next Page" button three times
		And the fourth page is displayed
		And user enters "10" in the "Search" field
		Then the page should be returned from 4 to 1
		And list of values with "10" should be displayed

	Scenario Outline: 08 No pagination
		Given the "Filter Refiner" for the "xl_PGP3140_wgs_NIST-4_2" was open
		When user clicks the <Attribute Name> with number of values <= 8
		Then the pagination should not be present in the middle part of the screen
		And full list of values should be displayed

		Examples: 
		| <Attribute Name> |
		| Callers          |
		| Region_Worst     |


	Scenario Outline: 09 Pagination
		Given the "Filter Refiner" for the "xl_PGP3140_wgs_NIST-4_2" was open
		When user clicks the <Attribute Name> with number of values > 8
		Then the pagination should be present in the middle part of the screen

		Examples: 
		| <Attribute Name> |
		| Symbol           |
		| Chromosome       |

	Scenario: 10 Next/Previous pages
		Given the "Filter Refiner" for the "xl_PGP3140_wgs_NIST-4_2" was open
		When user clicks the "Symbol" attribute
		And the pagination is displayed
		Then user should be able to click the "Next page" button
		And the "Previous page" button

	Scenario Outline: 11 Only "Not" mode (sub-kind = "status")
		Given the "Filter Refiner" for the "xl_PGP3140_wgs_NIST-4_2" was opened
		When user clicks the <Attribute Name>
		Then the "Not" checkbox should be displayed
		And "All" checkbox should not be displayed

		Examples: 
		| <Attribute Name> |
		| Proband_Zygosity |
		| Variant_Class    |

	Scenario: 12 Filtration with "Not" mode 
		Given the "Filter Refiner" for the "xl_PGP3140_wgs_NIST-4_2" was opened
		When user clicks the "Proband_Zygosity" attribute
		And checks the "Unknown" attribute value
		And checks the "Not" checkbox
		And clicks the "+ Add Attribute" button
		Then the variants list should be filtered by Not (Unknown) value
		And number of variants should be equal to 5,593,705

	Scenario Outline: 13 "Not" + "All" mode (sub-kind = "multi")
		Given the "Filter Refiner" for the "xl_PGP3140_wgs_NIST-4_2" was opened
		When user clicks the <Attribute Name>
		Then the "Not" checkbox should be displayed
		And "All" checkbox should be displayed

		Examples: 
		| <Attribute Name> |
		| Callers          |
		| FATHMM           |

	Scenario Outline: 14 Filtration with "All" mode
		Given the "Filter Refiner" for the "xl_PGP3140_wgs_NIST-4_2" was opened
		When user clicks the <Attribute Name>
		And clicks <Value#1> and <Value#2>
		And clicks the "+ Add Attribute" button
		And number of variants equal to <Number without All>
		And user clicks attribute in the right part of the screen
		And clicks the "All" checkbox
		And clicks the "Save Changes" button
		Then the number of variants should be equal to <Number with All>

		Examples: 
		| <Attribute Name>     | <Value#1>               | <Value#2>               | <Number without All> | <Number with All> |
		| Canonical_Annotation | coding_sequence_variant | downstream_gene_variant | 185,220              | 2                 |

	Scenario: 15 Filtration with "All" + "Not" modes is impossible
		Given the "Filter Refiner" for the "xl_PGP3140_wgs_NIST-4_2" was opened
		When user clicks the "Callers" attribute
		And selects any attribute value
		And the "Not" checkbox is displayed
		And "All" checkbox is displayed
		Then the user should not be able to check both of them at the same time

	Scenario Outline: 16 Filter by one attribute value
		Given the "Filter Refiner" for the "xl_PGP3140_wgs_NIST-4_2" was opened
		When user clicks the <Attribute Name>
		And the list of values is displayed in the middle part of the screen
		And user clicks the checkbox <Attribute value>
		And clicks the "+ Add Attribute" button
		Then the <Attribute Name> group should be added to the right part of the screen
		And the <Attribute Value> should be added to the group
		And the variants should be filtered by <Attribute Value>
		And the number of variants should be equal to <Variants Number>
		And the "View variants" dialog can be opened
		And the "Full list" radio-button should be disabled if number of variants > 300

		Examples:
		| <Attribute Name> | <Attribute Value>      | <Variants Number> |
		| Symbol           | AACS                   | 162               |
		| Callers          | INHERITED_FROM: Father | 1,640,680         |
		| Diseases         | Carcinoma              | 51                |

	Scenario Outline: 17 Filter by a few attribute values
		Given the "Filter Refiner" for the "xl_PGP3140_wgs_NIST-4_2" was opened
		And there were no added filters
		When user clicks the <Attribute Name>
		And the list of values is displayed in the middle part of the screen
		And user searches for the <Attribute value#1>
		And clicks the checkbox <Attribute value#1>
		And searches for the <Attribute value#2>
		And clicks the <Attribute value#2>
		And clicks the "+ Add Attribute" button
		Then the <Attribute Name> group should be added to the right part of the screen
		And <Attribute Value#1> and <Attribute Value#2> should be added to the group
		And the variants should be filtered by <Attribute Value#1> and <Attribute Value#2>
		And the number of variants should be equal to <Variants Number>
		And the "View variants" dialog can be opened
		And the "Full list" radio-button should be disabled if number of variants > 300

		Examples:
		| <Attribute Name> | <Attribute value#1> | <Attribute value#2> | <Variants Number> |
		| Symbol           | AACS                | GIMAP1              | 164               |
		| Diseases         | Acute               | Mesothelioma        | 22                |
		| Clinvar_stars    | 2                   | 4                   | 4,638             |
                

	Scenario Outline: 18 Check all attribute values manually
		Given the "Filter Refiner" for the "xl_PGP3140_wgs_NIST-4_2" was opened
		When user clicks the <Attribute Name>
		And the list of values is displayed in the middle part of the screen
		And user clicks all attribute value manually
		And clicks the "+ Add Attribute" button
		Then the <Attribute Name> group should be added to the right part of the screen
		And all <Attribute Name> values should be added to the group
		And the variants should be filtered by values
		And the number of variants should be equal to <Variants Number>
		And the "View variants" dialog can be opened
		And the "Full list" radio-button should be disabled

		Examples:
		| <Attribute Name> | <Variants Number> |
		| Callers          | 5,041,176         |
		| Proband_Zygosity | 5,628,753         |

	Scenario Outline: 19 Remove one attribute value from the filter
		Given the "Filter Refiner" for the "xl_PGP3140_wgs_NIST-4_2" was opened
		And filter by <Attribute value#1> and <Attribute value#2> was applied
		When user clicks the checkbox near <Attribute value#1> in the middle part of the page to uncheck it
		And clicks the "Save Changes" button
		Then the <Attribute value#1> should be removed from the filter
		And the number of variants should be updated

		Examples:
		| <Attribute Name> | <Attribute Value#1> | <Attribute Value#2>    |
		| Callers          | GATK_HOMOZYGOUS     | INHERITED_FROM: Father |
		| Clinvar_stars    | 2                   | 1                      |
		| PrimateAI        | D                   | T                      |

	Scenario Outline: 20 Uncheck all of the values from the filter
		Given the "Filter Refiner" for the "xl_PGP3140_wgs_NIST-4_2" was opened
		And filter by <Attribute value#1> and <Attribute value#2> was applied
		When user clicks the checkbox near <Attribute value#1> in the middle part of the page to uncheck it
		And clicks the checkbox near <Attribute value#2> in the middle part of the page to uncheck it
		And clicks the "Save Changes" button
		Then the "Save Changes" button should be disabled
		And the number of variants should not be updated

		Examples:
		| <Attribute Name> | <Attribute Value#1> | <Attribute Value#2>    |
		| Callers          | GATK_HOMOZYGOUS     | INHERITED_FROM: Father |
		| Clinvar_stars    | 2                   | 1                      |
		| PrimateAI        | D                   | T                      |

	Scenario Outline: 21 Remove all attribute values from the filter - Delete button case
		Given the "Filter Refiner" for the "xl_PGP3140_wgs_NIST-4_2" was opened
		And filter by <Attribute value#1> and <Attribute value#2> was applied
		When user clicks three dots near <Attribute Name> in the right side of the screen
		And the user clicks the "Delete" option
		Then the filters list should be empty in the right part of the screen
		And the number of variants should be equal to 5,628,753

		Examples:
		| <Attribute Name> | <Attribute Value#1> | <Attribute Value#2>    |
		| Callers          | GATK_HOMOZYGOUS     | INHERITED_FROM: Father |
		| Clinvar_stars    | 2                   | 1                      |
		| PrimateAI        | D                   | T                      |

	Scenario Outline: 22 Remove all attribute values from the filter - Clear All button case
		Given the "Filter Refiner" for the "xl_PGP3140_wgs_NIST-4_2" was opened
		And filter by <Attribute value#1> and <Attribute value#2> was applied
		When user clicks "Clear All" button in the right side of the screen
		Then the filters list should be empty in the right part of the screen
		And the number of variants should be equal to 5,628,753

		Examples:
		| <Attribute Name> | <Attribute Value#1> | <Attribute Value#2>    |
		| Callers          | GATK_HOMOZYGOUS     | INHERITED_FROM: Father |
		| Clinvar_stars    | 2                   | 1                      |
		| PrimateAI        | D                   | T                      |

	Scenario Outline: 23 Filter by a few attributes
		Given the "Filter Refiner" for the "xl_PGP3140_wgs_NIST-4_2" was opened
		When user clicks the <Attribute #1>
		And clicks the <Value #1>
		And clicks the "+ Add Attribute" button
		And clicks the <Attribute #2>
		And clicks the <Value #2>
		And clicks the "+ Add Attribute" button
		Then the <Attribute #1> group should be added to the right part of the screen
		And the <Value #1> values should be added to the group 
		And the <Attribute #2> group should be added to the right part of the screen
		And the <Value #2> values should be added to the group 
		And variants list should be filtered by <Value #1> and <Value #2>
		And number of variants should be equal to <Variants number>

		Examples:
		| <Attribute #1>   | <Value #1>    | <Attribute #2>  | <Value #2> | <Variants number> |
		| Callers          | GATK_HOMO_REC | Multiallelic    | True       | 6,133             |
		| Region_Canonical | exon          | splice_altering | pathogenic | 70                |
