Feature: Filter refiner, Diagrams

Background: 
	Given user opens the "Filter Refiner" for the "PGP3140_wgs_panel_hl" dataset

@regression
@tc:114365
Scenario Outline: 01 Open "<Attribute Name>" diagram for attribute with less than 40 values 
	When user clicks the "<Attribute Name>" attribute in the left part of the page
	Then the diagram for "<Attribute Name>" should be shown in the middle column
	And the columns number should equal "<Number Of Columns>"
	And the diagram should correspond to attribute by the value's variant number

Examples: 
	| Attribute Name       | Number Of Columns |
	| Callers              | 10                |
	| Canonical_Annotation | 21                |

@tc:114366
Scenario Outline: 02 Open "<Attribute Name>" diagram for attribute with more than 40 values 
	When user clicks the "<Attribute Name>" attribute in the left part of the page
	Then the diagram for "<Attribute Name>" should be be shown in the middle column
	And 40 columns should be shown 
	And "Shown 40 significant items (total: "<Total Number>")" should be written at the bottom of the diagram
	And the diagram should correspond to attribute by the value's variant number

Examples: 
	| Attribute Name | Total Number |
	| Symbol         | 489          |
	| EQTL_Gene      | 67           |
