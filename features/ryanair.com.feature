Feature: Tests of ryanair.com 
 
 Background:
  Given I open url 'https://www.ryanair.com'

 Scenario: Can choose a language at the top of page and the page becomes in the choosed language
   Then The url is 'https://www.ryanair.com/gb/en/'
    And see the text 'Sign up', 'Log in' at the header
    And the button with text 'Continue'  
   When I choose country 'Germany'
   Then The url is 'https://www.ryanair.com/de/de/'
    And see the text 'Registrieren', 'Einloggen' at the header
    And the button with text 'Fortfahren' 
  
#  Scenario Outline: title
#   Given precondition
#    When action
#    Then testable outcome
#   Examples: 
# | title |
# |value 1|
# |value 2|
#   : title
#   Given precondition
#    When action
#    Then testable outcome
  