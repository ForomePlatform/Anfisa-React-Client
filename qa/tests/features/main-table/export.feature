Feature: Main table, Export
  As the Anfisa user I want to export variants list from the Main Table page
  
Scenario: 01 Excel: Too many variants to export
	Given "Main Table" was opened for the "PGP3140_wgs_panel_hl" dataset
	When user clicks "Export report"
	And Export panel is opened
	And user clicks "Excel"
	Then "There are too many variants to export. The number of variants should be less than 300" error message should be displayed.
​
Scenario: 02 CSV: Too many variants to export
	Given "Main Table" was opened for the "PGP3140_wgs_panel_hl" dataset
	When user clicks "Export report"
	And Export panel is opened
	And user clicks "CSV"
	Then "There are too many variants to export. The number of variants should be less than 300" error message should be displayed.
​
Scenario: 03 Excel export with filters (Filter Refiner)
	Given "Main Table" was opened for the "PGP3140_wgs_panel_hl" dataset
	When user clicks the "Edit Filters" button
	And the "Filter Refiner" is open
	And user clicks "+" button near "Rules"
	And chooses the "⏚Possibly_Damaging_Predictions" value
	And clicks the "+Add Attribute" button
	And clicks the "Apply" button
	And the "Main Table" page is open for 58 variants
	And user clicks "Export report"
	And clicks "Excel"
	Then Dataset should be exported.
​
Scenario: 04 Excel export with filter by Tag(s)
	Given "Main Table" was opened for the "PGP3140_wgs_panel_hl" dataset
	And there are no applied filters
	When user clicks the "+ Add Tag" button
	And chooses the "Previously categorized" value
	And clicks the "Apply" button
	And filter by tag is applied
	And user clicks "Export report"
	And clicks "Excel"
	Then Dataset should be exported.
​
Scenario: 05 Excel export with preset
	Given "Main Table" was opened for the "PGP3140_wgs_panel_hl" dataset
	And there are no applied filters
	When user applies the "⏚BGM_Homozygous_Rec" preset
	And clicks "Export report"
	And clicks "Excel"
	Then Dataset should be exported.
​
Scenario: 06 Excel export - No data
	Given "Main Table" was opened for the "PGP3140_wgs_panel_hl" dataset
	And there are no applied filters
	When user applies the "⏚BGM_Compound_Het" preset
	And Tries to click "Export report"
	Then User should be unable to click "Export report" button when there is 0 variant
​
Scenario: 07 Excel export without filters
	Given "Main Table" was opened for a dataset with a number of variants less than 300
	When user clicks "Export report"
	And Export panel is opened
	And user clicks "Excel"
	Then Dataset should be exported.
​
Scenario: 08 CSV export with filters (Filter Refiner)
	Given "Main Table" was opened for the "PGP3140_wgs_panel_hl" dataset
	When user clicks the "Edit Filters" button
	And the "Filter Refiner" is open
	And user clicks "+" button near "Rules"
	And chooses the "⏚Possibly_Damaging_Predictions" value
	And clicks the "+Add Attribute" button
	And clicks the "Apply" button
	And the "Main Table" page is open for 58 variants
	And user clicks "Export report"
	And clicks "CSV"
	Then Dataset should be exported.
​
Scenario: 09 CSV export with filter by Tag(s)
	Given "Main Table" was opened for the "PGP3140_wgs_panel_hl" dataset
	And there are no applied filters
	When user clicks the "+ Add Tag" button
	And chooses the "Previously categorized" value
	And clicks the "Apply" button
	And filter by tag is applied
	And user clicks "Export report"
	And clicks "CSV"
	Then Dataset should be exported.
​
Scenario: 10 CSV export with preset
	Given "Main Table" was opened for the "PGP3140_wgs_panel_hl" dataset
	And there are no applied filters
	When user applies the "⏚BGM_Homozygous_Rec" preset
	And clicks "Export report"
	And clicks "CSV"
	Then Dataset should be exported.
​
Scenario: 11 CSV export without filters
	Given "Main Table" was opened for a dataset with a number of variants less than 300
	When user clicks "Export report"
	And Export panel is opened
	And user clicks "CSV"
	Then Dataset should be exported.

Scenario: 12 Excel export with Preset + Filter + Zone filter
	Given "Main Table" was opened for the "PGP3140_wgs_panel_hl" dataset
	When user clicks the "+ Add Tag" button
	And chooses the "Previously categorized" value
	And clicks the "Apply" button
	And filter by tag is applied
	And user clicks the "Edit Filters" button
	And the "Filter Refiner" is open
	And user clicks "+" button near "Callers"
	And chooses the "GATK_Haplotype_Caller" value
	And clicks the "+Add Attribute" button
	And clicks the "Apply" button
	And user applies the "⏚BGM_Homozygous_Rec" preset
	And clicks "Export report"
	And clicks "Excel"
	Then Dataset should be exported

Scenario: 13 CSV export with Preset + Filter + Zone filter
	Given "Main Table" was opened for the "PGP3140_wgs_panel_hl" dataset
	When user clicks the "+ Add Tag" button
	And chooses the "Previously categorized" value
	And clicks the "Apply" button
	And filter by tag is applied
	And user clicks the "Edit Filters" button
	And the "Filter Refiner" is open
	And user clicks "+" button near "Callers"
	And chooses the "GATK_Haplotype_Caller" value
	And clicks the "+Add Attribute" button
	And clicks the "Apply" button
	And user applies the "⏚BGM_Homozygous_Rec" preset
	And clicks "Export report"
	And clicks "CSV"
	Then Dataset should be exported

Scenario: 14 Excel export with Preset + Filter
	Given Main Table for the "PGP3140_wgs_panel_hl" dataset was opened
	When user chooses the "⏚SEQaBOO_Hearing_Loss_v_5" preset
	And user clicks the "Edit filters" button
	And user clicks "+" button near "Callers"
	And chooses the "BGM_CMPD_HET" value
	And clicks the "+Add Attribute" button
	And clicks the "Apply" button
	And clicks "Export report"
	And clicks "Excel"
	Then Dataset should be exported