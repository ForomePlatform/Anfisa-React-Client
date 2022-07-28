Feature: Common testcases

@tc:112978
    Scenario: 01 Anfisa version

        Given Anfisa site is open
        When the user looks at the header
        Then Anfisa version should be displayed

@tc:112979
    Scenario: 02 Search for dataset

        Given Main page is opened and datasets are presented on the left panel
        When the user enters an existed dataset name in the Search field
        Then the dataset should be found

@tc:112980
    Scenario: 03 Search dataset wirh upper-case letters
        
        Given Main page is opened and datasets are presented on the left panel
        When the user enters an existed "<DATASET NAME>" with upper-case letters in the Search field
        Then the dataset should be found

      Examples:
         |<DATASET NAME>|
         |XL_NA12878_WGS|
         |XL_PF0005_WES |
    
@tc:112981
    Scenario: 04 Search by part of the dataset name
        
        Given Main page is opened and datasets are presented on the left panel
        When the user enters an part of dataset name in the Search field
        Then the dataset should be found
    
@tc:112982
    Scenario: 05 Sort datasets by creation time
      
       Given Main page is opened and datasets are presented on the left panel
       When the user clicks the "Created at" button
       Then the dataset should be sorted by creation time

@tc:112983
    Scenario: 06 Sort datasets by name
      
       Given Main page is opened and datasets are presented on the left panel
       When the user clicks the "Name" button
       Then the dataset should be sorted by name

@tc:112984
    Scenario: 07 Expand xl dataset
       
       Given Main page is opened and datasets are presented on the left panel
       When the user clicks an XL dataset with children WS datasets
       Then the XL dataset should be expanded
   
@tc:112985
    Scenario: 08 Check Main table and Decision tree panel in WS dataset's submenu

        Given Main page is opened and datasets are presented on the left panel
        When the user clicks a WS dataset
        And clicks the "Open in viewer" button
        Then "Main table" and "Decision Tree panel" options should present in the submenu

@tc:112986
    Scenario: 09 Open main table for WS Dataset
     
        Given the "Open in viewer" menu is open for a WS dataset
        When the user clicks the "Main table" submenu
        Then Main table screen should be open for the selected dataset

@tc:112987
    Scenario: 10 Move back to the Main page from WS dataset's Main table

        Given the "Main table" screen is open for a WS dataset
        When the user clicks the Back button in a browser
        Then Main page should be open

@tc:112988
    Scenario: 11 Open WS dataset's decision tree from Main page
         
         Given Main page is opened and datasets are presented on the left panel
         When the user clicks a WS dataset
         And clicks the "Open in viewer" button
         And clicks the "Decision Tree panel" submenu
         Then Decision Tree panel should be open for the selected dataset

@tc:112989
    Scenario: 12 Move back to the Main page from WS dataset's Decision tree panel
        
        Given the "Decision Tree panel" screen is open for a WS dataset
        When the user clicks the Close button (cross icon)
        Then Main page should be open
    
@tc:112990
    Scenario: 13 Open XL dataset's decision tree from Main page

        Given the "Open in viewer" menu is open for the XL dataset
        When the user clicks the "Decision Tree panel" submenu
        Then Decision Tree panel should be open for the selected dataset

@tc:112991
    Scenario: 14 Move back to the Main page from XL dataset's Decision tree panel

        Given the "Decision Tree panel" screen is open for the XL dataset
        When the user clicks the Close button (cross icon)
        Then Main page should be open

@tc:112992
    Scenario: 15 Check the dataset's info
        
        Given Main page is opened and datasets are presented on the left panel
        When the user clicks an dataset
        Then Information about the dataset should be displayed

@tc:112993
    Scenario: 16 Export dataset

        Given Main page is opened and datasets are presented on the left panel
        When the user clicks an dataset
        And clicks on three dot menu on the left panel
        And chooses Export
        And clicks on export button on export frame
        Then dataset should be exported

@tc:112994
    Scenario: 17 Import dataset  
        
        Given Main page is opened and datasets are presented on the left panel
        When clicks on three dot menu on the left panel
        And chooses Import
        And puts the name of the dataset in Dataset name field
        And uploads dataset field
        Then dataset should be imported

@tc:112995
    Scenario: 18 Reload dataset
        
        Given Main page is opened and datasets are presented on the left panel
        When user clicks on reload button on the top of left panel
        Then dataset list should be reloaded
