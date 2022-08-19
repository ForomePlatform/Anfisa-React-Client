@regression
Feature: Filter Refiner, Filter by Custom_Inheritance_Mode

Background: 
	Given user opens the "Filter Refiner" for the "xl_PGP3140_wgs_NIST-4_2" dataset

@smoke
@tc:114314
Scenario: 01 The "Custom_Inheritance_Mode" filter is displayed
	When user clicks the "+" button near "Functional Units"
	And selects "Custom_Inheritance_Mode" functional attribute
	Then Settings for the "Custom_Inheritance_Mode" should be displayed
	And "Reset" value should be empty
	And "Scenario" values "HG002", "HG003", "HG004" should be empty

@smoke
@tc:114315
Scenario: 02 The "Inheritance mode" value equals "Homozygous/X-linked"
	When user clicks the "+" button near "Functional Units"
	And selects "Custom_Inheritance_Mode" functional attribute
	And checks the "Homozygous/X-linked" check-box
	And clicks the "Apply condition" button
	Then "Custom_Inheritance_Mode" block was added to "Results" panel
	And "Scenario" values should be HG002=2, HG003=0-1, HG004=0-1
	And the number of variants should equal 227,768

@tc:114316
Scenario: 03 The "Inheritance mode" value equals "Autosomal Dominant"
	When user clicks the "+" button near "Functional Units"
	And selects "Custom_Inheritance_Mode" functional attribute 
	And checks the "Autosomal Dominant" check-box
	And clicks the "Apply condition" button
	Then "Custom_Inheritance_Mode" block was added to "Results" panel
	And "Scenario" values should be HG002=1-2, HG003=0, HG004=0
	And the number of variants should equal 80,695

@tc:114317
Scenario: 04 The "Inheritance mode" value equals "Compensational"
	When user clicks the "+" button near "Functional Units"
	And selects "Custom_Inheritance_Mode" functional attribute 
	And checks the "Compensational" check-box
	And clicks the "Apply condition" button
	Then "Custom_Inheritance_Mode" block was added to "Results" panel
	And "Scenario" values should be HG002=0, HG003=1-2, HG004=1-2
	And the number of variants should equal 229,092

@tc:114318
Scenario: 05 The "Not" mode
	When user clicks the "+" button near "Functional Units"
	And selects "Custom_Inheritance_Mode" functional attribute 
	And checks the "Autosomal Dominant" check-box
	And checks the "Not" check-box
	And clicks the "Apply condition" button
	Then "Custom_Inheritance_Mode" block should be added to the right side of the page with "not" flag
	And number of variants should equal 5,548,058

@tc:114319
Scenario: 06 Reset button
	When user clicks the "+" button near "Functional Units"
	And selects "Custom_Inheritance_Mode" functional attribute 
	And selects "Inheritance mode" value
	And clicks the "Reset" button
	Then "Inheritance mode" value should be cleared
