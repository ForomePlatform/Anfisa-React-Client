Feature: Filter Refiner, Filter by Custom_Inheritance_Mode
	As a user, I want to have an ability to filter variants by Custom Inheritance Mode


Scenario: 01 The "Custom_Inheritance_Mode" filter is displayed
	Given "Filter Refiner" page is open
	When user clicks the "Custom_Inheritance_Mode" functional attribute
	Then Settings for the "Custom_Inheritance_Mode" should be displayed
	And "Reset" value should be empty
	And "Scenario" values  HG002, HG003, HG004 should be empty

Scenario: 02 The "Reset" value equals "Homozygous/X-linked"
	Given The "Custom_Inheritance_Mode" filter is selected
	When user checks check-box of the "Homozygous/X-linked"
	And clicks the "Apply" button
	Then "Scenario" values should be HG002=2, HG003=0-1, HG004=0-1
	And the number of variants should be equal to "227768".

Scenario: 03 The "Reset" value equals "Autosomal Dominant"
	Given The "Custom_Inheritance_Mode" filter is selected
	When user checks check-box of "Autosomal Dominant"
	And clicks the "Apply" button
	Then "Scenario" values should be HG002=1-2, HG003=0, HG004=0
	And the number of variants should be equal to "80695".

Scenario: 04 The "Reset" value equals "Compensational"
	Given The "Custom_Inheritance_Mode" filter is selected
	When user checks check-box of "Compensational"
	And clicks the "Apply" button
	Then "Scenario" values should be HG002=0, HG003=1-2, HG004=1-2
	And the number of variants should be equal to "229092".

Scenario: 05 The "Not" mode
	Given The "Custom_Inheritance_Mode" filter is selected
	When user checks check-box of "Autosomal Dominant"
	And chooses the "Not" check-box
	And clicks the "Apply" button
	Then number of variants should be equal to "5548058".

Scenario: 06 Clear button
	Given The "Custom_Inheritance_Mode" filter is applied (Autosomal Dominant + Not)
	When user clicks the "Clear  all" button under Results section
	Then the filter should be cleared
	And the number of variants should be equal to "5628753".