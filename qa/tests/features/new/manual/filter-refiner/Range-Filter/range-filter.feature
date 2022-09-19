#TODO 
#after https://quantori.atlassian.net/browse/BAP-133 fix change back "less" and "less or equals" to math symbols

@regression
Feature: Filter Refiner, Filter by range attribute

Background:
	Given user opens the "Filter Refiner" for the "xl_PGP3140_wgs_NIST-4_2" dataset

@tc:114305
Scenario Outline: 01 Filter by "<Attribute Name>" range - middle
	When user clicks the "<Attribute Name>"
	And enters the minimum value of range "<Minimum Value>"
	And changes "less" sign with "less or equals" sign next to the minimum value
	And enters the maximum value of range "<Maximum Value>"
	And clicks the "Apply condition" button to apply the filter
	Then the range "<Minimum Value>" less than or equals "<Attribute Name>" less than or equals "<Maximum Value>" should be displayed in the right part of the screen
	And number of variants should equal "<Total Variants>"

Examples:
	| Attribute Name               | Minimum Value | Maximum Value | Total Variants |
	| Num_Samples                  | 1             | 2             | 3,281,689      |
	| Num_Genes                    | 5             | 10            | 652            |
	| gnomAD_PopMax_AN             | 20            | 100           | 4,632          |
	| Number_submitters            | 2             | 16            | 5,165          |
	| Min_GQ                       | 0             | 750           | 5,591,394      |
	| Number_of_clinvar_submitters | 2             | 22            | 5,418          |
	| Severity                     | 1             | 2             | 52,248         |

@tc:114306
Scenario Outline: 02 Filter by "<Attribute Name>" range - boundary values
	When user clicks the "<Attribute Name>"
	And enters the minimum value of range "<Minimum Value>"
	And changes "less" sign with "less or equals" sign next to the minimum value
	And enters the maximum value of range "<Maximum Value>"
	And clicks the "Apply condition" button to apply the filter
	Then filter should be applied
	And the range "<Minimum Value>" less than or equals "<Attribute Name>" less than or equals "<Maximum Value>" should be displayed in the right part of the screen
	And number of variants should equal "<Total Variants>"

Examples:
	| Attribute Name               | Minimum Value | Maximum Value | Total Variants |
	| Num_Samples                  | 0             | 3             | 5,628,753      |
	| Num_Genes                    | 0             | 23            | 5,628,753      |
	| gnomAD_PopMax_AN             | 0             | 249160        | 5,628,753      |
	| Number_submitters            | 0             | 30            | 5,628,753      |
	| Min_GQ                       | -1            | 840           | 5,628,753      |
	| Number_of_clinvar_submitters | 0             | 30            | 5,628,753      |
	| Severity                     | -1            | 3             | 5,628,753      |

@tc:114307
Scenario Outline: 03 Only the "<Maximum Value>" is entered
	When user clicks the "<Attribute Name>"
	And enters the maximum value of range "<Maximum Value>"
	And minimum value field stays empty
	And clicks the "Apply condition" button to apply the filter
	Then the "<Attribute Name>" less than or equals "<Maximum Value>" should be displayed in the right part of the screen
	And number of variants should equal "<Total Variants>"

Examples: 
	| Attribute Name | Maximum Value | Total Variants |
	| Num_Samples    | 2             | 3,281,692      |
	| Num_Genes      | 10            | 5,628,362      |
	| Severity       | 1             | 5,609,058      |

@tc:114308
Scenario Outline: 04 Only the "<Minimum Value>" is entered
	When user clicks the "<Attribute Name>"
	And enters the minimum value of range "<Minimum Value>"
	And maximum value field stays empty
	And clicks the "Apply condition" button to apply the filter
	Then the "<Attribute Name>" greater than "<Minimum Value>" should be displayed in the right part of the screen
	And number of variants should equal "<Total Variants>"

Examples: 
	| Attribute Name | Minimum Value | Total Variants |
	| Num_Samples    | 1             | 4,244,509      |
	| Num_Genes      | 3             | 4,423          |
	| Severity       | 1             | 19,695         |

@tc:114309
Scenario Outline: 05 "<Attribute Name>" range values on the graph
	When user clicks the "<Attribute Name>"
	And enters the minimum value of range "<Minimum Value>"
	And changes "less" sign with "less or equals" sign next to the minimum value
	And enters the maximum value of range "<Maximum Value>"
	Then the "<Minimum Value>" and "<Maximum Value>" should be displayed on the graph

Examples: 
	| Attribute Name | Minimum Value | Maximum Value |
	| Num_Samples    | 1             | 2             |
	| Num_Genes      | 5             | 10            |

@tc:114310
Scenario: 06 Filter by two ranges
	When user clicks the "Severity" attribute
	And enters the minimum value of range "-1"
	And changes "less" sign with "less or equals" next to the minimum value
	And enters the maximum value of range "0"
	And clicks the "Apply condition" button to apply the filter
	And clicks the "Proband_GQ" attribute
	And enters the minimum value of range "100"
	And changes "less" sign with "less or equals" next to the minimum value
	And enters the maximum value of range "200"
	And clicks the "Apply condition" button to apply the filter
	Then both filters should be applied
	And the range "-1 less or equals Severity less or equals 0" should be displayed in the right part of the screen
	And the range "100 less or equals Proband_GQ less or equals 200" should be displayed in the right part of the screen
	And the variants number should equal 35,994

@tc:114311
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
	| gnomAD_PopMax_AN             | -1            | 249160        |
	| Number_submitters            | -1            | 30            |
	| Min_GQ                       | -2            | 840           |
	| Number_of_clinvar_submitters | -1            | 30            |
	| Severity                     | -2            | 3             |

@tc:114312
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
	| gnomAD_PopMax_AN             | 0             | 249161        |
	| Number_submitters            | 0             | 31            |
	| Min_GQ                       | -1            | 841           |
	| Number_of_clinvar_submitters | 0             | 31            |
	| Severity                     | -1            | 4             |
