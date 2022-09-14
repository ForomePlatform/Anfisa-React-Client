@regression
Feature: Filter refiner, Decision tree, Dashboard
As an anfisa user I want to create custom layout for attributes

Background: 
	
	Given Filter refiner or Decision tree of "xl_PGP3140_wgs_NIST-4_2" was opened

@smoke
@tc:114779
Scenario: 01 Open dashboard
	
	When User clicks "Card view" button near the attribute search panel
	Then Dashboard should be opened
	And All attributes should be presented

@smoke
@tc:114780
Scenario: 02 Close section tab

	When User clicks "Card View" button near the attribute search panel
	And Clicks opened section name or along the name 
	Then Section should be closed
	And Section should be moved at the bottom of the site with other sections

@smoke
@tc:114781
Scenario: 03 Open section tab

	When User clicks "Card View" button near the attribute search panel
	And Clicks closed section name or along the name
	Then Section should be opened
	And Section should be shown in the middle of the site

@tc:114782
Scenario: 04 Show attributes in charts

	When User clicks "Card View" button near the attribute search panel
	And User turns on "Show in charts" button
	Then Attributes of sections that are opened should be shown with diagrams except "Functional Units"

@tc:114783
Scenario: 05 Show with variants 

	Given Dashboard is opened
	And "Show in charts" button is turned on
	When User turns off "Show in charts" button
	Then Sections showed with diagrams should be shown with variants

@tc:114784
Scenario: 06 Mark as favorite 

	When User clicks "Card View" button near the attribute search panel
	And User clicks the star along the section name
	Then Star should become yellow
	And Marked section should be moved before unfavorite Sections

@tc:114785
Scenario: 07 Delete section from favorites

	Given Dashboard is opened
	And One section is marked as favorite
	When User clicks the star along the favorite section name
	Then Star should change color from yellow to blue
	And Section should move after favorite sections

@tc:114786
Scenario: 08 Search attribute with valid value

	When User clicks "Card View" button near the attribute search panel
	And User enters valid name for variant in search field
	Then Searched variants should be relatively visible
	And Other variants should become more pale

@tc:114787
Scenario: 09 Search attribute with invalid value

	When User clicks "Card View" button near the attribute search panel
	And User enters invalid name for variant in search field
	Then All the sections should become more pale

@tc:114788
Scenario: 10 Expand all sections of attribute

	When User clicks "Card View" button near the attribute search panel
	And User clicks "Expand" button at the end of the attribute tab
	Then All sections of the attribute should be expanded
	And More information about attribute sections should be shown

@tc:114789
Scenario: 11 Expand one section of attribute

	When User clicks "Card View" button near the attribute search panel
	And User clicks down-arrow "Expand" button at the end of attribute section
	Then Only one section should be expanded
	And More information about section should be shown

@tc:114790
Scenario: 12 Collapse all sections of attribute

	When User clicks "Card View" button near the attribute search panel
	And User clicks "Collapse" button at the end of expanded attribute section
	Then All sections should be collapsed

@tc:114791
Scenario: 13 Collapse one section of attribute
	
	When User clicks "Card View" button near the attribute search panel
	And User clicks up-arrow "collapse" button at the end of expanded attribute section
	Then Only one section should be collapsed

@tc:114792
Scenario: 14 Expand all section for opened attributes

	When User clicks "Card View" button near the attribute search panel
	And User clicks "Expand" button at the end of the search field
	Then All sections of opened attributes should be expanded

@tc:114793
Scenario: 15 Collapse all section for opened attributes

	When User clicks "Card View" button near the attribute search panel
	And Some attributes are opened
	And User clicks "collapse" button at the end of the search field
	Then All sections of opened attributes should be collapsed

@tc:114794
Scenario: 16 Drag and drop the attribute
	
	When User clicks "Card View" button near the attribute search panel
	And User drags and drops one attribute panel
	Then Attribute panel should change its place

@tc:114795
Scenario: 17 Mark attribute as favorite and reopen dataset again

	When User clicks "Card View" button near the attribute search panel
	And User clicks the star along the attribute name
	And Clicks "Forome" logo to go to main page
	And Opens dashboard for the same dataset again
	Then Previously favorite-marked attribute should be marked as favorite again
	And Layout should be the same as it was before

@smoke
@tc:114796
Scenario: 18 Add attribute via dashboard

	When User clicks "Card View" button near the attribute search panel
	And User clicks the name of attribute
	And Attribute panel is opened
	And User checks any attribute
	And Clicks "+ Add Attribute" button
	Then Dashboard should be switched to panel again 
	And Checked attribute should be added to Filter refiner or Decision tree

@tc:114797
Scenario: 19 Apply preset

	When User clicks "Card View" button near the attribute search panel
	And User clicks "Select Filter Preset" drop-down button
	And Selects any preset
	And Clicks "Apply preset" button
	Then The same layout should be shown after loading
	And Chosen preset name should be written instead of "Select Filter Preset"
