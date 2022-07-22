@regression
Feature: Main table, Concatenation of Zone filters
        As the Anfisa user I want to filter variants list by "Gene", "Gene List", "Samples", and "Tag" simultaneously

Background:
	Given "Main table" of the WS dataset was opened

Scenario: 01 "Gene" + "Gene List"

    When User clicks "+ Add Gene" button
    And User checks one "Gene"
    And Clicks "Apply" button
    And User clicks "+ Add Gene List" button
    And User checks one "Gene list"
    And clicks "Apply" button
    Then Variants list should be filtered by selected "Gene" and gene list

Scenario: 02 "Gene" + "Samples"

    When User clicks "+ Add Gene" button
    And User clicks one "Gene"
    And Clicks "Apply" button
    And User clicks "+ Add "Samples" button
    And User clicks one "Samples"
    And Clicks "Apply" button
    Then Variants list should be filtered by selected "Gene" and "Samples"

Scenario: 03 "Gene" + "Tag"

    When User clicks "+ Add Gene" button 
    And User clicks one "Gene"
    And Clicks "Apply" button
    And User clicks "+ Add "Tag"" button
    And User clicks one "Tag"
    And Clicks "Apply" button
    Then Variants list should be filtered by selected "Gene" and "Tag"

Scenario: 04 "Gene list" + "Samples"

    When User clicks "+ Add Gene List" button
    And User clicks one "Gene list"
    And Clicks "Apply" button
    And User clicks "+ Add "Samples"" button
    And User clicks one "Samples"
    And Clicks "Apply" button
    Then Variants list should be filtered by selected "Gene list" and "Samples"

Scenario: 05 "Gene list" + "Tag"

    When User clicks "+ Add Gene List" button
    And User clicks one "Gene list"
    And Clicks "Apply" button
    And Clicks "+ Add "Tag"" button
    And User clicks one "Tag"
    And Clicks the "Apply" button
    Then Variants list should be filtered by selected "Gene list" and "Tag"

Scenario: 06 "Samples" + "Tag" 

    When User clicks "+ Add "Samples"" button
    And User clicks one "Samples"
    And Clicks "Apply" button
    And Clicks "+ Add "Tag"" button
    And User clicks one "Tag"
    And Clicks "Apply" button
    Then Variants list should be filtered by selected "Samples" and "Tag"

@smoke
Scenario: 07 "Gene" + "Gene List" + "Samples"s + "Tag"

    When User clicks "+ Add Gene" button
    And User clicks one "Gene"
    And Clicks "Apply" button
    And Clicks "+ Add Gene List" button
    And User clicks one "Gene list"
    And Clicks "Apply" button
    And Clicks "+ Add "Samples"" button
    And User clicks one "Samples"
    And Clicks "Apply" button
    And Clicks "+ Add "Tag"" button
    And User clicks one "Tag"
    And Clicks "Not mode"
    And Clicks "Variants with notes only"
    And Clicks  "Apply" button
    Then Variants list without notes and selected "Tag" should be filtered by selected "Gene", "Gene list", and "Samples"s
