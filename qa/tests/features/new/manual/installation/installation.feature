Feature: Anfisa installation

@tc:113746
Scenario: install anfisa with docker

    Given user cloned the repository https://github.com/ForomePlatform/anfisa
    When user verifies the latest installation guide location
    And follows the instraction installation with docker from readme
    Then anfisa should be installed locally

@tc:113747
Scenario: install anfisa without docker

    Given user cloned the repository https://github.com/ForomePlatform/anfisa
    When user verifies the latest installation guide location
    And follows the instraction installation without docker from readme
    Then anfisa should be installed locally
 
