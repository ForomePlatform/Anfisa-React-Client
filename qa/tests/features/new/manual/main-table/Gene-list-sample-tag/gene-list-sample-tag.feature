@regression
Feature: Main table, Concatenation of Zone filters
        As the Anfisa user I want to filter variants list by Gene, Gene List, Sample, and Tag simultaneously

    Scenario: 01 Gene + Gene List

        Given "Main table" of the WS dataset was opened
        When User clicks "+ Add Gene" button
        And User checks one gene
        And Clicks "Apply" button
        And User clicks "+ Add Gene List" button
        And User checks one gene list
        And clicks "Apply" button
        Then Variants list should be filtered by selected gene and gene list

    Scenario: 02 Gene + Sample

        Given "Main table" of the WS dataset was opened
        When User clicks "+ Add Gene" button
        And User clicks one gene
        And Clicks "Apply" button
        And User clicks "+ Add Sample" button
        And User clicks one sample
        And Clicks "Apply" button
        Then Variants list should be filtered by selected gene and sample

   Scenario: 03 Gene + Tag

        Given "Main table" of the WS dataset was opened
        When User clicks "+ Add Gene" button 
        And User clicks one gene
        And Clicks "Apply" button
        And User clicks "+ Add Tag" button
        And User clicks one tag
        And Clicks "Apply" button
        Then Variants list should be filtered by selected gene and tag

    Scenario: 04 Gene list + Sample

        Given "Main table" of the WS dataset was opened
        When User clicks "+ Add Gene List" button
        And User clicks one gene list
        And Clicks "Apply" button
        And User clicks "+ Add Sample" button
        And User clicks one sample
        And Clicks "Apply" button
        Then Variants list should be filtered by selected gene list and sample

     Scenario: 05 Gene list + Tag
        Given "Main table" of the WS dataset was opened
        When User clicks "+ Add Gene List" button
        And User clicks one gene list
        And Clicks "Apply" button
        And Clicks "+ Add Tag" button
        And User clicks one tag
        And Clicks the "Apply" button
        Then Variants list should be filtered by selected gene list and tag

     Scenario: 06 Sample + Tag 
        Given "Main table" of the WS dataset was opened
        When User clicks "+ Add Sample" button
        And User clicks one sample
        And Clicks "Apply" button
        And Clicks "+ Add Tag" button
        And User clicks one tag
        And Clicks "Apply" button
        Then Variants list should be filtered by selected sample and tag

     Scenario: 07 Gene + Gene List + Samples + Tag
        Given "Main table" of the WS dataset was opened
        When User clicks "+ Add Gene" button
        And User clicks one gene
        And Clicks "Apply" button
        And Clicks "+ Add Gene List" button
        And User clicks one gene list
        And Clicks "Apply" button
        And Clicks "+ Add Sample" button
        And User clicks one sample
        And Clicks "Apply" button
        And Clicks "+ Add Tag" button
        And User clicks one tag
        And Clicks "Not mode"
        And Clicks "Variants with notes only"
        And Clicks  "Apply" button
        Then Variants list without notes and selected tag should be filtered by selected gene, gene list, and samples
