@regression
Feature: Filter Refiner, Filter by Custom_Inheritance_Mode

@smoke
Scenario: 01 The "Custom_Inheritance_Mode" filter is displayed
	Given the Filter Refiner for the "xl_PGP3140_wgs_NIST-4_2" dataset was opened
	When user clicks on "+" button near functional Units
	And selects "Custom_Inheritance_Mode" functional attribute
	Then Settings for the "Custom_Inheritance_Mode" should be displayed
	And "Reset" value should be empty
	And "Scenario" values  HG002, HG003, HG004 should be empty

@smoke
Scenario: 02 The "Inheritance mode" value equals "Homozygous/X-linked"
	Given the Filter Refiner for the "xl_PGP3140_wgs_NIST-4_2" dataset was opened
	When user clicks on "+" button near functional Units
	And selects "Custom_Inheritance_Mode" functional attribute
	And checks check-box of the "Homozygous/X-linked"
	And clicks on "+ Add Attribute" button
	Then "Scenario" values should be HG002=2, HG003=0-1, HG004=0-1
	And the number of variants should be equal to "227768".

Scenario: 03 The "Reset" value equals "Autosomal Dominant"
	Given the Filter Refiner for the "xl_PGP3140_wgs_NIST-4_2" dataset was opened
	When user clicks on "+" button near functional Units
	And selects "Custom_Inheritance_Mode" functional attribute 
	And checks check-box of "Autosomal Dominant"
	And clicks on "+ Add Attribute" button
	Then "Scenario" values should be HG002=1-2, HG003=0, HG004=0
	And the number of variants should be equal to "80695".

Scenario: 04 The "Reset" value equals "Compensational"
	Given the Filter Refiner for the "xl_PGP3140_wgs_NIST-4_2" dataset was opened
	When user clicks on "+" button near functional Units
	And selects "Custom_Inheritance_Mode" functional attribute 
	And checks check-box of "Compensational"
	And clicks on "+ Add Attribute" button
	Then "Scenario" values should be HG002=0, HG003=1-2, HG004=1-2
	And the number of variants should be equal to "229092".

Scenario: 05 The "Not" mode
	Given the Filter Refiner for the "xl_PGP3140_wgs_NIST-4_2" dataset was opened
	When user clicks on "+" button near functional Units
	And selects "Custom_Inheritance_Mode" functional attribute 
	And checks check-box of "Autosomal Dominant"
	And chooses the "Not" check-box
	And clicks on "+ Add Attribute" button
	Then number of variants should be equal to "5548058"
	And Custom_Inheritance_Mode block on Results panel should have "not" label.

Scenario: 06 Clear button
	Given the Filter Refiner for the "xl_PGP3140_wgs_NIST-4_2" dataset was opened
	When user clicks on "+" button near functional Units
	And selects "Custom_Inheritance_Mode" functional attribute 
	And applies "Custom_Inheritance_Mode" filter (Autosomal Dominant + Not)
	And clicks on "Clear  all" button under Results section
	Then the filter should be cleared
	And the number of variants should be equal to "5628753".

Scenario: 07 Reset button
	Given the Filter Refiner for the "xl_PGP3140_wgs_NIST-4_2" dataset was opened
	When user clicks on "+" button near functional Units
	And selects "Custom_Inheritance_Mode" functional attribute 
	And selects Inheritance mode value
	And clicks on "Reset" button
	Then selected value should be deselected
