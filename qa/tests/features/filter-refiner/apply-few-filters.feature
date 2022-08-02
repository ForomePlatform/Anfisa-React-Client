Feature: Filter Refiner, Apply a few filters
  As the Anfisa user I want to have an ability to apply a few filters of different types

@tc:113718
Scenario Outline: Apply a few filters
	Given the "Filter Refiner" was open for the "xl_PGP3140_wgs_NIST-4_2" dataset
	When user selects the <Preset Name> in the presets drop-down
	And clicks "Apply Filter" button
	And the <Preset Name> is loaded
	And the user clicks the <Attribute #1>
	And clicks the <Value #1>
	And clicks the "+ Add Attribute" button to apply the filter
	And clicks the <Attribute #2>
	And enters <MIN> and <MAX> values
	And changes "<" sign with "≤" next to the minimum value
	And clicks the "+ Add Attribute" button to apply the filter
	And clicks the "+" button next to "Functional Units"
	And clicks the "Inheritance_Mode" attribute
	And clicks the <Group> problem group
	And selects the <Inheritance_Mode> value
	And clicks the "Apply" button to apply the filter
	Then all filters are applied correctly
	And the number of variants equal to <Variants Number>

Examples:
	| <Preset Name>     | <Attribute #1> | <Value #1>     | <Attribute #2> | <MIN> | <MAX> | <Group> | <Inheritance_Mode> | <Variants Number> |
	| Loss_Of_Functions | Variant_Class  | SNV            | Num_Samples    | 1     | 2     | HG004   | Autosomal Dominant | 153               |
	| Impact_Splicing   | Clinvar_Benign | Not in ClinVar | Proband_GQ     | 0     | 800   | HG003   | Compensational     | 410               |
