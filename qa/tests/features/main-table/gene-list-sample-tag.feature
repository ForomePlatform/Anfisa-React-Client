Feature: Main table, Concatenation of Zone filters
        As the Anfisa user I want to filter variants list by Gene, Gene List, Sample, and Tag simultaneously

    Scenario: 01 Gene + Gene List
        Given The "Main table" of the WS dataset was open
        When user clicks the "+ Add Gene" button
        And the "Gene" dialog is opened
        And user clicks one gene
        And clicks the "Apply" button
        And user clicks the "+ Add Gene List" button
        And the "Gene list" dialog is opened
        And user clicks one gene list
        And clicks the "Apply" button
        Then Variants list should be filtered be selected gene and gene list
        ​
    Scenario: 02 Gene + Sample
        Given The "Main table" of the WS dataset was open
        When user clicks the "+ Add Gene" button
        And the "Gene" dialog is opened
        And user clicks one gene
        And clicks the "Apply" button
        And user clicks the "+ Add Sample" button
        And the "Sample" dialog is opened
        And user clicks one sample
        And clicks the "Apply" button
        Then Variants list should be filtered be selected gene and sample
   
   Scenario: 03 Gene + Tag
        Given The "Main table" of the WS dataset was open
        When user clicks the "+ Add Gene" button 
        And the "Gene" dialog is opened
        And user clicks one gene
        And clicks the "Apply" button
        And user clicks the "+ Add Tag" button
        And the "Tag" dialog is opened
        And user clicks one tag
        And clicks the "Apply" button
        Then Variants list should be filtered be selected gene and tag
        ​
    Scenario: 04 Gene list + Sample
        Given The "Main table" of the WS dataset was open
        When user clicks the "+ Add Gene List" button
        And the "Gene list" dialog is opened
        And user clicks one gene list
        And clicks the "Apply" button
        And user clicks the "+ Add Sample" button
        And the "Sample" dialog is opened
        And user clicks one sample
        And clicks the "Apply" button
        Then Variants list should be filtered be selected gene list and sample
        ​
     Scenario: 05 Gene list + Tag
        Given The "Main table" of the WS dataset was open
        When user clicks the "+ Add Gene List" button
        And the "Gene list" dialog is opened
        And user clicks one gene list
        And clicks the "Apply" button
        And clicks the "+ Add Tag" button
        And the "Tag" dialog is opened
        And user clicks one tag
        And clicks the "Apply" button
        Then Variants list should be filtered be selected gene list and tag
        ​
     Scenario: 06 Sample + Tag   ​
        Given The "Main table" of the WS dataset was open
        When user clicks the "+ Add Sample" button
        And the "Sample" dialog is opened
        And user clicks one sample
        And clicks the "Apply" button
        And clicks the "+ Add Tag" button
        And the "Tag" dialog is opened
        And user clicks one tag
        And clicks the "Apply" button
        Then Variants list should be filtered be selected sample and tag
        ​
     Scenario: 07 Gene + Gene List + Samples + Tag
        Given The "Main table" of the WS dataset was open
        When user clicks the "+ Add Gene" button
        And the "Gene" dialog is opened
        And user clicks one gene
        And clicks the "Apply" button
        And clicks the "+ Add Gene List" button
        And the "Gene list" dialog is opened
        And user clicks one gene list
        And clicks the "Apply" button
        And clicks the "+ Add Sample" button
        And the "Sample" dialog is opened
        And user clicks one sample
        And clicks the "Apply" button
        And clicks the "+ Add Tag" button
        And the "Tag" dialog is opened
        And user clicks one tag
        And clicks "Not mode"
        And clicks "Variants with notes only"
        And clicks the "Apply" button
        Then Variants list without notes and selected tag should be filtered by selected gene, gene list, and samples
