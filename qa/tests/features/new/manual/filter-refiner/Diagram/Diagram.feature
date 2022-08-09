Feature: Filter refiner, Diagrams

Background: 
	Given user opens the "Filter Refiner" for the "PGP3140_wgs_panel_hl" dataset

@regression
Scenario Outline: 01 Expand the "<Attribute Name>" diagram for attribute with less than 40 values 
	When user clicks the down arrow (v) button near "<Attribute Name>" in the left part of the page
	Then the diagram for "<Attribute Name>" should be expanded
	And the column number should equal "<Number Of Columns>"
	And the diagram should correspond to attribute by the value's variant number

Examples: 
	| Attribute Name       | Number Of Columns |
	| Callers              | 10                |
	| Canonical_Annotation | 18                |

Scenario Outline: 02 Expand the "<Attribute Name>" diagram for attribute with more than 40 values 
	When user clicks the down arrow (v) button near "<Attribute Name>" in the left part of the page
	Then the diagram for "<Attribute Name>" should be expanded
	And 40 columns should be shown 
	And "Shown 40 significant items (total: "<Total Number>")" should be written at the bottom of the diagram
	And the diagram should correspond to attribute by the value's variant number

Examples: 
	| Attribute Name | Total Number |
	| Symbol         | 490          |
	| EQTL_Gene      | 67           |

Scenario: 02 Collapse diagram
	Given the attribute diagram was expanded
	When user clicks the up arrow (^) near expanded attribute name
	Then the diagram should be collapsed