Feature: Component Display

  I want to display component configuration
  So that I can view and interact with my configuration
  
  Scenario: Opening a Sample Input
    Given I open config "sample-input"
    Then I should see the title as "Sample Input"
