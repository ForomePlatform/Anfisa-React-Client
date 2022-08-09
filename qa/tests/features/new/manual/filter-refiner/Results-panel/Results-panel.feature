Feature: Filter Refiner, Results Panel

@tc:114298
Scenario Outline: 01 Remove one "<Attribute Name>" value from the filter
	Given the "Filter Refiner" for "xl_PGP3140_wgs_NIST-4_2" dataset was opened
	And the "<Attribute Name>" attribute with "<First Attribute Value>" and "<Second Attribute Value>" values was applied
	When user un-checks the "<First Attribute Value>" check-box in the middle part of the page
	And clicks the "Save Changes" button
	Then the "<First Attribute Value>" should be removed from the filter
	And the number of variants should be updated

Examples:
	| Attribute Name | First Attribute Value | Second Attribute Value |
	| Callers        | GATK_HOMOZYGOUS       | INHERITED_FROM: Father |
	| Clinvar_stars  | 2                     | 1                      |
	| PrimateAI      | D                     | T                      |

@tc:114299
Scenario Outline: 02 Un-check all "<Attribute Name>" values from the filter
	Given the "Filter Refiner" for "xl_PGP3140_wgs_NIST-4_2" dataset was opened
	And the "<Attribute Name>" attribute with "<First Attribute Value>" and "<Second Attribute Value>" values was applied
	When user un-checks the "<First Attribute Value>" and "<Second Attribute Value>" check-boxes in the middle part of the page
	Then the "Save Changes" button should be disabled

Examples:
	| Attribute Name | First Attribute Value | Second Attribute Value |
	| Callers        | GATK_HOMOZYGOUS       | INHERITED_FROM: Father |
	| Clinvar_stars  | 2                     | 1                      |
	| PrimateAI      | D                     | T                      |

@tc:114300
Scenario Outline: 03 Remove all "<Attribute Name>" values from the filter - Delete button case
	Given the "Filter Refiner" for "xl_PGP3140_wgs_NIST-4_2" dataset was opened
	And the "<Attribute Name>" attribute with "<First Attribute Value>" and "<Second Attribute Value>" values was applied
	When user clicks three dots near the "<Attribute Name>" on the right side of the screen
	And clicks the "Delete" option
	Then the filters list should be empty in the right part of the screen
	And the number of variants should equal 5,628,753

Examples:
	| Attribute Name | First Attribute Value | Second Attribute Value |
	| Callers        | GATK_HOMOZYGOUS       | INHERITED_FROM: Father |
	| Clinvar_stars  | 2                     | 1                      |
	| PrimateAI      | D                     | T                      |

@tc:114301
Scenario Outline: 04 Remove all "<Attribute Name>" values from the filter - Clear All button case
	Given the "Filter Refiner" for "xl_PGP3140_wgs_NIST-4_2" dataset was opened
	And the "<Attribute Name>" attribute with "<First Attribute Value>" and "<Second Attribute Value>" values was applied
	When user clicks "Clear All" button on the right side of the screen
	Then the filters list should be empty in the right part of the screen
	And the number of variants should equal 5,628,753

Examples:
	| Attribute Name | First Attribute Value | Second Attribute Value |
	| Callers        | GATK_HOMOZYGOUS       | INHERITED_FROM: Father |
	| Clinvar_stars  | 2                     | 1                      |
	| PrimateAI      | D                     | T                      |

@tc:114302
Scenario: 05 "View variants" dialog for XL dataset
	Given the "Filter Refiner" for "xl_PGP3140_wgs_NIST-4_2" dataset was opened
	And the attribute with more than 300 variants was added
	When user clicks "View variants" button
	Then the "View variants" dialog should be opened 
	And "Full list" view should be disabled

@tc:114303
Scenario: 06 "Full list" view for XL dataset
	Given the "Filter Refiner" for "xl_PGP3140_wgs_NIST-4_2" dataset was opened
	And the attribute with less than 300 variants was added
	When user clicks "View variants" button
	Then the "View variants" dialog should be opened
	And "Full list" view should be displayed

@tc:114304
Scenario: 07 "View variants" for WS dataset
	Given the "Filter Refiner" for "PGP3140_wgs_panel_hl" dataset was opened
	And the attribute with less than 300 variants was added
	When user clicks "View variants" button
	Then the "Main Table" should be opened
