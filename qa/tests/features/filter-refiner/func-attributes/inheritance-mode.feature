Feature: Filter Refiner, Filter by Inheritance_Mode
	As a user, I want to have an ability to filter variants by Inheritance Mode

Scenario: 01 Group is not selected
	Given the Filter Refiner for the "xl_PGP3140_wgs_NIST-4_2" was opened
	When user clicks "+" button near Functional Units
	And clicks the "Inheritance_Mode" attribute
	And doesn't selects any problem group check-box
	And clicks the "+ Add Attribute" button
	Then the "+ Add Attribute" should be disabled
	And the filter should not be applied

Scenario: 02 Inheritance mode is not selected
	Given the Filter Refiner for the "xl_PGP3140_wgs_NIST-4_2" was opened
	When user clicks "+" button near Functional Units
	And clicks the "Inheritance_Mode" attribute
	And selects the "HG002" problem group check-box
	And doesn't check any inheritance mode
	And clicks the "+ Add Attribute" button
	Then "+ Add Attribute" button should be disabled
	And the filter should not be applied

Scenario Outline: 03 Add one problem group with "Homozygous Recessive"
	Given the Filter Refiner for the "xl_PGP3140_wgs_NIST-4_2" was opened
	When user clicks "+" button near Functional Units
	And clicks the "Inheritance_Mode" attribute
	And selects the <Problem Group> check-box
	And selects the check-box "Homozygous Recessive"
	And clicks the "+ Add Attribute" button
	Then variants list should be selected by <Problem Group> and "Homozygous Recessive"
	And number of variants should be equal to <Variants Number>

Examples:
	| <Problem Group> | <Variants Number> |
	| HG002           | 227768            |
	| HG003           | 466845            |
	| HG004           | 449785            |

Scenario Outline: 04 Add one problem group with "Autosomal Dominant"
	Given the Filter Refiner for the "xl_PGP3140_wgs_NIST-4_2" was opened
	When user clicks "+" button near Functional Units
	And clicks the "Inheritance_Mode" attribute
	And selects the <Problem Group> check-box
	And selects the check-box "Autosomal Dominant"
	And clicks the "+ Add Attribute" button
	Then variants list should be selected by <Problem Group> and "Homozygous Recessive"
	And number of variants should be equal to <Variants Number>

Examples:
	| <Problem Group> | <Variants Number> |
	| HG002           | 80695             |
	| HG003           | 642913            |
	| HG004           | 660633            |

	
Scenario Outline: 05 Add one problem group with "Compensational"
	Given the Filter Refiner for the "xl_PGP3140_wgs_NIST-4_2" was opened
	When user clicks "+" button near Functional Units
	And clicks the "Inheritance_Mode" attribute
	And selects the <Problem Group> check-box
	And selects the check-box "Compensational"
	And clicks the "+ Add Attribute" button
	Then variants list should be selected by <Problem Group> and "Homozygous Recessive"
	And number of variants should be equal to <Variants Number>

Examples:
	| <Problem Group> | <Variants Number> |
	| HG002           | 229092            |
	| HG003           | 841689            |
	| HG004           | 826667            |

Scenario Outline: 06 Add few problem groups
	Given the Filter Refiner for the "xl_PGP3140_wgs_NIST-4_2" was opened
	When user clicks "+" button near Functional Units
	And clicks the "Inheritance_Mode" attribute
	And clicks <Problem Group #1> and <Problem Group #2> check-boxes
	And clicks the  <Inheritance Mode> check-box
	And clicks the "+ Add Attribute" button
	Then <Problem Group #1> and <Problem Group #2> should be selected
	And variants list should be filtered by these problem groups and <Inheritance Mode>
	And number of variants should be equal to <Variants Number>

Examples:
	| <Problem Group #1> | <Problem Group #2> | <Inheritance Mode>   | <Variants Number> |
	| HG002              | HG003              | Homozygous Recessive | 236127            |
	| HG002              | HG004              | Autosomal Dominant   | 841689            |
	| HG003              | HG004              | Compensational       | 80695             |

Scenario Outline: 07 Add one problem group with few Inheritance Modes
	Given the Filter Refiner for the "xl_PGP3140_wgs_NIST-4_2" was opened
	When user clicks "+" button near Functional Units
	And clicks the "Inheritance_Mode" attribute
	And clicks the <Problem Group>
	And selects the check-boxes <Mode #1> and <Mode #2>
	And clicks the "+ Add Attribute" button
	Then <Problem Group> should be selected
	And variants list should be filtered by the problem group and <Mode #1> and <Mode #2>
	And number of variants should be equal to <Variants Number>

Examples:
	| <Problem Group> | <Mode #1>            | <Mode #2>          | <Variants Number> |
	| HG002           | Homozygous Recessive | Autosomal Dominant | 294091            |
	| HG003           | Autosomal Dominant   | Compensational     | 1484602           |
	| HG004           | Homozygous Recessive | Compensational     | 1276452           |

Scenario Outline: 08 Filter by Inheritance Modes for Secondary dataset
	Given the Filter Refiner for the "xl_PGP3140_wgs_NIST-4_2" was opened
	When user clicks "+" button near Functional Units
	And clicks the "Inheritance_Mode" attribute
	And clicks the <Problem Group>
	And selects the check-boxes <Mode #1> and <Mode #2>
	And clicks the "+ Add Attribute" button
	Then <Problem Group> should be selected
	And variants list should be filtered by the problem group and <Mode #1> and <Mode #2>
	And number of variants should be equal to <Variants Number>

Examples:
	| <Problem Group> | <Mode #1>            | <Mode #2>          | <Variants Number> |
	| NA24143         | Homozygous Recessive | Autosomal Dominant | 491               |
	| NA24149         | Autosomal Dominant   | X-linked           | 298               |
	| NA24385         | X-linked             | Compensational     | 139               |

Scenario Outline: 09 Clear button
	Given the Filter Refiner for the "xl_PGP3140_wgs_NIST-4_2" was opened
	When user clicks "+" button near Functional Units
	And clicks the "Inheritance_Mode" attribute
	And selects the <Problem Group>
	And selects the <Mode Name> inheritance mode
	And clicks the "+ Add Attribute" button
	And the filter is applied
	And the user clicks the "Clear" button
	Then the filter should be cleared

Examples:
	| <ProblemGroup> | <Mode Name>          |
	| NA24143        | Homozygous Recessive |
	| NA24149        | Compensational       |
	| NA24385        | X-linked             |

Scenario Outline: 10 Select All
	Given the Filter Refiner for the "xl_PGP3140_wgs_NIST-4_2" was opened
	When user clicks "+" button near Functional Units
	And clicks the "Inheritance_Mode" attribute
	And selects the <Problem Group>
	And clicks the "Select All" button
	And all modes are checked
	And the user clicks "+ Add Attribute" button
	And the filter is applied
	And the user clicks the "Clear" button
	Then <Problem Group> should be selected
	And variants list should be filtered by the problem group and all modes
	And number of variants should be equal to <Variants Number>

Examples:
	| <Problem Group> | <Variants Number> |
	| NA24143         | 854               |
	| NA24149         | 832               |
	| NA24385         | 239               |

Scenario: 11 Clear All
	Given the Filter Refiner for the "xl_PGP3140_wgs_NIST-4_2" was opened
	When user clicks "+" button near Functional Units
	And clicks the "Inheritance_Mode" attribute
	And selects the "NA24149" problem group
	And checks all inheritance modes manually
	And clicks the "Clear All" button
	Then all modes should be unchecked

Scenario: 12 Reset
	Given the Filter Refiner for the "xl_PGP3140_wgs_NIST-4_2" was opened
	When user clicks "+" button near Functional Units
	And clicks the "Inheritance_Mode" attribute
	And selects the "NA24149" problem group
	And checks "Homozygous Recessive" and "Autosomal Dominant" modes
	And clicks the "Reset" button
	Then all modes should be unchecked
	And the problem group should be unchecked
	And if the user checks the problem group again there should not be selected modes