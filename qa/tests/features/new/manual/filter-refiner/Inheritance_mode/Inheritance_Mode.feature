@regression
Feature: Filter Refiner, Filter by Inheritance_Mode

@tc:114368
Scenario: 01 Group is not selected
	Given the "Filter Refiner" for the "xl_PGP3140_wgs_NIST-4_2" dataset was opened
	When user clicks the "+" button near "Functional Units"
	And selects "Inheritance_Mode" functional attribute
	And doesn't select any problem group check-box
	Then the "Apply condition" button should be disabled
	And the filter should not be applied

@tc:114369
Scenario: 02 "Inheritance mode" is not selected
	Given the "Filter Refiner" for the "xl_PGP3140_wgs_NIST-4_2" dataset was opened
	When user clicks the "+" button near "Functional Units"
	And selects "Inheritance_Mode" functional attribute
	And checks the "HG002" problem group check-box
	And doesn't check any "Inheritance mode" attribute
	Then "Apply condition" button should be disabled
	And the filter should not be applied

@smoke
@tc:114370
Scenario Outline: 03 Add one "<Problem Group>" with "Homozygous Recessive"
	Given the "Filter Refiner" for the "xl_PGP3140_wgs_NIST-4_2" dataset was opened
	When user clicks the "+" button near "Functional Units"
	And selects "Inheritance_Mode" functional attribute
	And checks the "<Problem Group>" check-box
	And checks the "Homozygous Recessive" check-box
	And clicks the "Apply condition" button
	Then variants list should be selected by "<Problem Group>" and "Homozygous Recessive"
	And number of variants should equal "<Variants Number>"

Examples:
	| Problem Group | Variants Number |
	| HG002         | 227,768         |
	| HG003         | 466,845         |
	| HG004         | 449,785         |

@tc:114371
Scenario Outline: 04 Add one "<Problem Group>" with "Autosomal Dominant"
	Given the "Filter Refiner" for the "xl_PGP3140_wgs_NIST-4_2" dataset was opened
	When user clicks the "+" button near "Functional Units"
	And selects "Inheritance_Mode" functional attribute
	And checks the "<Problem Group>" check-box
	And checks the "Autosomal Dominant" check-box
	And clicks the "Apply condition" button
	Then variants list should be selected by "<Problem Group>" and "Autosomal Dominant"
	And number of variants should equal "<Variants Number>"

Examples:
	| Problem Group | Variants Number |
	| HG002         | 80,695          |
	| HG003         | 642,913         |
	| HG004         | 660,633         |
	
@tc:114372
Scenario Outline: 05 Add one "<Problem Group>" with "Compensational"
	Given the "Filter Refiner" for the "xl_PGP3140_wgs_NIST-4_2" dataset was opened
	When user clicks the "+" button near "Functional Units"
	And selects "Inheritance_Mode" functional attribute
	And checks the "<Problem Group>" check-box
	And checks the "Compensational" check-box
	And clicks the "Apply condition" button
	Then variants list should be selected by "<Problem Group>" and "Compensational"
	And number of variants should equal "<Variants Number>"

Examples:
	| Problem Group | Variants Number |
	| HG002         | 229,092         |
	| HG003         | 841,689         |
	| HG004         | 826,667         |

@tc:114373
Scenario Outline: 06 Add a few "<Problem Group #1>" and "<Problem Group #2>" problem groups
	Given the "Filter Refiner" for the "xl_PGP3140_wgs_NIST-4_2" dataset was opened
	When user clicks the "+" button near "Functional Units"
	And selects "Inheritance_Mode" functional attribute
	And checks the "<Problem Group #1>" and "<Problem Group #2>" check-boxes
	And checks the "<Inheritance Mode>" check-box
	And clicks the "Apply condition" button
	Then variants list should be filtered by "<Problem Group #1>", "<Problem Group #2>" and "<Inheritance Mode>"
	And number of variants should equal "<Variants Number>"

Examples:
	| Problem Group #1 | Problem Group #2 | Inheritance Mode     | Variants Number |
	| HG002            | HG003            | Homozygous Recessive | 236,127         |
	| HG002            | HG004            | Autosomal Dominant   | 841,689         |
	| HG003            | HG004            | Compensational       | 80,695          |

@tc:114374
Scenario Outline: 07 Add one "<Problem Group>" with few Inheritance Modes
	Given the "Filter Refiner" for the "xl_PGP3140_wgs_NIST-4_2" dataset was opened
	When user clicks the "+" button near "Functional Units"
	And selects "Inheritance_Mode" functional attribute
	And checks the "<Problem Group>" check-box
	And checks the "<Mode #1>" and "<Mode #2>" check-boxes
	And clicks the "Apply condition" button
	Then variants list should be filtered by "<Problem Group>", "<Mode #1>" and "<Mode #2>"
	And number of variants should equal "<Variants Number>"

Examples:
	| Problem Group | Mode #1              | Mode #2            | Variants Number |
	| HG002         | Homozygous Recessive | Autosomal Dominant | 294,091         |
	| HG003         | Autosomal Dominant   | Compensational     | 1,484,602       |
	| HG004         | Homozygous Recessive | Compensational     | 1,276,452       |

@smoke
@tc:114375
Scenario Outline: 08 Add one "<Problem Group>" with few Inheritance Modes for Secondary dataset
	Given the "Filter Refiner" for the "PGP3140_wgs_panel_hl" dataset was opened
	When user clicks the "+" button near "Functional Units"
	And selects "Inheritance_Mode" functional attribute
	And checks the "<Problem Group>" check-box
	And checks the "<Mode #1>" and "<Mode #2>" check-boxes
	And clicks the "Apply condition" button
	Then variants list should be filtered by "<Problem Group>", "<Mode #1>" and "<Mode #2>"
	And number of variants should equal "<Variants Number>"

Examples:
	| Problem Group | Mode #1              | Mode #2            | Variants Number |
	| NA24143       | Homozygous Recessive | Autosomal Dominant | 491             |
	| NA24149       | Autosomal Dominant   | X-linked           | 298             |
	| NA24385       | X-linked             | Compensational     | 139             |

@tc:114376
Scenario Outline: 09 Clear "<Problem Group>"
	Given the "Filter Refiner" for the "PGP3140_wgs_panel_hl" dataset was opened
	When user clicks the "+" button near "Functional Units"
	And selects "Inheritance_Mode" functional attribute
	And checks the "<Problem Group>" check-box
	And checks the "<Mode Name>" check-box
	And clicks the "Clear" button
	Then the filter should be cleared

Examples:
	| Problem Group | Mode Name            |
	| NA24143       | Homozygous Recessive |
	| NA24149       | Compensational       |
	| NA24385       | X-linked             |

@tc:114377
Scenario Outline: 10 Select All
	Given the "Filter Refiner" for the "PGP3140_wgs_panel_hl" dataset was opened
	When user clicks the "+" button near "Functional Units"
	And selects "Inheritance_Mode" functional attribute
	And checks the "<Problem Group>" check-box
	And clicks the "Select All" button
	And clicks the "Apply condition" button
	Then variants list should be filtered by "<Problem Group>" and all "Inheritance mode" attributes
	And number of variants should equal "<Variants Number>"

Examples:
	| Problem Group | Variants Number |
	| NA24143       | 854             |
	| NA24149       | 832             |
	| NA24385       | 239             |
