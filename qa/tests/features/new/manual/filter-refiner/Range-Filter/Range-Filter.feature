@regression
Feature: Filter Refiner, Filter by range attribute

Background:
	Given user opens the "Filter Refiner" for the "xl_PGP3140_wgs_NIST-4_2" dataset

Scenario Outline: 01 Filter by "<Attribute Name>" range - middle
	When user clicks the "<Attribute Name>"
	And enters the minimum value of range "<Minimum Value>"
	And changes "<" sign with "≤" next to the minimum value
	And enters the maximum value of range "<Maximum Value>"
	And clicks the "Apply condition" button to apply the filter
	Then the range "<Minimum Value>" less than or equals "<Attribute Name>" less than or equals "<Maximum Value>" should be displayed in the right part of the screen
	And number of variants should equal "<Total Variants>"

Examples:
	| Attribute Name               | Minimum Value | Maximum Value | Total Variants |
	| Num_Samples                  | 1             | 2             | 3,281,689      |
	| Num_Genes                    | 5             | 10            | 652            |
	| Start_Pos                    | 25200         | 255200        | 5,524          |
	| gnomAD_PopMax_AN             | 20            | 100           | 4,632          |
	| Number_submitters            | 2             | 16            | 5,165          |
	| Min_GQ                       | 0             | 750           | 5,591,394      |
	| Number_of_clinvar_submitters | 2             | 22            | 5,418          |
	| Severity                     | 1             | 2             | 52,248         |

Scenario Outline: 02 Filter by "<Attribute Name>" range - boundary values
	When user clicks the "<Attribute Name>"
	And enters the minimum value of range "<Minimum Value>"
	And changes "<" sign with "≤" next to the minimum value
	And enters the maximum value of range "<Maximum Value>"
	And clicks the "Apply condition" button to apply the filter
	Then filter should be applied
	And the range "<Minimum Value>" less than or equals "<Attribute Name>" less than or equals "<Maximum Value>" should be displayed in the right part of the screen
	And number of variants should be equal to "<Total Variants>"

Examples:
	| Attribute Name               | Minimum Value | Maximum Value | Total Variants |
	| Num_Samples                  | 0             | 3             | 5,628,753      |
	| Num_Genes                    | 0             | 23            | 5,628,753      |
	| Start_Pos                    | 25165         | 248930384     | 5,628,753      |
	| gnomAD_PopMax_AN             | 0             | 249160        | 5,628,753      |
	| Number_submitters            | 0             | 30            | 5,628,753      |
	| Min_GQ                       | -1            | 840           | 5,628,753      |
	| Number_of_clinvar_submitters | 0             | 30            | 5,628,753      |
	| Severity                     | -1            | 3             | 5,628,753      |

Scenario Outline: 03 Empty "<Minimum Value>" field
	When user clicks the "<Attribute Name>"
	And enters the maximum value of range "<Maximum Value>"
	And leaves the minimum value field empty
	And clicks the "Apply condition" button to apply the filter
	Then the "<Attribute Name>" less than or equals "<Maximum Value>" should be displayed in the right part of the screen
	And the "<Minimum Value>" should be counted as the minimum value

Examples: 
	| Attribute Name               | Minimum Value | Maximum Value |
	| Num_Samples                  | 0             | 3             |
	| Num_Genes                    | 0             | 23            | 
	| Start_Pos                    | 25165         | 248930384     |

Scenario Outline: 04 Empty "<Maximum Value>" field
	When user clicks the "<Attribute Name>"
	And enters the minimum value of range "<Minimum Value>"
	And leaves the maximum value field empty
	And clicks the "Apply condition" button to apply the filter
	Then the "<Attribute Name>" greater than "<Minimum Value>" should be displayed in the right part of the screen
	And the "<Maximum Value>" should be counted as the maximum value

Examples: 
	| Attribute Name               | Minimum Value | Maximum Value |
	| Num_Samples                  | 0             | 3             |
	| Num_Genes                    | 0             | 23            | 
	| Start_Pos                    | 25165         | 248930384     |

Scenario Outline: 05 "<Attribute Name>" range values on the graph
	When user clicks the "<Attribute Name>"
	And enters the minimum value of range "<Minimum Value>"
	And changes "<" sign with "≤" next to the minimum value
	And enters the maximum value of range "<Maximum Value>"
	Then the "<Minimum Value>" and "<Maximum Value>" should be displayed on the graph

Examples: 
	| Attribute Name | Minimum Value | Maximum Value |
	| Num_Samples    | 1             | 2             |
	| Num_Genes      | 5             | 10            |
	| Start_Pos      | 25200         | 255200        |

Scenario: 06 Filter by two ranges
	When user clicks the "Severity" attribute
	And enters the minimum value of range "-1"
	And changes "<" sign with "≤" next to the minimum value
	And enters the maximum value of range "0"
	And clicks the "Apply condition" button to apply the filter
	And clicks the "Proband_GQ" attribute
	And enters the minimum value of range "100"
	And changes "<" sign with "≤" next to the minimum value
	And enters the maximum value of range "200"
	And clicks the "Apply condition" button to apply the filter
	Then both filters should be applied
	And the range "-1 <= Severity <= 0" should be displayed in the right part of the screen
	And the range "100 <= Proband_GQ <= 200" should be displayed in the right part of the screen
	And the variants number should equal 35,994

Scenario Outline: 07 Filter by "<Attribute Name>" range with invalid values (Minimum value < MIN)
	When user clicks the "<Attribute Name>"
	And enters the minimum value of range "<Minimum Value>"
	And enters the maximum value of range "<Maximum Value>"
	Then invalid value should be changed to valid value
	And "Apply condition" button should be enabled

Examples:
	| Attribute Name               | Minimum Value | Maximum Value |
	| Num_Samples                  | -1            | 3             |
	| Num_Genes                    | -1            | 23            |
	| Start_Pos                    | 0             | 248930384     |
	| gnomAD_PopMax_AN             | -1            | 249160        |
	| Number_submitters            | -1            | 30            |
	| Min_GQ                       | -2            | 840           |
	| Number_of_clinvar_submitters | -1            | 30            |
	| Severity                     | -2            | 3             |

Scenario Outline: 08 Filter by "<Attribute Name>" range with invalid values (Maximum value > MAX)
	When user clicks the "<Attribute Name>"
	And enters the minimum value of range "<Minimum Value>"
	And enters the maximum value of range "<Maximum Value>"
	Then invalid value should be changed to valid value
	And "Apply condition" button should be enabled

Examples:
	| Attribute Name               | Minimum Value | Maximum Value |
	| Num_Samples                  | 0             | 4             |
	| Num_Genes                    | 0             | 24            |
	| Start_Pos                    | 25165         | 248930385     |
	| gnomAD_PopMax_AN             | 0             | 249161        |
	| Number_submitters            | 0             | 31            |
	| Min_GQ                       | -1            | 841           |
	| Number_of_clinvar_submitters | 0             | 31            |
	| Severity                     | -1            | 4             |

Scenario: 09 Clear button
	When user clicks the "Num_Samples" attribute
	And enters the minimum value of range "1"
	And changes "<" sign with "≤" next to the minimum value
	And enters the maximum value of range "2"
	And clicks the "Apply condition" button to apply the filter
	And user clicks the "Clear" button
	Then the filter should be cleared
	And number of variants should go back to 5,628,753